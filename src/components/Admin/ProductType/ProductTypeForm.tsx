"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import {
	createProductType,
	updateProductType,
	type ProductTypeInput,
} from "@/actions/productType";
import { useRouter } from "next/navigation";

function imageSrc(imgPath: string | null | undefined): string | null {
	if (!imgPath?.trim()) return null;
	if (imgPath.startsWith("http")) return imgPath;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${imgPath}` : null;
}

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: ProductTypeInput;
};

export default function ProductTypeForm({ mode, editId, initial }: Props) {
	const router = useRouter();
	const [name, setName] = useState(initial?.name ?? "");
	const [name_en, setNameEn] = useState(initial?.name_en ?? "");
	const [imgPath] = useState(initial?.img_path ?? null);
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		imageSrc(initial?.img_path)
	);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(imageSrc(imgPath));
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return imgPath?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(
			file.type,
			file.size,
			"product-types",
			name
		);
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
		if (!name.trim() || !name_en.trim()) {
			toast.error("Name (MN) and Name (EN) are required.");
			return;
		}
		setLoading(true);
		try {
			const uploadedKey = await uploadImage();
			if (file && uploadedKey === null) return;
			const payload: ProductTypeInput = {
				name: name.trim(),
				name_en: name_en.trim(),
				img_path: uploadedKey,
			};
			if (mode === "edit" && editId) {
				await updateProductType(editId, payload);
				toast.success("Product type updated.");
			} else {
				await createProductType(payload);
				toast.success("Product type created.");
			}
			router.push("/admin/product-types");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview = imagePreview || imageSrc(imgPath);

	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8'>
			<div className='mb-6'>
				<Link
					href='/admin/product-types'
					className='text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary'
				>
					← Back to list
				</Link>
			</div>
			<h1 className='mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl'>
				{mode === "edit" ? "Edit Product Type" : "Add Product Type"}
			</h1>
			<form
				onSubmit={handleSubmit}
				className='flex max-w-md flex-col space-y-4'
			>
				<InputGroup
					label='Name (MN)'
					type='text'
					name='name'
					value={name}
					placeholder='e.g. CAT'
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
				/>
				<InputGroup
					label='Name (EN)'
					type='text'
					name='name_en'
					value={name_en}
					placeholder='e.g. CAT'
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setNameEn(e.target.value)
					}
				/>
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Image
					</label>
					<div className='flex flex-wrap items-start gap-4'>
						<label className='relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5'>
							{currentPreview ? (
								<Image
									src={currentPreview}
									alt='Product Type'
									fill
									className='object-cover'
									sizes='160px'
									unoptimized={currentPreview.startsWith("blob:")}
								/>
							) : (
								<span className='text-body/70'>Upload image</span>
							)}
							<input
								type='file'
								className='sr-only'
								accept='image/png,image/jpeg,image/jpg'
								onChange={handleImageChange}
							/>
						</label>
						<p className='text-sm text-body/70'>PNG, JPG. Max 2MB.</p>
					</div>
				</div>
				<div className='flex gap-3 border-t border-stroke pt-6 dark:border-stroke-dark'>
					<Link
						href='/admin/product-types'
						className='inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium dark:border-stroke-dark dark:bg-white/5 dark:text-white'
					>
						Cancel
					</Link>
					<button
						type='submit'
						disabled={loading}
						className='inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark disabled:opacity-70'
					>
						{loading ? (
							<>
								<Loader style='border-white' />
								<span className='ml-2'>Saving...</span>
							</>
						) : mode === "edit" ? (
							"Update"
						) : (
							"Create"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
