"use server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { handleTableMissing } from "@/libs/prismaError";

export type AttributeValueInput = {
	attributeId: string;
	groupId: string;
	value: string;
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
	price: number | null;
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
	images?: Array<{ id: string; path: string; createdAt: Date }>;
};

function parsePrice(v: string | number | null | undefined): number | null {
	if (v === null || v === undefined || v === "") return null;
	if (typeof v === "number") return v;
	const n = parseFloat(String(v).trim());
	return isNaN(n) ? null : n;
}

export async function getProducts(opts?: {
	search?: string;
	categoryId?: string;
	productTypes?: string;
}) {
	await isAuthorized();
	try {
		return (await prisma.product.findMany({
			orderBy: [{ product_order: "asc" }, { createdAt: "desc" }],
			include: { category: true },
			where: {
				...(opts?.categoryId?.trim() && { categoryId: opts.categoryId.trim() }),
				...(opts?.productTypes?.trim() && {
					product_types: opts.productTypes.trim(),
				}),
				...(opts?.search?.trim() && {
					OR: [
						{ name: { contains: opts.search.trim(), mode: "insensitive" } },
						{ name_en: { contains: opts.search.trim(), mode: "insensitive" } },
					],
				}),
			},
		})) as unknown as ProductRow[];
	} catch (error) {
		return handleTableMissing(error, [] as ProductRow[]);
	}
}

export async function getProductById(id: string) {
	await isAuthorized();
	try {
		return (await prisma.product.findUnique({
			where: { id },
			include: {
				category: true,
				attributeValues: { include: { attribute: true, group: true } },
				images: { orderBy: { createdAt: "asc" } },
			},
		})) as unknown as ProductRow | null;
	} catch (error) {
		return handleTableMissing(error, null);
	}
}

export async function createProduct(data: ProductInput) {
	await isAuthorized();
	const attributeValues =
		data.attributeValues?.filter(
			(av) =>
				av.attributeId?.trim() &&
				av.groupId?.trim() &&
				av.value?.trim() !== undefined
		) ?? [];
	return prisma.product.create({
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
	const attributeValues = data.attributeValues?.filter(
		(av) =>
			av.attributeId?.trim() &&
			av.groupId?.trim() &&
			av.value?.trim() !== undefined
	);
	return prisma.product.update({
		where: { id },
		data: {
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
			...(attributeValues !== undefined && {
				attributeValues: {
					deleteMany: {},
					create: attributeValues.map((av) => ({
						attributeId: av.attributeId.trim(),
						groupId: av.groupId.trim(),
						string_value: String(av.value ?? "").trim(),
					})),
				},
			}),
		},
	});
}

export async function deleteProduct(id: string) {
	await isAuthorized();
	return prisma.product.delete({ where: { id } });
}

export async function reorderProducts(orderedIds: string[]) {
	await isAuthorized();
	if (orderedIds.length === 0) return;

	const whenClauses = orderedIds.map((id, i) => Prisma.sql`WHEN ${id} THEN ${i}`);
	const inList = orderedIds.map((id) => Prisma.sql`${id}`);

	await prisma.$executeRaw`
		UPDATE products
		SET product_order = CASE id ${Prisma.join(whenClauses, " ")} ELSE product_order END
		WHERE id IN (${Prisma.join(inList)})
	`;
}
