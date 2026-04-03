import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import TestimonialForm from "@/components/Admin/Testimonial/TestimonialForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `New Testimonial - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Add a new testimonial",
};

export default function NewTestimonialPage() {
	return (
		<>
			<Breadcrumb pageTitle="New Testimonial" />
			<TestimonialForm mode="create" />
		</>
	);
}
