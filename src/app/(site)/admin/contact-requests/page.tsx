import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import ContactRequestListContainer from "@/components/Admin/ContactRequest";
import { getContactRequests } from "@/actions/contactRequest";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Contact Requests - ${process.env.SITE_NAME}`,
	description: "Manage contact requests",
};

export default async function ContactRequestsPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const { search } = await searchParams;
	const contacts = await getContactRequests(search);

	return (
		<>
			<Breadcrumb pageTitle='Contact Requests' />
			<ContactRequestListContainer
				contacts={contacts}
				initialSearch={search ?? ""}
			/>
		</>
	);
}
