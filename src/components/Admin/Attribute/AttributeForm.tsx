"use client";
import { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { createAttribute, updateAttribute } from "@/actions/attribute";
import { useRouter } from "next/navigation";

const DATA_TYPES = ["STRING", "INTEGER", "DECIMAL", "BOOLEAN", "DATETIME"];

type Props = {
	mode: "create" | "edit";
	editId?: string;
	initial?: { name: string; name_en: string; data_type: string };
};

export default function AttributeForm({ mode, editId, initial }: Props) {
	const router = useRouter();
	const [name, setName] = useState(initial?.name ?? "");
	const [name_en, setNameEn] = useState(initial?.name_en ?? "");
	const [data_type, setDataType] = useState(initial?.data_type ?? "STRING");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !name_en.trim() || !data_type.trim()) {
			toast.error("Name (MN), Name (EN) and Data type are required.");
			return;
		}
		setLoading(true);
		try {
			if (mode === "edit" && editId) {
				await updateAttribute(editId, {
					name: name.trim(),
					name_en: name_en.trim(),
					data_type: data_type.trim(),
				});
				toast.success("Attribute updated.");
			} else {
				await createAttribute({
					name: name.trim(),
					name_en: name_en.trim(),
					data_type: data_type.trim(),
				});
				toast.success("Attribute created.");
			}
			router.push("/admin/attributes");
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
				<Link href="/admin/attributes" className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary">
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Attribute" : "Add Attribute"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md">
				<InputGroup
					label="Name (MN)"
					type="text"
					name="name"
					value={name}
					placeholder="Шинж чанар"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
				/>
				<InputGroup
					label="Name (EN)"
					type="text"
					name="name_en"
					value={name_en}
					placeholder="Attribute name"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEn(e.target.value)}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Data type
					</label>
					<select
						value={data_type}
						onChange={(e) => setDataType(e.target.value)}
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						{DATA_TYPES.map((t) => (
							<option key={t} value={t}>{t}</option>
						))}
					</select>
				</div>
				<div className="flex gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link href="/admin/attributes" className="inline-flex items-center rounded-lg border border-stroke bg-gray-1 px-5 py-2.5 font-medium dark:border-stroke-dark dark:bg-white/5 dark:text-white">
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
