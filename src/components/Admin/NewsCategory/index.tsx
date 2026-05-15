"use client";
import { useState } from "react";
import NewsCategoryEmptyState from "./NewsCategoryEmptyState";
import NewsCategoryListTable from "./NewsCategoryListTable";
import NewsCategoryTopbar from "./NewsCategoryTopbar";
import NewsCategoryModal from "@/components/Common/Modals/NewsCategoryModal";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

type Category = {
	id: string;
	name: string;
	name_en: string;
	createdAt: Date;
	updatedAt: Date;
};

export default function NewsCategoryListContainer({
	categories,
	initialSearch = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	categories: Category[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	const [showModal, setShowModal] = useState(false);
	const [editCategory, setEditCategory] = useState<Category | null>(null);

	const handleAdd = () => {
		setEditCategory(null);
		setShowModal(true);
	};

	const handleEdit = (category: Category) => {
		setEditCategory(category);
		setShowModal(true);
	};

	return (
		<>
			<div className='mb-5'>
				<NewsCategoryTopbar
					onAddClick={handleAdd}
					initialSearch={initialSearch}
				/>
			</div>
			{categories?.length ? (
				<>
					<NewsCategoryListTable categories={categories} onEdit={handleEdit} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='categories'
					/>
				</>
			) : (
				<NewsCategoryEmptyState />
			)}
			<NewsCategoryModal
				showModal={showModal}
				setShowModal={setShowModal}
				editCategory={editCategory}
			/>
		</>
	);
}
