"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import {
	createManagement,
	updateManagement,
	type ManagementInput,
} from "@/actions/management";
import { useRouter } from "next/navigation";

const emptyForm: ManagementInput = {
	name: "",
	position: "",
	image: "",
	order: 0,
};

function managementImageSrc(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

type ManagementFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: ManagementInput & { image?: string | null };
};

export default function ManagementForm({
	mode,
	editId,
	initial = emptyForm,
}: ManagementFormProps) {
	const router = useRouter();
	const [data, setData] = useState<ManagementInput>({
		name: initial.name ?? "",
		position: initial.position ?? "",
		image: initial.image ?? "",
		order: initial.order ?? 0,
	});
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		managementImageSrc(initial.image ?? null)
	);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(data.image ? managementImageSrc(data.image) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.image?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(file.type, file.size, "management", name);
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
		if (!data.name?.trim()) return toast.error("Name is required!");
		if (!data.position?.trim()) return toast.error("Position is required!");
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			const payload: ManagementInput = {
				...data,
				image: imageKey ?? (data.image?.trim() || null),
			};
			if (mode === "edit" && editId) {
				await updateManagement(editId, payload);
				toast.success("Management updated!");
			} else {
				await createManagement(payload);
				toast.success("Management created!");
			}
			router.push("/admin/management");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview =
		imagePreview || (data.image ? managementImageSrc(data.image) : null);

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6 flex items-center gap-3">
				<Link
					href="/admin/management"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Management" : "Add Management"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<InputGroup
					label="Name"
					type="text"
					name="name"
					value={data.name}
					placeholder="Full name"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, name: e.target.value }))
					}
				/>
				<InputGroup
					label="Position"
					type="text"
					name="position"
					value={data.position}
					placeholder="e.g. CEO, Director"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, position: e.target.value }))
					}
				/>
				<InputGroup
					label="Order"
					type="number"
					name="order"
					value={String(data.order ?? 0)}
					placeholder="0"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, order: parseInt(e.target.value, 10) || 0 }))
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
									alt="Management"
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
						href="/admin/management"
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
								<span className="ml-2">{mode === "edit" ? "Updating..." : "Creating..."}</span>
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
