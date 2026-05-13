"use client";
import { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import {
	createTranslation,
	updateTranslation,
	type TranslationInput,
} from "@/actions/translation";
import { useRouter } from "next/navigation";

const emptyForm: TranslationInput = {
	key: "",
	value_mn: "",
	value_en: "",
};

type TranslationFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: TranslationInput;
};

export default function TranslationForm({
	mode,
	editId,
	initial = emptyForm,
}: TranslationFormProps) {
	const router = useRouter();
	const [data, setData] = useState<TranslationInput>({
		key: initial.key ?? "",
		value_mn: initial.value_mn ?? "",
		value_en: initial.value_en ?? "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!data.key.trim()) return toast.error("Key is required");
		if (!data.value_mn.trim() && !data.value_en.trim())
			return toast.error("At least one translation value is required");
		setLoading(true);
		try {
			if (mode === "edit" && editId) {
				await updateTranslation(editId, data);
				toast.success("Translation updated!");
			} else {
				await createTranslation(data);
				toast.success("Translation created!");
			}
			router.push("/admin/translations");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8'>
			<div className='mb-6 flex items-center gap-3'>
				<Link
					href='/admin/translations'
					className='text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary'
				>
					← Back to list
				</Link>
			</div>
			<h1 className='mb-2 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl'>
				{mode === "edit" ? "Edit Translation" : "Add Translation"}
			</h1>
			<p className='mb-6 text-sm text-body/70 dark:text-gray-5'>
				Key format:{" "}
				<code className='font-mono rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10'>
					Namespace.keyName
				</code>{" "}
				(e.g.{" "}
				<code className='font-mono rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10'>
					HomeData.title
				</code>
				) or a top-level key like{" "}
				<code className='font-mono rounded bg-gray-100 px-1 py-0.5 dark:bg-white/10'>
					Menu
				</code>
				.
			</p>
			<form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
				<InputGroup
					label='Key'
					type='text'
					name='key'
					value={data.key}
					placeholder='HomeData.title'
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, key: e.target.value }))
					}
				/>
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Value (MN)
					</label>
					<textarea
						value={data.value_mn}
						onChange={(e) =>
							setData((p) => ({ ...p, value_mn: e.target.value }))
						}
						placeholder='Монгол орчуулга'
						rows={3}
						className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white'
					/>
				</div>
				<div>
					<label className='mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white'>
						Value (EN)
					</label>
					<textarea
						value={data.value_en}
						onChange={(e) =>
							setData((p) => ({ ...p, value_en: e.target.value }))
						}
						placeholder='English translation'
						rows={3}
						className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 outline-none ring-offset-1 duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white'
					/>
				</div>

				<div className='flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark'>
					<Link
						href='/admin/translations'
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
