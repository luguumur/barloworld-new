"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import { getSignedURL } from "@/actions/upload";
import {
	createHomeCard,
	updateHomeCard,
	HomeCardInput,
} from "@/actions/homeMain";

const empty: HomeCardInput = {
	title: "",
	title_en: "",
	image: "",
	url: "",
	order: 0,
};

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: HomeCardInput;
};

export default function HomeCardForm({ mode, editId, initial = empty }: Props) {
	const router = useRouter();
	const [data, setData] = useState<HomeCardInput>(initial);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>(initial.image || "");

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f) return;
		setFile(f);
		setPreview(URL.createObjectURL(f));
		setData((p) => ({ ...p, image: "" })); // clear manual URL when file picked
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setData((p) => ({ ...p, image: val }));
		setPreview(val);
		setFile(null); // clear file when URL typed
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.image.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(file.type, file.size, "home-cards", name);
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

	const resolvePreview = (src: string) => {
		if (!src) return null;
		if (
			src.startsWith("blob:") ||
			src.startsWith("http") ||
			src.startsWith("/")
		)
			return src;
		const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
		return base ? `${base}/${src}` : null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!data.title.trim() || !data.title_en.trim())
			return toast.error("Both titles are required");
		if (!file && !data.image.trim()) return toast.error("Image is required");
		if (!data.url.trim()) return toast.error("Link URL is required");
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			if (!imageKey) return;
			const payload = { ...data, image: imageKey };
			if (mode === "edit" && editId) {
				await updateHomeCard(editId, payload);
				toast.success("Card updated!");
			} else {
				await createHomeCard(payload);
				toast.success("Card created!");
			}
			router.push("/admin/home-main");
			router.refresh();
		} catch {
			toast.error("Failed to save");
		} finally {
			setLoading(false);
		}
	};

	const displayPreview = resolvePreview(preview);

	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8'>
			<div className='mb-6'>
				<Link
					href='/admin/home-main'
					className='text-body hover:text-primary dark:text-gray-5'
				>
					← Back
				</Link>
			</div>
			<h1 className='mb-6 font-satoshi text-xl font-bold text-dark dark:text-white'>
				{mode === "edit" ? "Edit Card" : "Add Card"}
			</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<div className='grid gap-4 sm:grid-cols-2'>
					<InputGroup
						label='Title (MN)'
						type='text'
						name='title'
						value={data.title}
						placeholder='ШИНЭ ТОНОГ ТӨХӨӨРӨМЖ'
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, title: e.target.value }))
						}
					/>
					<InputGroup
						label='Title (EN)'
						type='text'
						name='title_en'
						value={data.title_en}
						placeholder='NEW EQUIPMENT'
						handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setData((p) => ({ ...p, title_en: e.target.value }))
						}
					/>
				</div>

				{/* Image — upload or URL */}
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Image
					</label>
					<div className='flex flex-wrap items-start gap-4'>
						{/* clickable preview / upload trigger */}
						<label className='relative flex h-32 w-48 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5'>
							{displayPreview ? (
								<Image
									src={displayPreview}
									alt='preview'
									fill
									className='object-cover'
									sizes='192px'
									unoptimized={displayPreview.startsWith("blob:")}
								/>
							) : (
								<span className='text-sm text-body/60'>Click to upload</span>
							)}
							<input
								type='file'
								className='sr-only'
								accept='image/png,image/jpeg,image/jpg'
								onChange={handleFileChange}
							/>
						</label>

						<div className='flex flex-col gap-2'>
							<p className='text-sm text-body/70'>PNG, JPG · Max 2 MB</p>

							{file && (
								<button
									type='button'
									onClick={() => {
										setFile(null);
										setPreview(data.image || "");
									}}
									className='text-xs text-red hover:underline'
								>
									Remove file
								</button>
							)}
						</div>
					</div>
				</div>

				<InputGroup
					label='Link URL'
					type='text'
					name='url'
					value={data.url}
					placeholder='/products'
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, url: e.target.value }))
					}
				/>
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

				<div className='flex gap-3 border-t border-stroke pt-4 dark:border-stroke-dark'>
					<Link
						href='/admin/home-main'
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
								<span className='ml-2'>
									{mode === "edit" ? "Updating…" : "Creating…"}
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
