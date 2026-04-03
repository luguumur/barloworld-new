"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import { createProductCategory, updateProductCategory } from "@/actions/productCategory";
import { useRouter } from "next/navigation";

type TypeOption = { id: string; name: string; name_en: string };

function imageSrc(path: string | null): string | null {
	if (!path?.trim()) return null;
	if (path.startsWith("http")) return path;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${path}` : null;
}

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: {
		name: string;
		name_en: string;
		parentId?: string | null;
		img_path?: string | null;
		types: string;
	};
	productTypes: TypeOption[];
};

export default function ProductCategoryForm({ mode, editId, initial, productTypes }: Props) {
	const router = useRouter();
	const [name, setName] = useState(initial?.name ?? "");
	const [name_en, setNameEn] = useState(initial?.name_en ?? "");
	const [parentId, setParentId] = useState(initial?.parentId ?? "");
	const [types, setTypes] = useState(initial?.types ?? "");
	const [img_path, setImgPath] = useState(initial?.img_path ?? "");
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(imageSrc(initial?.img_path ?? null));
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(img_path ? imageSrc(img_path) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return img_path?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const result = await getSignedURL(file.type, file.size, "category", `${Date.now()}.${ext}`);
		if (result.failure) {
			toast.error(result.failure);
			return null;
		}
		const res = await fetch(result.success!.url, {
			method: "PUT",
			headers: { "Content-Type": file.type || "application/octet-stream" },
			body: file,
		});
		if (res.ok) return result.success!.key;
		toast.error("Image upload failed");
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !name_en.trim() || !types.trim()) {
			toast.error("Name (MN), Name (EN) and Type are required.");
			return;
		}
		setLoading(true);
		try {
			const uploaded = await uploadImage();
			const data = {
				name: name.trim(),
				name_en: name_en.trim(),
				parentId: parentId.trim() || null,
				img_path: uploaded ?? (img_path?.trim() || null),
				types: types.trim(),
			};
			if (mode === "edit" && editId) {
				await updateProductCategory(editId, data);
				toast.success("Category updated.");
			} else {
				await createProductCategory(data);
				toast.success("Category created.");
			}
			router.push("/admin/product-categories");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview = imagePreview || (img_path ? imageSrc(img_path) : null);

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6">
				<Link href="/admin/product-categories" className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary">
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Category" : "Add Product Category"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-lg">
				<InputGroup
					label="Name (MN)"
					type="text"
					name="name"
					value={name}
					placeholder="Ангилал"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				/>
				<InputGroup
					label="Name (EN)"
					type="text"
					name="name_en"
					value={name_en}
					placeholder="Category name"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEn(e.target.value)}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Product type
					</label>
					<select
						value={types}
						onChange={(e) => setTypes(e.target.value)}
						required
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="">Select type</option>
						{productTypes.map((t) => (
							<option key={t.id} value={t.name}>{t.name}</option>
						))}
					</select>
				</div>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Image
					</label>
					<div className="flex flex-wrap items-start gap-4">
						<label className="relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5">
							{currentPreview ? (
								<Image src={currentPreview} alt="" fill className="object-cover" sizes="160px" unoptimized={currentPreview.startsWith("blob:")} />
							) : (
								<span className="text-body/70">Upload</span>
							)}
							<input type="file" className="sr-only" accept="image/png,image/jpeg,image/jpg" onChange={handleImageChange} />
						</label>
						<p className="text-sm text-body/70">PNG, JPG. Max 2MB.</p>
					</div>
				</div>
				<div className="flex gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link href="/admin/product-categories" className="inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium dark:border-stroke-dark dark:bg-white/5 dark:text-white">
						Cancel
					</Link>
					<button
						type="submit"
						disabled={loading}
						className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark disabled:opacity-70"
					>
						{loading ? <><Loader style="border-white" /><span className="ml-2">Saving...</span></> : mode === "edit" ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
}
