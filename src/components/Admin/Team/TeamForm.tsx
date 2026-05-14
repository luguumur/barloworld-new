"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import { createTeam, updateTeam, type TeamInput } from "@/actions/team";
import { useRouter } from "next/navigation";

const emptyForm: TeamInput = {
	name: "",
	name_en: "",
	pos: "",
	pos_en: "",
	image: "",
	order: 0,
};

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: TeamInput & { image?: string | null };
};

export default function TeamForm({ mode, editId, initial = emptyForm }: Props) {
	const router = useRouter();
	const [data, setData] = useState<TeamInput>({
		name: initial.name ?? "",
		name_en: initial.name_en ?? "",
		pos: initial.pos ?? "",
		pos_en: initial.pos_en ?? "",
		image: initial.image ?? "",
		order: initial.order ?? 0,
	});
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		resolveImage(initial.image ?? null)
	);
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(data.image ? resolveImage(data.image) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.image?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(file.type, file.size, "team", name);
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
		if (!data.name?.trim()) return toast.error("Name (MN) is required");
		if (!data.name_en?.trim()) return toast.error("Name (EN) is required");
		if (!data.pos?.trim()) return toast.error("Position (MN) is required");
		if (!data.pos_en?.trim()) return toast.error("Position (EN) is required");
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			const payload: TeamInput = {
				...data,
				image: imageKey ?? (data.image?.trim() || null),
			};
			if (mode === "edit" && editId) {
				await updateTeam(editId, payload);
				toast.success("Team member updated!");
			} else {
				await createTeam(payload);
				toast.success("Team member created!");
			}
			router.push("/admin/team");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview =
		imagePreview || (data.image ? resolveImage(data.image) : null);

	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8'>
			<div className='mb-6 flex items-center gap-3'>
				<Link
					href='/admin/team'
					className='text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary'
				>
					← Back to list
				</Link>
			</div>
			<h1 className='mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl'>
				{mode === "edit" ? "Edit Team Member" : "Add Team Member"}
			</h1>
			<form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
				<div className='grid gap-4 sm:grid-cols-2'>
					<InputGroup
						label='Name (Mongolian)'
						type='text'
						name='name'
						value={data.name}
						placeholder='Э. Энхдэлгэр'
						required
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, name: e.target.value }))
						}
					/>
					<InputGroup
						label='Name (English)'
						type='text'
						name='name_en'
						value={data.name_en}
						placeholder='Enkhdelger Enkhbold'
						required
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, name_en: e.target.value }))
						}
					/>
				</div>
				<div className='grid gap-4 sm:grid-cols-2'>
					<InputGroup
						label='Position (Mongolian)'
						type='text'
						name='pos'
						value={data.pos}
						placeholder='Гүйцэтгэх Захирал'
						required
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, pos: e.target.value }))
						}
					/>
					<InputGroup
						label='Position (English)'
						type='text'
						name='pos_en'
						value={data.pos_en}
						placeholder='Executive Director'
						required
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, pos_en: e.target.value }))
						}
					/>
				</div>
				<InputGroup
					label='Order'
					type='number'
					name='order'
					value={String(data.order ?? 0)}
					placeholder='0'
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, order: parseInt(e.target.value, 10) || 0 }))
					}
				/>

				{/* Image — URL or file upload */}
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Photo
					</label>
					<div className='flex flex-wrap items-start gap-4'>
						<label className='relative flex h-32 w-32 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5'>
							{currentPreview ? (
								<Image
									src={currentPreview}
									alt='Team member'
									fill
									className='object-cover'
									sizes='128px'
									unoptimized={currentPreview.startsWith("blob:")}
								/>
							) : (
								<span className='px-2 text-center text-xs text-body/70'>
									Upload photo
								</span>
							)}
							<input
								type='file'
								className='sr-only'
								accept='image/png,image/jpeg,image/jpg'
								onChange={handleImageChange}
							/>
						</label>
						<div className='flex flex-col gap-2'>
							<p className='text-sm text-body/70'>PNG, JPG. Max 2MB.</p>
							<p className='text-xs text-body/50'>
								Or paste an image URL below:
							</p>
							<input
								type='url'
								placeholder='https://example.com/photo.jpg'
								value={
									file ? "" : data.image?.startsWith("http") ? data.image : ""
								}
								onChange={(e) => {
									setData((p) => ({ ...p, image: e.target.value }));
									setImagePreview(e.target.value || null);
									setFile(null);
								}}
								disabled={!!file}
								className='h-9 w-64 rounded-lg border border-stroke bg-gray-1 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-40 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
							/>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark'>
					<Link
						href='/admin/team'
						className='inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium duration-200 hover:bg-slate-100 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
					>
						Cancel
					</Link>
					<button
						type='submit'
						disabled={loading}
						className='inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white duration-200 hover:bg-primary-dark disabled:opacity-70'
					>
						{loading ? (
							<>
								<Loader style='border-white' />
								<span className='ml-2'>
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
