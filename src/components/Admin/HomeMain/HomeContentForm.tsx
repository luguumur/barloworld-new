"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import { upsertHomeContent, HomeContentInput } from "@/actions/homeMain";

type Props = { initial: HomeContentInput };

export default function HomeContentForm({ initial }: Props) {
	const router = useRouter();
	const [data, setData] = useState<HomeContentInput>(initial);
	const [loading, setLoading] = useState(false);

	const set =
		(key: keyof HomeContentInput) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setData((p) => ({ ...p, [key]: e.target.value }));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await upsertHomeContent(data);
			toast.success("Content saved!");
			router.refresh();
		} catch {
			toast.error("Failed to save");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className='grid gap-4 sm:grid-cols-2'>
				<InputGroup
					label='Title — before (MN)'
					type='text'
					name='titleBefore'
					value={data.titleBefore}
					placeholder='Барлоуорлд'
					handleChange={set("titleBefore")}
				/>
				<InputGroup
					label='Title — before (EN)'
					type='text'
					name='titleBefore_en'
					value={data.titleBefore_en}
					placeholder='What We'
					handleChange={set("titleBefore_en")}
				/>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<InputGroup
					label='Title — main (MN)'
					type='text'
					name='titleMain'
					value={data.titleMain}
					placeholder='Монгол'
					handleChange={set("titleMain")}
				/>
				<InputGroup
					label='Title — main (EN)'
					type='text'
					name='titleMain_en'
					value={data.titleMain_en}
					placeholder='Offer'
					handleChange={set("titleMain_en")}
				/>
			</div>
			<div>
				<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
					Description (MN)
				</label>
				<textarea
					rows={4}
					value={data.description}
					onChange={set("description")}
					className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
				/>
			</div>
			<div>
				<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
					Description (EN)
				</label>
				<textarea
					rows={4}
					value={data.description_en}
					onChange={set("description_en")}
					className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white'
				/>
			</div>
			<div className='grid gap-4 sm:grid-cols-2'>
				<InputGroup
					label='Button text (MN)'
					type='text'
					name='btnText'
					value={data.btnText}
					placeholder='БҮТЭЭГДЭХҮҮН ҮЗЭХ'
					handleChange={set("btnText")}
				/>
				<InputGroup
					label='Button text (EN)'
					type='text'
					name='btnText_en'
					value={data.btnText_en}
					placeholder='VIEW ALL PRODUCTS'
					handleChange={set("btnText_en")}
				/>
			</div>
			<InputGroup
				label='Button URL'
				type='text'
				name='btnUrl'
				value={data.btnUrl}
				placeholder='/products'
				handleChange={set("btnUrl")}
			/>
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
						"Save Content"
					)}
				</button>
			</div>
		</form>
	);
}
