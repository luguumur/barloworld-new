import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TeamForm from "@/components/Admin/Team/TeamForm";
import { getTeamById } from "@/actions/team";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Team Member - ${process.env.SITE_NAME}`,
};

export default async function EditTeamPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const team = await getTeamById(id);
	if (!team) notFound();

	return (
		<>
			<Breadcrumb pageTitle='Edit Team Member' />
			<TeamForm
				mode='edit'
				editId={id}
				initial={{
					name: team.name,
					name_en: team.name_en,
					pos: team.pos,
					pos_en: team.pos_en,
					image: team.image ?? "",
					order: team.order,
				}}
			/>
		</>
	);
}
