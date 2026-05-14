import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import HomeCardForm from "@/components/Admin/HomeMain/HomeCardForm";
import { Metadata } from "next";

export const metadata: Metadata = { title: "New Home Card" };

export default function NewHomeCardPage() {
	return (
		<>
			<Breadcrumb pageTitle='New Home Card' />
			<HomeCardForm mode='create' />
		</>
	);
}
