"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { Prisma } from "@prisma/client";

export type AttributeValueInput = {
	attributeId: string;
	groupId: string;
	value: string; // stored in string_value; can also set int/decimal by data_type if needed
};

export type ProductInput = {
	name: string;
	name_en: string;
	description: string;
	description_en: string;
	price?: string | number | null;
	img_path?: string | null;
	brochure_path?: string | null;
	model_3d?: string | null;
	video_link?: string | null;
	product_types?: string | null;
	product_order?: number | null;
	status?: string;
	categoryId: string;
	attributeValues?: AttributeValueInput[];
};

export type ProductRow = {
	id: string;
	name: string;
	name_en: string;
	description: string;
	description_en: string;
	price: unknown;
	img_path: string | null;
	brochure_path: string | null;
	model_3d: string | null;
	video_link: string | null;
	product_types: string | null;
	product_order: number | null;
	status: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
	category?: {
		id: string;
		name: string;
		name_en: string;
		types: string;
	};
	attributeValues?: Array<{
		id: string;
		attributeId: string;
		groupId: string;
		string_value: string | null;
		attribute: { id: string; name: string; name_en: string; data_type: string };
		group: { id: string; name: string; name_en: string };
	}>;
};

const db = prisma as unknown as {
	product: {
		findMany: (args: {
			orderBy?: { product_order?: "asc" | "desc"; createdAt?: "desc" };
			include?: { category: true; attributeValues?: { include: { attribute: true; group: true } } };
			where?: { categoryId?: string; product_types?: string };
		}) => Promise<ProductRow[]>;
		findUnique: (args: {
			where: { id: string };
			include?: { category: true; attributeValues: { include: { attribute: true; group: true } } };
		}) => Promise<ProductRow | null>;
		create: (args: {
			data: {
				name: string;
				name_en: string;
				description: string;
				description_en: string;
				price?: unknown;
				img_path?: string | null;
				brochure_path?: string | null;
				model_3d?: string | null;
				video_link?: string | null;
				product_types?: string | null;
				product_order?: number | null;
				status?: string;
				categoryId: string;
				attributeValues?: {
					create: Array<{
						attributeId: string;
						groupId: string;
						string_value: string;
					}>;
				};
			};
		}) => Promise<ProductRow>;
		update: (args: {
			where: { id: string };
			data: {
				name?: string;
				name_en?: string;
				description?: string;
				description_en?: string;
				price?: unknown;
				img_path?: string | null;
				brochure_path?: string | null;
				model_3d?: string | null;
				video_link?: string | null;
				product_types?: string | null;
				product_order?: number | null;
				status?: string;
				categoryId?: string;
				attributeValues?: { deleteMany: {}; create: Array<{ attributeId: string; groupId: string; string_value: string }> };
			};
		}) => Promise<ProductRow>;
		delete: (args: { where: { id: string } }) => Promise<ProductRow>;
	};
};

function getDelegate() {
	return db.product;
}

export async function getProducts(opts?: {
	search?: string;
	categoryId?: string;
	productTypes?: string;
}) {
	await isAuthorized();
	const delegate = getDelegate();
	try {
		let list = await delegate.findMany({
			orderBy: [{ product_order: "asc" }, { createdAt: "desc" }],
			include: { category: true },
			where: {
				...(opts?.categoryId?.trim() && { categoryId: opts.categoryId.trim() }),
				...(opts?.productTypes?.trim() && {
					product_types: opts.productTypes.trim(),
				}),
			},
		});
		if (opts?.search?.trim()) {
			const q = opts.search.trim().toLowerCase();
			list = list.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.name_en.toLowerCase().includes(q)
			);
		}
		return list;
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return [];
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return [];
		}
		throw error;
	}
}

export async function getProductById(id: string) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) return null;
	try {
		return await delegate.findUnique({
			where: { id },
			include: {
				category: true,
				attributeValues: {
					include: { attribute: true, group: true },
				},
			},
		});
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2021"
		) {
			return null;
		}
		if (error instanceof Error && error.message.includes("does not exist")) {
			return null;
		}
		throw error;
	}
}

function parsePrice(v: string | number | null | undefined): unknown {
	if (v === null || v === undefined || v === "") return null;
	if (typeof v === "number") return v;
	const n = parseFloat(String(v).trim());
	return isNaN(n) ? null : n;
}

export async function createProduct(data: ProductInput) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Product model. Run: npx prisma generate and restart the dev server.");
	const attributeValues = data.attributeValues?.filter(
		(av) => av.attributeId?.trim() && av.groupId?.trim() && av.value?.trim() !== undefined
	) ?? [];
	return await delegate.create({
		data: {
			name: data.name.trim(),
			name_en: data.name_en.trim(),
			description: data.description.trim(),
			description_en: data.description_en.trim(),
			price: parsePrice(data.price),
			img_path: data.img_path?.trim() || null,
			brochure_path: data.brochure_path?.trim() || null,
			model_3d: data.model_3d?.trim() || null,
			video_link: data.video_link?.trim() || null,
			product_types: data.product_types?.trim() || null,
			product_order: data.product_order ?? null,
			status: data.status?.trim() || "ACTIVE",
			categoryId: data.categoryId.trim(),
			attributeValues:
				attributeValues.length > 0
					? {
							create: attributeValues.map((av) => ({
								attributeId: av.attributeId.trim(),
								groupId: av.groupId.trim(),
								string_value: String(av.value ?? "").trim(),
							})),
						}
					: undefined,
		},
	});
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Product model. Run: npx prisma generate and restart the dev server.");
	const attributeValues = data.attributeValues?.filter(
		(av) => av.attributeId?.trim() && av.groupId?.trim() && av.value?.trim() !== undefined
	);
	const updateData: Parameters<typeof delegate.update>[0]["data"] = {
		...(data.name !== undefined && { name: data.name.trim() }),
		...(data.name_en !== undefined && { name_en: data.name_en.trim() }),
		...(data.description !== undefined && {
			description: data.description.trim(),
		}),
		...(data.description_en !== undefined && {
			description_en: data.description_en.trim(),
		}),
		...(data.price !== undefined && { price: parsePrice(data.price) }),
		...(data.img_path !== undefined && {
			img_path: data.img_path?.trim() || null,
		}),
		...(data.brochure_path !== undefined && {
			brochure_path: data.brochure_path?.trim() || null,
		}),
		...(data.model_3d !== undefined && {
			model_3d: data.model_3d?.trim() || null,
		}),
		...(data.video_link !== undefined && {
			video_link: data.video_link?.trim() || null,
		}),
		...(data.product_types !== undefined && {
			product_types: data.product_types?.trim() || null,
		}),
		...(data.product_order !== undefined && {
			product_order: data.product_order,
		}),
		...(data.status !== undefined && {
			status: data.status.trim() || "ACTIVE",
		}),
		...(data.categoryId !== undefined && {
			categoryId: data.categoryId.trim(),
		}),
	};
	if (attributeValues !== undefined) {
		updateData.attributeValues = {
			deleteMany: {},
			create: attributeValues.map((av) => ({
				attributeId: av.attributeId.trim(),
				groupId: av.groupId.trim(),
				string_value: String(av.value ?? "").trim(),
			})),
		};
	}
	return await delegate.update({
		where: { id },
		data: updateData,
	});
}

export async function deleteProduct(id: string) {
	await isAuthorized();
	const delegate = getDelegate();
	if (!delegate) throw new Error("Prisma client missing Product model. Run: npx prisma generate and restart the dev server.");
	return await delegate.delete({ where: { id } });
}
