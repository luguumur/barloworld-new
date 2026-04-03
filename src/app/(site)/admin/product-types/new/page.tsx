import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import ProductTypeForm from "@/components/Admin/ProductType/ProductTypeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Product Type - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a product type",
};

export default function NewProductTypePage() {
	return (
		<>
			<Breadcrumb pageTitle="New Product Type" />
			<ProductTypeForm mode="create" />
		</>
	);
}
