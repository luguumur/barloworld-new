"use client";
import Image from "next/image";
import TestimonialAction from "./TestimonialAction";

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

function imageSrc(imageUrl: string | null): string | null {
	if (!imageUrl?.trim()) return null;
	if (imageUrl.startsWith("http")) return imageUrl;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${imageUrl}` : null;
}

export default function TestimonialListTable({
	testimonials,
}: {
	testimonials: Testimonial[];
}) {
	return (
		<div className="rounded-10 bg-white shadow-1 dark:bg-gray-dark">
			<table className="w-full">
				<thead>
					<tr className="hidden border-b border-stroke dark:border-stroke-dark lsm:table-row">
						<th className="w-16 px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 sm:pl-7.5">
							Image
						</th>
						<th className="min-w-[180px] px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5">
							Title
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 xl:table-cell">
							Subtitle
						</th>
						<th className="hidden px-4 py-5 text-left font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 md:table-cell">
							Created
						</th>
						<th className="hidden px-4 py-5 text-right font-satoshi text-base font-medium tracking-[-.2px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{testimonials.map((testimonial) => {
						const src = imageSrc(testimonial.imageUrl);
						return (
							<tr
								key={testimonial.id}
								className="border-b border-stroke last-of-type:border-b-0 dark:border-stroke-dark"
							>
								<td className="p-4 text-left sm:pl-7.5">
									{src ? (
										<div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-1 dark:bg-white/5">
											<Image
												src={src}
												alt=""
												fill
												className="object-cover"
												sizes="48px"
											/>
										</div>
									) : (
										<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5">
											<svg
												className="h-6 w-6"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={1.5}
													d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
												/>
											</svg>
										</div>
									)}
								</td>
								<td className="p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5">
									<span className="line-clamp-2">{testimonial.title}</span>
									<span className="block xl:hidden text-sm text-body/80">
										{testimonial.subtitle ? (
											<span className="line-clamp-1">{testimonial.subtitle}</span>
										) : (
											"—"
										)}
									</span>
									<span className="block md:hidden">
										Created: {new Date(testimonial.createdAt).toLocaleDateString()}
									</span>
									<span className="block lsm:hidden">
										<TestimonialAction testimonial={testimonial} />
									</span>
								</td>
								<td className="hidden max-w-[200px] truncate p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 xl:table-cell">
									{testimonial.subtitle || "—"}
								</td>
								<td className="hidden p-4 text-left text-base tracking-[-.16px] text-body dark:text-gray-5 md:table-cell">
									{new Date(testimonial.createdAt).toLocaleDateString()}
								</td>
								<td className="hidden p-4 text-right text-base tracking-[-.16px] text-body dark:text-gray-5 lsm:table-cell sm:pr-7.5">
									<TestimonialAction testimonial={testimonial} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
