"use client";
import TestimonialEmptyState from "./TestimonialEmptyState";
import TestimonialListTable from "./TestimonialListTable";
import TestimonialTopbar from "./TestimonialTopbar";
import AdminPagination from "@/components/Admin/Common/AdminPagination";

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
	page = 1,
	totalPages = 1,
	total = 0,
}: {
	testimonials: Testimonial[];
	initialSearch?: string;
	page?: number;
	totalPages?: number;
	total?: number;
}) {
	return (
		<>
			<div className='mb-5'>
				<TestimonialTopbar initialSearch={initialSearch} />
			</div>
			{testimonials?.length ? (
				<>
					<TestimonialListTable testimonials={testimonials} />
					<AdminPagination
						page={page}
						totalPages={totalPages}
						total={total}
						label='testimonials'
					/>
				</>
			) : (
				<TestimonialEmptyState />
			)}
		</>
	);
}
