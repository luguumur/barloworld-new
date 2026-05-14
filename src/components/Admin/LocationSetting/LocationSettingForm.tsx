"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import { getSignedURL } from "@/actions/upload";
import {
	upsertLocationSetting,
	LocationSettingInput,
} from "@/actions/locationSetting";

type Props = { initial: LocationSettingInput };

function resolvePreview(src: string): string | null {
	if (!src) return null;
	if (src.startsWith("blob:") || src.startsWith("http") || src.startsWith("/"))
		return src;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${src}` : null;
}

export default function LocationSettingForm({ initial }: Props) {
	const router = useRouter();
	const [data, setData] = useState<LocationSettingInput>(initial);
	const [file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState(initial.image || "");
	const [loading, setLoading] = useState(false);

	const set =
		(key: keyof LocationSettingInput) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setData((p) => ({ ...p, [key]: e.target.value }));

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f) return;
		setFile(f);
		setPreview(URL.createObjectURL(f));
		setData((p) => ({ ...p, image: "" }));
	};

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((p) => ({ ...p, image: e.target.value }));
		setPreview(e.target.value);
		setFile(null);
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.image.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const result = await getSignedURL(
			file.type,
			file.size,
			"location",
			`${Date.now()}.${ext}`
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
		return res.ok ? result.success!.key : null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			await upsertLocationSetting({ ...data, image: imageKey ?? data.image });
			toast.success("Location settings saved!");
			router.refresh();
		} catch {
			toast.error("Failed to save");
		} finally {
			setLoading(false);
		}
	};

	const displayPreview = resolvePreview(preview);

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
			{/* Image */}
			<div>
				<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
					Location Photo
				</label>
				<div className='flex flex-wrap items-start gap-4'>
					<label className='relative flex h-40 w-64 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5'>
						{displayPreview ? (
							<Image
								src={displayPreview}
								alt='location'
								fill
								className='object-cover'
								sizes='256px'
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
						<p className='text-xs text-body/50'>Or paste an image URL:</p>
						<input
							type='url'
							placeholder='https://...'
							value={
								file ? "" : data.image.startsWith("http") ? data.image : ""
							}
							onChange={handleUrlChange}
							disabled={!!file}
							className='h-9 w-64 rounded-lg border border-stroke bg-gray-1 px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-40 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
						/>
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

			{/* Map embed URL */}
			<div>
				<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
					Google Maps Embed URL
				</label>
				<textarea
					rows={3}
					value={data.mapEmbedUrl}
					onChange={set("mapEmbedUrl")}
					placeholder='https://www.google.com/maps/embed?...'
					className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
				/>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Address (MN)
					</label>
					<textarea
						rows={2}
						value={data.address}
						onChange={set("address")}
						className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
					/>
				</div>
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Address (EN)
					</label>
					<textarea
						rows={2}
						value={data.address_en}
						onChange={set("address_en")}
						className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
					/>
				</div>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				<InputGroup
					label='Phone'
					type='text'
					name='phone'
					value={data.phone}
					placeholder='+976 7018-7588'
					handleChange={
						set("phone") as (e: React.ChangeEvent<HTMLInputElement>) => void
					}
				/>
				<InputGroup
					label='Email'
					type='email'
					name='email'
					value={data.email}
					placeholder='contact@barloworld.mn'
					handleChange={
						set("email") as (e: React.ChangeEvent<HTMLInputElement>) => void
					}
				/>
			</div>

			<div className='border-t border-stroke pt-4 dark:border-stroke-dark'>
				<button
					type='submit'
					disabled={loading}
					className='inline-flex items-center rounded-lg bg-primary px-6 py-2.5 font-medium text-white hover:bg-primary-dark disabled:opacity-70'
				>
					{loading ? (
						<>
							<Loader style='border-white' />
							<span className='ml-2'>Saving…</span>
						</>
					) : (
						"Save Settings"
					)}
				</button>
			</div>
		</form>
	);
}
