"use client";
import ProductEmptyState from "./ProductEmptyState";
import ProductListTable from "./ProductListTable";
import ProductTopbar from "./ProductTopbar";
import Pagination from "./Pagination";

type Product = {
	id: string;
	name: string;
	name_en: string;
	img_path: string | null;
	product_order: number | null;
	product_types: string | null;
	status: string;
	createdAt: Date;
	category?: { name: string; name_en: string } | null;
};

type CategoryOption = {
	id: string;
	name: string;
	name_en: string;
	types: string;
};
type TypeOption = { id: string; name: string; name_en: string };

export default function ProductListContainer({
	products,
	categories,
	productTypes,
	initialSearch = "",
	initialCategoryId = "",
	initialProductTypes = "",
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	products: Product[];
	categories: CategoryOption[];
	productTypes: TypeOption[];
	initialSearch?: string;
	initialCategoryId?: string;
	initialProductTypes?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<ProductTopbar
					initialSearch={initialSearch}
					initialCategoryId={initialCategoryId}
					initialProductTypes={initialProductTypes}
					categories={categories}
					productTypes={productTypes}
				/>
			</div>
			{products?.length ? (
				<>
					<ProductListTable products={products} />
					<Pagination page={page} totalPages={totalPages} total={total} />
				</>
			) : (
				<ProductEmptyState />
			)}
		</>
	);
}
