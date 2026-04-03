"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "@/components/Common/Dashboard/InputGroup";
import { Editor } from "@/components/Common/Dashboard/Editor";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import { getSignedURL } from "@/actions/upload";
import {
	createProduct,
	updateProduct,
	type ProductInput,
	type AttributeValueInput,
} from "@/actions/product";
import { useRouter } from "next/navigation";

type CategoryOption = { id: string; name: string; name_en: string; types: string };
type TypeOption = { id: string; name: string; name_en: string };
type GroupOption = { id: string; name: string; name_en: string };
type AttributeOption = { id: string; name: string; name_en: string; data_type: string };

function productImageSrc(path: string | null): string | null {
	if (!path?.trim()) return null;
	if (path.startsWith("http")) return path;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${path}` : null;
}

const emptyForm: ProductInput = {
	name: "",
	name_en: "",
	description: "",
	description_en: "",
	price: null,
	img_path: "",
	brochure_path: "",
	model_3d: "",
	video_link: "",
	product_types: "",
	product_order: null,
	status: "ACTIVE",
	categoryId: "",
	attributeValues: [],
};

type ProductFormProps = {
	mode: "create" | "edit";
	editId?: string;
	initial?: Partial<ProductInput> & {
		attributeValues?: Array<{
			attributeId: string;
			groupId: string;
			value: string;
		}>;
	};
	categories?: CategoryOption[];
	productTypes?: TypeOption[];
	attributeGroups?: GroupOption[];
	attributes?: AttributeOption[];
};

export default function ProductForm({
	mode,
	editId,
	initial = emptyForm,
	categories = [],
	productTypes = [],
	attributeGroups = [],
	attributes = [],
}: ProductFormProps) {
	const router = useRouter();
	const [data, setData] = useState<ProductInput>({
		name: initial.name ?? "",
		name_en: initial.name_en ?? "",
		description: initial.description ?? "",
		description_en: initial.description_en ?? "",
		price: initial.price ?? null,
		img_path: initial.img_path ?? "",
		brochure_path: initial.brochure_path ?? "",
		model_3d: initial.model_3d ?? "",
		video_link: initial.video_link ?? "",
		product_types: initial.product_types ?? "",
		product_order: initial.product_order ?? null,
		status: initial.status ?? "ACTIVE",
		categoryId: initial.categoryId ?? "",
		attributeValues: initial.attributeValues ?? [],
	});
	const [file, setFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(
		productImageSrc(initial.img_path ?? null)
	);
	const [loading, setLoading] = useState(false);

	const categoriesForType = useMemo(() => {
		const list = categories ?? [];
		if (!data.product_types?.trim()) return list;
		return list.filter((c) => c.types === data.product_types);
	}, [categories, data.product_types]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (f) {
			setFile(f);
			setImagePreview(URL.createObjectURL(f));
		} else {
			setFile(null);
			setImagePreview(data.img_path ? productImageSrc(data.img_path) : null);
		}
	};

	const uploadImage = async (): Promise<string | null> => {
		if (!file) return data.img_path?.trim() || null;
		const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
		const name = `${Date.now()}.${ext}`;
		const result = await getSignedURL(
			file.type,
			file.size,
			"product",
			name
		);
		if (result.failure) {
			toast.error(result.failure);
			return null;
		}
		const url = result.success!.url;
		const res = await fetch(url, {
			method: "PUT",
			headers: { "Content-Type": file.type || "application/octet-stream" },
			body: file,
		});
		if (res.ok) return result.success!.key;
		toast.error("Image upload failed");
		return null;
	};

	const setAttributeValue = (index: number, patch: Partial<AttributeValueInput>) => {
		setData((p) => {
			const next = [...(p.attributeValues ?? [])];
			next[index] = { ...next[index], ...patch };
			return { ...p, attributeValues: next };
		});
	};

	const addAttributeValue = () => {
		const groupId = (attributeGroups && attributeGroups[0]) ? attributeGroups[0].id : "";
		const attributeId = (attributes && attributes[0]) ? attributes[0].id : "";
		setData((p) => ({
			...p,
			attributeValues: [
				...(p.attributeValues ?? []),
				{ attributeId, groupId, value: "" },
			],
		}));
	};

	const removeAttributeValue = (index: number) => {
		setData((p) => {
			const next = [...(p.attributeValues ?? [])];
			next.splice(index, 1);
			return { ...p, attributeValues: next };
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!data.name?.trim() ||
			!data.name_en?.trim() ||
			!data.description?.trim() ||
			!data.description_en?.trim() ||
			!data.categoryId?.trim()
		) {
			return toast.error("Name, Description (MN & EN) and Category are required!");
		}
		setLoading(true);
		try {
			const imageKey = await uploadImage();
			const payload: ProductInput = {
				...data,
				img_path: imageKey ?? (data.img_path?.trim() || null),
				attributeValues: (data.attributeValues ?? []).filter(
					(av) => av.attributeId?.trim() && av.groupId?.trim()
				),
			};
			if (mode === "edit" && editId) {
				await updateProduct(editId, payload);
				toast.success("Product updated!");
			} else {
				await createProduct(payload);
				toast.success("Product created!");
			}
			router.push("/admin/products");
			router.refresh();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	const currentPreview =
		imagePreview || (data.img_path ? productImageSrc(data.img_path) : null);

	return (
		<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark sm:p-8">
			<div className="mb-6 flex items-center gap-3">
				<Link
					href="/admin/products"
					className="text-body hover:text-primary dark:text-gray-5 dark:hover:text-primary"
				>
					← Back to list
				</Link>
			</div>
			<h1 className="mb-6 font-satoshi text-xl font-bold tracking-[-.5px] text-dark dark:text-white sm:text-custom-2xl">
				{mode === "edit" ? "Edit Product" : "Add Product"}
			</h1>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				<InputGroup
					label="Name (MN)"
					type="text"
					name="name"
					value={data.name}
					placeholder="Нэр"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, name: e.target.value }))
					}
				/>
				<InputGroup
					label="Name (EN)"
					type="text"
					name="name_en"
					value={data.name_en}
					placeholder="Name"
					required
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, name_en: e.target.value }))
					}
				/>
				<Editor
					label="Description (MN)"
					value={data.description}
					placeholder="Тайлбар"
					onChange={(value) => setData((p) => ({ ...p, description: value }))}
				/>
				<Editor
					label="Description (EN)"
					value={data.description_en}
					placeholder="Description"
					onChange={(value) => setData((p) => ({ ...p, description_en: value }))}
				/>
				<InputGroup
					label="Price (optional)"
					type="text"
					name="price"
					value={data.price != null ? String(data.price) : ""}
					placeholder="0"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const v = e.target.value.trim();
						setData((p) => ({
							...p,
							price: v === "" ? null : v,
						}));
					}}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Product type
					</label>
					<select
						value={data.product_types ?? ""}
						onChange={(e) => {
							const v = e.target.value;
							setData((p) => ({
								...p,
								product_types: v || null,
								categoryId: v ? p.categoryId : "",
							}));
						}}
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="">—</option>
						{productTypes.map((t) => (
							<option key={t.id} value={t.name}>
								{t.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Category
					</label>
					<select
						value={data.categoryId}
						onChange={(e) =>
							setData((p) => ({ ...p, categoryId: e.target.value }))
						}
						required
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="">Select category</option>
						{categoriesForType.map((c) => (
							<option key={c.id} value={c.id}>
								{c.name}
							</option>
						))}
					</select>
				</div>
				<InputGroup
					label="Product order (optional)"
					type="number"
					name="product_order"
					value={data.product_order != null ? String(data.product_order) : ""}
					placeholder="0"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						const v = e.target.value.trim();
						setData((p) => ({
							...p,
							product_order: v === "" ? null : parseInt(v, 10) || null,
						}));
					}}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Status
					</label>
					<select
						value={data.status ?? "ACTIVE"}
						onChange={(e) => setData((p) => ({ ...p, status: e.target.value }))}
						className="h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
					>
						<option value="ACTIVE">ACTIVE</option>
						<option value="INACTIVE">INACTIVE</option>
					</select>
				</div>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Product image
					</label>
					<div className="flex flex-wrap items-start gap-4">
						<label className="relative flex h-32 w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-stroke bg-gray-1 dark:border-stroke-dark dark:bg-white/5">
							{currentPreview ? (
								<Image
									src={currentPreview}
									alt="Product"
									fill
									className="object-cover"
									sizes="160px"
									unoptimized={currentPreview.startsWith("blob:")}
								/>
							) : (
								<span className="text-body/70">Upload image</span>
							)}
							<input
								type="file"
								className="sr-only"
								accept="image/png,image/jpeg,image/jpg"
								onChange={handleImageChange}
							/>
						</label>
						<p className="text-sm text-body/70">PNG, JPG. Max 2MB.</p>
					</div>
				</div>
				<InputGroup
					label="Brochure path (optional)"
					type="text"
					name="brochure_path"
					value={data.brochure_path ?? ""}
					placeholder="product/filename.pdf"
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, brochure_path: e.target.value }))
					}
				/>
				<div>
					<label className="mb-2 block font-satoshi text-sm font-medium text-dark dark:text-white">
						Model 3D / iframe (optional)
					</label>
					<textarea
						value={data.model_3d ?? ""}
						onChange={(e) =>
							setData((p) => ({ ...p, model_3d: e.target.value }))
						}
						rows={4}
						className="w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 outline-none ring-offset-1 dark:border-stroke-dark dark:bg-transparent dark:text-white"
						placeholder="<iframe ...></iframe>"
					/>
				</div>
				<InputGroup
					label="Video link (optional)"
					type="url"
					name="video_link"
					value={data.video_link ?? ""}
					placeholder="https://..."
					handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setData((p) => ({ ...p, video_link: e.target.value }))
					}
				/>

				{/* Attribute values (specifications) */}
				<div className="border-t border-stroke pt-6 dark:border-stroke-dark">
					<div className="mb-3 flex items-center justify-between">
						<h2 className="font-satoshi text-base font-semibold text-dark dark:text-white">
							Specifications
						</h2>
						<button
							type="button"
							onClick={addAttributeValue}
							disabled={!attributeGroups?.length || !attributes?.length}
							className="rounded-lg border border-stroke bg-gray-1 px-3 py-2 text-sm disabled:opacity-50 dark:border-stroke-dark dark:bg-white/5 dark:text-white"
						>
							+ Add spec
						</button>
					</div>
					{(!attributeGroups?.length || !attributes?.length) && (
						<p className="mb-3 text-sm text-amber-600 dark:text-amber-400">
							Create <strong>Attribute Value Groups</strong> and <strong>Attributes</strong> from the admin sidebar first, then they will appear here.
						</p>
					)}
					{(data.attributeValues ?? []).length === 0 ? (
						<p className="text-sm text-body/70">No specifications. Click &quot;Add spec&quot; to add attribute values.</p>
					) : (
						<div className="space-y-3">
							{(data.attributeValues ?? []).map((av, index) => (
								<div
									key={index}
									className="flex flex-wrap items-center gap-2 rounded-lg border border-stroke p-3 dark:border-stroke-dark"
								>
									<select
										value={av.groupId}
										onChange={(e) =>
											setAttributeValue(index, { groupId: e.target.value })
										}
										className="h-10 min-w-[140px] rounded border border-stroke bg-gray-1 px-3 dark:border-stroke-dark dark:bg-transparent dark:text-white"
									>
										<option value="">Select group</option>
										{(attributeGroups ?? []).map((g) => (
											<option key={g.id} value={g.id}>
												{g.name}
											</option>
										))}
									</select>
									<select
										value={av.attributeId}
										onChange={(e) =>
											setAttributeValue(index, { attributeId: e.target.value })
										}
										className="h-10 min-w-[160px] rounded border border-stroke bg-gray-1 px-3 dark:border-stroke-dark dark:bg-transparent dark:text-white"
									>
										<option value="">Select attribute</option>
										{(attributes ?? []).map((a) => (
											<option key={a.id} value={a.id}>
												{a.name}
											</option>
										))}
									</select>
									<input
										type="text"
										value={av.value}
										onChange={(e) =>
											setAttributeValue(index, { value: e.target.value })
										}
										placeholder="Value"
										className="h-10 flex-1 min-w-[100px] rounded border border-stroke bg-gray-1 px-3 dark:border-stroke-dark dark:bg-transparent dark:text-white"
									/>
									<button
										type="button"
										onClick={() => removeAttributeValue(index)}
										className="h-10 w-10 rounded bg-red/10 text-red hover:bg-red hover:text-white"
										aria-label="Remove"
									>
										×
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-3 border-t border-stroke pt-6 dark:border-stroke-dark">
					<Link
						href="/admin/products"
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
