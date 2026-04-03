"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import { Editor } from "@/components/Common/Dashboard/Editor";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import {
	createDeal,
	updateDeal,
	type DealInput,
} from "@/actions/deal";
import { useRouter } from "next/navigation";

const emptyForm: DealInput = {
	title: "",
	title_en: "",
	subtitle: "",
	subtitle_en: "",
	description: "",
	description_en: "",
	status: "ACTIVE",
	img_path: "",
};

function dealImageSrc(imgPath: string | null): string | null {
	if (!imgPath?.trim()) return null;
	if (imgPath.startsWith("http")) return imgPath;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${imgPath}` : null;
}

type DealFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: DealInput & { img_path?: string | null };
};

export default function DealForm({
	mode,
	editId,
	initial = emptyForm,
}: DealFormProps) {
	const router = useRouter();
	const [data, setData] = useState<DealInput>({
		title: initial.title ?? "",
		title_en: initial.title_en ?? "",
		subtitle: initial.subtitle ?? "",
		subtitle_en: initial.subtitle_en ?? "",
		description: initial.description ?? "",
		description_en: initial.description_en ?? "",
		status: initial.status ?? "ACTIVE",
		img_path: initial.img_path ?? "",
	});
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		dealImageSrc(initial.img_path ?? null)
	);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(data.img_path ? dealImageSrc(data.img_path) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.img_path?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(
			file.type,
			file.size,
			"deals",
			name
		);
		if (result.failure) {
			toast.error(result.failure);
			return null;
		}
		const url = result.success!.url;
		const res = await fetch(url, {
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
		if (
			!data.title?.trim() ||
			!data.title_en?.trim() ||
			!data.description?.trim() ||
			!data.description_en?.trim()
		) {
			return toast.error("Title and Description (MN & EN) are required!");
		}
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			const payload: DealInput = {
				...data,
				img_path: imageKey ?? (data.img_path?.trim() || null),
			};
			if (mode === "edit" && editId) {
				await updateDeal(editId, payload);
				toast.success("Deal updated!");
			} else {
				await createDeal(payload);
				toast.success("Deal created!");
			}
			router.push("/admin/deals");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview =
		imagePreview || (data.img_path ? dealImageSrc(data.img_path) : null);

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6 flex items-center gap-3">
				<Link
					href="/admin/deals"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Deal" : "Add Deal & Special"}
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
					label="Subtitle (MN)"
					type="text"
					name="subtitle"
					value={data.subtitle ?? ""}
					placeholder="Дэд гарчиг"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, subtitle: e.target.value }))
					}
				/>
				<InputGroup
					label="Subtitle (EN)"
					type="text"
					name="subtitle_en"
					value={data.subtitle_en ?? ""}
					placeholder="Subtitle"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, subtitle_en: e.target.value }))
					}
				/>
				<Editor
					label="Description (MN)"
					value={data.description}
					placeholder="Тайлбар"
					onChange={(value) => setData((p) => ({ ...p, description: value }))}
				/>
				<Editor
					label="Description (EN)"
					value={data.description_en}
					placeholder="Description"
					onChange={(value) => setData((p) => ({ ...p, description_en: value }))}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Status
					</label>
					<select
						value={data.status ?? "ACTIVE"}
						onChange={(e) => setData((p) => ({ ...p, status: e.target.value }))}
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="ACTIVE">ACTIVE</option>
						<option value="INACTIVE">INACTIVE</option>
					</select>
				</div>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Image
					</label>
					<div className="flex flex-wrap items-start gap-4">
						<label className="relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5">
							{currentPreview ? (
								<Image
									src={currentPreview}
									alt="Deal"
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
						href="/admin/deals"
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
