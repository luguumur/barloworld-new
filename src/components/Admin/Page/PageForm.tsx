"use client";
import { useState } from "react";
import Link from "next/link";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import { Editor } from "@/components/Common/Dashboard/Editor";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import {
	createPage,
	updatePage,
	type PageInput,
} from "@/actions/page";
import { useRouter } from "next/navigation";

const emptyForm: PageInput = {
	slug: "",
	title: "",
	title_en: "",
	description: "",
	description_en: "",
	content: "",
	content_en: "",
};

function slugFromTitle(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9-_]/g, "");
}

type PageFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: PageInput & { slug?: string };
};

export default function PageForm({
	mode,
	editId,
	initial = emptyForm,
}: PageFormProps) {
	const router = useRouter();
	const [data, setData] = useState<PageInput>({
		slug: initial.slug ?? "",
		title: initial.title ?? "",
		title_en: initial.title_en ?? "",
		description: initial.description ?? "",
		description_en: initial.description_en ?? "",
		content: initial.content ?? "",
		content_en: initial.content_en ?? "",
	});
	const [loading, setLoading] = useState(false);

	const handleTitleEnChange = (value: string) => {
		setData((p) => ({
			...p,
			title_en: value,
			...(mode === "create" && !p.slug?.trim() && { slug: slugFromTitle(value) }),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!data.slug?.trim() ||
			!data.title?.trim() ||
			!data.title_en?.trim() ||
			!data.content?.trim() ||
			!data.content_en?.trim()
		) {
			return toast.error("Slug, Title (MN & EN), and Content (MN & EN) are required!");
		}
		setLoading(true);
		try {
			if (mode === "edit" && editId) {
				await updatePage(editId, data);
				toast.success("Page updated!");
			} else {
				await createPage(data);
				toast.success("Page created!");
			}
			router.push("/admin/pages");
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
					href="/admin/pages"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Page" : "Add Custom Page"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<InputGroup
					label="Slug (URL path)"
					type="text"
					name="slug"
					value={data.slug}
					placeholder="e.g. service or about-us"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, slug: e.target.value }))
					}
				/>
				<p className="-mt-2 text-sm text-body/70 dark:text-gray-5">
					Page will be available at /{data.slug.trim() || "…"}. Use lowercase letters, numbers, and hyphens only.
				</p>
				<InputGroup
					label="Title (MN)"
					type="text"
					name="title"
					value={data.title}
					placeholder="Гарчиг"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, title: e.target.value }))
					}
				/>
				<InputGroup
					label="Title (EN)"
					type="text"
					name="title_en"
					value={data.title_en}
					placeholder="Title"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleTitleEnChange(e.target.value)
					}
				/>
				<InputGroup
					label="Description (MN) – for SEO"
					type="text"
					name="description"
					value={data.description ?? ""}
					placeholder="Тайлбар"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, description: e.target.value }))
					}
				/>
				<InputGroup
					label="Description (EN) – for SEO"
					type="text"
					name="description_en"
					value={data.description_en ?? ""}
					placeholder="Short description for search engines"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, description_en: e.target.value }))
					}
				/>
				<Editor
					label="Content (MN)"
					value={data.content}
					placeholder="Контент"
					onChange={(value) => setData((p) => ({ ...p, content: value }))}
				/>
				<Editor
					label="Content (EN)"
					value={data.content_en}
					placeholder="Page content"
					onChange={(value) => setData((p) => ({ ...p, content_en: value }))}
				/>
				<div className="flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link
						href="/admin/pages"
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
								<span className="ml-2">
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
