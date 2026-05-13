import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import NotificationListContainer from "@/components/Admin/Notification";
import { getNotifications } from "@/actions/notification";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Notifications - ${process.env.SITE_NAME}`,
	description: `Notifications`,
};

export default async function NotificationPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const { search } = await searchParams;
	const notifications = await getNotifications(search);

	return (
		<>
			<Breadcrumb pageTitle='Notifications' />
			<NotificationListContainer
				notifications={notifications}
				initialSearch={search ?? ""}
			/>
		</>
	);
}
