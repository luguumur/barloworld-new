import TestimonialListContainer from "@/components/Admin/Testimonial";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { getTestimonials } from "@/actions/testimonial";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: `Testimonials - ${process.env.SITE_NAME ?? "Admin"}`,
	description: "Manage testimonials",
};

export const revalidate = 0;

export default async function TestimonialsPage({
	searchParams,
}: {
	searchParams: { search?: string };
}) {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	const testimonials = await getTestimonials(search);

	return (
		<>
			<Breadcrumb pageTitle="Testimonials" />
			<Suspense
				fallback={
					<div className="rounded-10 bg-white p-6 shadow-1 dark:bg-gray-dark">
						Loading…
					</div>
				}
			>
				<TestimonialListContainer
					testimonials={testimonials}
					initialSearch={search ?? ""}
				/>
			</Suspense>
		</>
	);
}
