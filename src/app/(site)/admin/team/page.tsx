import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";
import TeamListContainer from "@/components/Admin/Team";
import { getTeams } from "@/actions/team";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Team - ${process.env.SITE_NAME}`,
	description: "Manage team members",
};

export default async function TeamPage({
	searchParams,
}: {
	searchParams: Promise<{ search?: string }>;
}) {
	const { search } = await searchParams;
	const teams = await getTeams(search);

	return (
		<>
			<Breadcrumb pageTitle='Team' />
			<TeamListContainer teams={teams} initialSearch={search ?? ""} />
		</>
	);
}
