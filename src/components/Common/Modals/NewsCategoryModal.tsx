"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalCloseButton from "./ModalCloseButton";
import Loader from "../Loader";
import InputGroup from "../Dashboard/InputGroup";
import toast from "react-hot-toast";
import { createNewsCategory, updateNewsCategory } from "@/actions/newsCategory";
import { useRouter } from "next/navigation";

type Category = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function NewsCategoryModal(props: {
	showModal: boolean;
	setShowModal: (v: boolean) => void;
	editCategory: Category | null;
}) {
	const { showModal, setShowModal, editCategory } = props;
	const router = useRouter();
	const [data, setData] = useState({ name: "", name_en: "" });
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (editCategory) {
			setData({ name: editCategory.name, name_en: editCategory.name_en });
		} else {
			setData({ name: "", name_en: "" });
		}
	}, [editCategory, showModal]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		if (!data.name?.trim() || !data.name_en?.trim()) {
			setLoading(false);
			return toast.error("Please fill in all fields!");
		}
		try {
			if (editCategory) {
				await updateNewsCategory(editCategory.id, data);
				toast.success("Category updated successfully!");
			} else {
				await createNewsCategory(data);
				toast.success("Category created successfully!");
			}
			setShowModal(false);
			router.refresh();
		} catch (error: unknown) {
			toast.error(
				error instanceof Error ? error.message : "Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};

	const dialogContent = (
		<>
			{/* Backdrop */}
			<div
				className={`fixed inset-0 z-[99998] bg-black/50 font-inter transition-opacity duration-300 dark:bg-black/60 ${
					showModal ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
				onClick={() => setShowModal(false)}
				aria-hidden={!showModal}
			/>
			{/* Sideline panel — slides in from the right */}
			<div
				className={`fixed right-0 top-0 z-[99999] flex h-full w-full max-w-[420px] flex-col border-l border-stroke bg-white font-inter  shadow-2xl transition-transform duration-300 ease-out dark:border-stroke-dark dark:bg-gray-dark sm:max-w-[440px] [&_.font-satoshi]:font-inter ${
					showModal ? "translate-x-0" : "translate-x-full"
				}`}
				role='dialog'
				aria-modal='true'
				aria-labelledby='news-category-dialog-title'
				aria-hidden={!showModal}
			>
				<ModalCloseButton closeModal={setShowModal} />
				<div className='flex flex-1 flex-col overflow-y-auto p-6 sm:p-8'>
					<h2
						id='news-category-dialog-title'
						className='mb-6 text-lg font-bold tracking-[-.5px] text-dark dark:text-white'
					>
						{editCategory ? "Edit News Category" : "Add News Category"}
					</h2>
					<form
						className='flex flex-1 flex-col space-y-4'
						onSubmit={handleSubmit}
					>
						<InputGroup
							label='Name (MN)'
							type='text'
							name='name'
							value={data.name}
							placeholder='Мэдээ'
							required={true}
							handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
						<InputGroup
							label='Name (EN)'
							type='text'
							name='name_en'
							value={data.name_en}
							placeholder='News'
							required={true}
							handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setData((prev) => ({ ...prev, name_en: e.target.value }))
							}
						/>
						<div className='mt-auto flex justify-end gap-3 border-t border-stroke pt-6 dark:border-stroke-dark'>
							<button
								type='button'
								onClick={() => setShowModal(false)}
								className='inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium duration-200 hover:bg-slate-100 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
							>
								Cancel
							</button>
							<button
								type='submit'
								disabled={loading}
								className='inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white duration-200 hover:bg-primary-dark disabled:opacity-70'
							>
								{loading ? (
									<>
										<Loader style='border-white' />
										<span className='ml-2'>
											{editCategory ? "Updating..." : "Creating..."}
										</span>
									</>
								) : editCategory ? (
									"Update"
								) : (
									"Create"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);

	// Only render portal after mount so server and client initial output match (avoids hydration error)
	if (!mounted || typeof document === "undefined") return null;
	return createPortal(dialogContent, document.body);
}
