"use client";
import TestimonialEmptyState from "./TestimonialEmptyState";
import TestimonialListTable from "./TestimonialListTable";
import TestimonialTopbar from "./TestimonialTopbar";

type Testimonial = {
	id: string;
	title: string;
	title_en: string;
	subtitle: string | null;
	subtitle_en: string | null;
	description: string;
	description_en: string;
	videoUrl: string | null;
	imageUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export default function TestimonialListContainer({
	testimonials,
	initialSearch = "",
}: {
	testimonials: Testimonial[];
	initialSearch?: string;
}) {
	return (
		<>
			<div className="mb-5">
				<TestimonialTopbar initialSearch={initialSearch} />
			</div>
			{testimonials?.length ? (
				<TestimonialListTable testimonials={testimonials} />
			) : (
				<TestimonialEmptyState />
			)}
		</>
	);
}
