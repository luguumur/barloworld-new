import { Metadata } from "next";
import RentPage from "@/components/Rent";

export const metadata: Metadata = {
	title: `Rent — ${process.env.SITE_NAME}`,
	description:
		"Rent CAT® equipment from Barloworld Mongolia. Excavators, loaders, bulldozers, trucks and more — fully maintained, delivered to your site.",
};

export default async function RentRoute() {
	return <RentPage />;
}
