import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TestimonialForm from "@/components/Admin/Testimonial/TestimonialForm";
import { getTestimonialById } from "@/actions/testimonial";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
	title: `Edit Testimonial - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Edit testimonial",
};

export default async function EditTestimonialPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const testimonial = await getTestimonialById(id);
	if (!testimonial) notFound();

	const initial = {
		title: testimonial.title,
		title_en: testimonial.title_en,
		subtitle: testimonial.subtitle ?? "",
		subtitle_en: testimonial.subtitle_en ?? "",
		description: testimonial.description,
		description_en: testimonial.description_en,
		videoUrl: testimonial.videoUrl ?? "",
		imageUrl: testimonial.imageUrl ?? "",
	};

	return (
		<>
			<Breadcrumb pageTitle="Edit Testimonial" />
			<TestimonialForm mode="edit" editId={id} initial={initial} />
		</>
	);
}
