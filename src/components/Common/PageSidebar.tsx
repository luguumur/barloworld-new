import { getDbT } from "@/libs/getDbT";
import ContactSidebarForm from "./ContactSidebarForm";
import ProductBeside, { type SidebarMenuItem } from "./ProductBeside";
import QuickLinks, { type QuickLink } from "./QuickLinks";

type Props = {
	productTypes?: SidebarMenuItem[];
	categories?: SidebarMenuItem[];
	products?: SidebarMenuItem[];
};

export default async function PageSidebar({
	productTypes,
	categories,
	products,
}: Props) {
	const t = await getDbT();

	const quickLinksPrimary: QuickLink[] = [
		{
			href: "/products",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-equipment.png",
			label: t("PageSidebar.find_equipment", "Find equipment"),
		},
		{
			href: "/locations",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-location.png",
			label: t("PageSidebar.find_location", "Find location"),
		},
		{
			href: "/find-a-rep",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-call.png",
			label: t("PageSidebar.find_rep", "Find a rep"),
		},
	];

	const quickLinksSecondary: QuickLink[] = [
		{
			href: "/operator-training",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-safety.png",
			label: t("PageSidebar.safety_training", "Safety & training"),
		},
		{
			href: "/service",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-service.png",
			label: t("PageSidebar.service_maintenance", "Service & maintenance"),
		},
		{
			href: "/careers",
			icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-career.png",
			label: t("PageSidebar.careers", "Careers"),
		},
	];

	return (
		<aside className='page-sidebar page-rental-sidebar col-md-3'>
			{productTypes && productTypes.length > 0 && (
				<ProductBeside
					title={t("PageSidebar.equipment_types", "Equipment Types")}
					menu={productTypes}
				/>
			)}
			{categories && categories.length > 0 && (
				<ProductBeside
					title={t("PageSidebar.categories", "Categories")}
					menu={categories}
				/>
			)}
			{products && products.length > 0 && (
				<ProductBeside
					title={t("PageSidebar.products", "Products")}
					menu={products}
				/>
			)}
			<QuickLinks
				primary={quickLinksPrimary}
				secondary={quickLinksSecondary}
				title={t("PageSidebar.quick_links", "Quick Links")}
			/>
			<ContactSidebarForm
				phone='+976 7018-7588'
				labels={{
					title: t("ContactSidebarForm.title", "Contact us Today"),
					titleAccent: t("ContactSidebarForm.title_accent", "to Get a Quote"),
					name: t("ContactSidebarForm.name_label", "Your Name"),
					email: t("ContactSidebarForm.email_label", "Email"),
					phone: t("ContactSidebarForm.phone_label", "Phone"),
					message: t("ContactSidebarForm.message_label", "Message"),
					submit: t("ContactSidebarForm.submit_btn", "Submit"),
					submitting: t("ContactSidebarForm.submitting", "Sending..."),
					success: t(
						"ContactSidebarForm.success",
						"Your request has been sent!"
					),
					error: t(
						"ContactSidebarForm.error",
						"Failed to send. Please try again."
					),
					requiredError: t(
						"ContactSidebarForm.required_error",
						"Name and phone are required"
					),
				}}
			/>
		</aside>
	);
}
