import ContactSidebarForm from "./ContactSidebarForm";
import ProductBeside, { type SidebarMenuItem } from "./ProductBeside";
import QuickLinks, { type QuickLink } from "./QuickLinks";

const quickLinksPrimary: QuickLink[] = [
	{
		href: "/products",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-equipment.png",
		label: "Find equipment",
	},
	{
		href: "/locations",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-location.png",
		label: "Find location",
	},
	{
		href: "/find-a-rep",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-call.png",
		label: "Find a rep",
	},
];

const quickLinksSecondary: QuickLink[] = [
	{
		href: "/operator-training",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-safety.png",
		label: "Safety & training",
	},
	{
		href: "/service",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-service.png",
		label: "Service & maintenance",
	},
	{
		href: "/careers",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-career.png",
		label: "Careers",
	},
];

type Props = {
	productTypes?: SidebarMenuItem[];
	categories?: SidebarMenuItem[];
	products?: SidebarMenuItem[];
};

export default function PageSidebar({
	productTypes,
	categories,
	products,
}: Props) {
	return (
		<aside className='page-sidebar page-rental-sidebar col-md-3'>
			{productTypes && productTypes.length > 0 && (
				<ProductBeside title='Equipment Types' menu={productTypes} />
			)}
			{categories && categories.length > 0 && (
				<ProductBeside title='Categories' menu={categories} />
			)}
			{products && products.length > 0 && (
				<ProductBeside title='Products' menu={products} />
			)}
			<QuickLinks primary={quickLinksPrimary} secondary={quickLinksSecondary} />
			<ContactSidebarForm phone='+976 7018-7588' />
		</aside>
	);
}
