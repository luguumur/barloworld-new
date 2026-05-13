import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TeamForm from "@/components/Admin/Team/TeamForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Team Member - ${process.env.SITE_NAME}`,
};

export default function NewTeamPage() {
	return (
		<>
			<Breadcrumb pageTitle='New Team Member' />
			<TeamForm mode='create' />
		</>
	);
}
