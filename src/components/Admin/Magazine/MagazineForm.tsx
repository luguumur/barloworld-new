"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import {
	createMagazine,
	updateMagazine,
	type MagazineInput,
} from "@/actions/magazine";
import { useRouter } from "next/navigation";

const emptyForm: MagazineInput = {
	title: "",
	title_en: "",
	image: "",
	url: "",
	date: "",
	number: "",
};

function magazineImageSrc(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

type MagazineFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: MagazineInput & { image?: string | null };
};

export default function MagazineForm({
	mode,
	editId,
	initial = emptyForm,
}: MagazineFormProps) {
	const router = useRouter();
	const [data, setData] = useState<MagazineInput>({
		title: initial.title ?? "",
		title_en: initial.title_en ?? "",
		image: initial.image ?? "",
		url: initial.url ?? "",
		date: initial.date ?? "",
		number: initial.number ?? "",
	});
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		magazineImageSrc(initial.image ?? null)
	);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(data.image ? magazineImageSrc(data.image) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.image?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(
			file.type,
			file.size,
			"magazine",
			name
		);
		if (result.failure) {
			toast.error(result.failure);
			return null;
		}
		const uploadUrl = result.success!.url;
		const res = await fetch(uploadUrl, {
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
		if (!data.title?.trim() || !data.title_en?.trim()) {
			return toast.error("Title (MN & EN) are required!");
		}
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			const payload: MagazineInput = {
				...data,
				image: imageKey ?? (data.image?.trim() || null),
			};
			if (mode === "edit" && editId) {
				await updateMagazine(editId, payload);
				toast.success("Magazine updated!");
			} else {
				await createMagazine(payload);
				toast.success("Magazine created!");
			}
			router.push("/admin/magazines");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview =
		imagePreview || (data.image ? magazineImageSrc(data.image) : null);

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6 flex items-center gap-3">
				<Link
					href="/admin/magazines"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Magazine" : "Add Magazine"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<InputGroup
					label="Title (MN)"
					type="text"
					name="title"
					value={data.title}
					placeholder="Гарчиг"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, title: e.target.value }))
					}
				/>
				<InputGroup
					label="Title (EN)"
					type="text"
					name="title_en"
					value={data.title_en}
					placeholder="Title"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, title_en: e.target.value }))
					}
				/>
				<InputGroup
					label="Number"
					type="text"
					name="number"
					value={data.number ?? ""}
					placeholder="e.g. 1"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, number: e.target.value }))
					}
				/>
				<InputGroup
					label="Date"
					type="text"
					name="date"
					value={data.date ?? ""}
					placeholder="e.g. Apr 2020"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, date: e.target.value }))
					}
				/>
				<InputGroup
					label="URL"
					type="url"
					name="url"
					value={data.url ?? ""}
					placeholder="https://... (e.g. PDF link)"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, url: e.target.value }))
					}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Image
					</label>
					<div className="flex flex-wrap items-start gap-4">
						<label className="relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5">
							{currentPreview ? (
								<Image
									src={currentPreview}
									alt="Magazine"
									fill
									className="object-cover"
									sizes="160px"
									unoptimized={currentPreview.startsWith("blob:")}
								/>
							) : (
								<span className="text-body/70">Upload image</span>
							)}
							<input
								type="file"
								className="sr-only"
								accept="image/png,image/jpeg,image/jpg"
								onChange={handleImageChange}
							/>
						</label>
						<p className="text-sm text-body/70">PNG, JPG. Max 2MB.</p>
					</div>
				</div>

				<div className="flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link
						href="/admin/magazines"
						className="inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium duration-200 hover:bg-slate-100 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
					>
						Cancel
					</Link>
					<button
						type="submit"
						disabled={loading}
						className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white duration-200 hover:bg-primary-dark disabled:opacity-70"
					>
						{loading ? (
							<>
								<Loader style="border-white" />
								<span className="ml-2">
									{mode === "edit" ? "Updating..." : "Creating..."}
								</span>
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
