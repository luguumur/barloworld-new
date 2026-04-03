"use client";
import { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { createProductType, updateProductType } from "@/actions/productType";
import { useRouter } from "next/navigation";

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: { name: string; name_en: string };
};

export default function ProductTypeForm({ mode, editId, initial }: Props) {
	const router = useRouter();
	const [name, setName] = useState(initial?.name ?? "");
	const [name_en, setNameEn] = useState(initial?.name_en ?? "");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !name_en.trim()) {
			toast.error("Name (MN) and Name (EN) are required.");
			return;
		}
		setLoading(true);
		try {
			if (mode === "edit" && editId) {
				await updateProductType(editId, { name: name.trim(), name_en: name_en.trim() });
				toast.success("Product type updated.");
			} else {
				await createProductType({ name: name.trim(), name_en: name_en.trim() });
				toast.success("Product type created.");
			}
			router.push("/admin/product-types");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6">
				<Link href="/admin/product-types" className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary">
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Product Type" : "Add Product Type"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md">
				<InputGroup
					label="Name (MN)"
					type="text"
					name="name"
					value={name}
					placeholder="e.g. CAT"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				/>
				<InputGroup
					label="Name (EN)"
					type="text"
					name="name_en"
					value={name_en}
					placeholder="e.g. CAT"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEn(e.target.value)}
				/>
				<div className="flex gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link
						href="/admin/product-types"
						className="inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium dark:border-stroke-dark dark:bg-white/5 dark:text-white"
					>
						Cancel
					</Link>
					<button
						type="submit"
						disabled={loading}
						className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-primary-dark disabled:opacity-70"
					>
						{loading ? <><Loader style="border-white" /><span className="ml-2">Saving...</span></> : mode === "edit" ? "Update" : "Create"}
					</button>
				</div>
			</form>
		</div>
	);
}
