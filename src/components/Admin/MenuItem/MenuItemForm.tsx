"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import {
	createMenuItem,
	updateMenuItem,
	getMenuRoots,
	type MenuItemInput,
} from "@/actions/menu";
import { useRouter } from "next/navigation";

const emptyForm: MenuItemInput = {
	title: "",
	title_en: "",
	path: "",
	linkType: "PAGE",
	parentId: null,
	order: 0,
	newTab: false,
};

type MenuItemFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: MenuItemInput & { id?: string };
};

export default function MenuItemForm({
	mode,
	editId,
	initial = emptyForm,
}: MenuItemFormProps) {
	const router = useRouter();
	const [data, setData] = useState<MenuItemInput>({
		title: initial.title ?? "",
		title_en: initial.title_en ?? "",
		path: initial.path ?? "",
		linkType: initial.linkType ?? "PAGE",
		parentId: initial.parentId ?? null,
		order: initial.order ?? 0,
		newTab: initial.newTab ?? false,
	});
	const [roots, setRoots] = useState<{ id: string; title: string; title_en: string | null }[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getMenuRoots().then(setRoots);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!data.title?.trim()) {
			return toast.error("Title is required!");
		}
		if (!data.path?.trim()) {
			return toast.error("Path / URL is required!");
		}
		setLoading(true);
		try {
			if (mode === "edit" && editId) {
				await updateMenuItem(editId, data);
				toast.success("Menu item updated!");
			} else {
				await createMenuItem(data);
				toast.success("Menu item created!");
			}
			router.push("/admin/menu");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6 flex items-center gap-3">
				<Link
					href="/admin/menu"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Menu Item" : "Add Menu Item"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<InputGroup
					label="Title"
					type="text"
					name="title"
					value={data.title}
					placeholder="Menu label"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, title: e.target.value }))
					}
				/>
				<InputGroup
					label="Title (EN) – optional"
					type="text"
					name="title_en"
					value={data.title_en ?? ""}
					placeholder="Menu label (English)"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, title_en: e.target.value }))
					}
				/>
				<div>
					<label className="mb-2.5 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Link type
					</label>
					<select
						value={data.linkType}
						onChange={(e) =>
							setData((p) => ({ ...p, linkType: e.target.value as "PAGE" | "CUSTOM" }))
						}
						className="w-full rounded-lg border border-gray-3 px-5.5 py-3 text-dark outline-none ring-offset-1 focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="PAGE">Custom Page (/[slug])</option>
						<option value="CUSTOM">Custom URL</option>
					</select>
				</div>
				<InputGroup
					label={data.linkType === "PAGE" ? "Page slug" : "URL"}
					type="text"
					name="path"
					value={data.path}
					placeholder={data.linkType === "PAGE" ? "about-us" : "https://..."}
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, path: e.target.value }))
					}
				/>
				{data.linkType === "PAGE" && (
					<p className="-mt-2 text-sm text-body/70 dark:text-gray-5">
						Links to /{data.path.trim() || "…"} (CustomPageRoute)
					</p>
				)}
				<div>
					<label className="mb-2.5 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Parent (optional)
					</label>
					<select
						value={data.parentId ?? ""}
						onChange={(e) =>
							setData((p) => ({ ...p, parentId: e.target.value || null }))
						}
						className="w-full rounded-lg border border-gray-3 px-5.5 py-3 text-dark outline-none ring-offset-1 focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="">— Top level —</option>
						{roots.filter((r) => r.id !== editId).map((r) => (
							<option key={r.id} value={r.id}>
								{r.title_en ?? r.title}
							</option>
						))}
					</select>
				</div>
				<InputGroup
					label="Order"
					type="number"
					name="order"
					value={String(data.order)}
					placeholder="0"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, order: parseInt(e.target.value, 10) || 0 }))
					}
				/>
				<label className="flex cursor-pointer items-center gap-2">
					<input
						type="checkbox"
						checked={data.newTab}
						onChange={(e) => setData((p) => ({ ...p, newTab: e.target.checked }))}
						className="rounded border-stroke text-primary focus:ring-primary dark:border-stroke-dark"
					/>
					<span className="font-satoshi text-sm text-dark dark:text-white">Open in new tab</span>
				</label>
				<div className="flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link
						href="/admin/menu"
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
