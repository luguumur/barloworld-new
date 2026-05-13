import ContactSidebarForm from "./ContactSidebarForm";
import QuickLinks, { type QuickLink } from "./QuickLinks";

type Props = {
	primary: QuickLink[];
	secondary?: QuickLink[];
	phone?: string;
};

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

export default function PageSidebar() {
	return (
		<aside className='page-sidebar page-rental-sidebar col-md-3'>
			<QuickLinks primary={quickLinksPrimary} secondary={quickLinksSecondary} />
			<ContactSidebarForm phone='+976 7018-7588' />
		</aside>
	);
}
