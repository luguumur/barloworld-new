import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import HomeCardForm from "@/components/Admin/HomeMain/HomeCardForm";
import { getHomeCardById } from "@/actions/homeMain";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Edit Home Card" };

export default async function EditHomeCardPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const card = await getHomeCardById(id);
	if (!card) notFound();

	return (
		<>
			<Breadcrumb pageTitle='Edit Home Card' />
			<HomeCardForm
				mode='edit'
				editId={id}
				initial={{
					title: card.title,
					title_en: card.title_en,
					image: card.image,
					url: card.url,
					order: card.order,
				}}
			/>
		</>
	);
}
