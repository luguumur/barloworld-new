"use client";
import type { TestimonialRow } from "@/actions/testimonial";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/legacy/image";
import Link from "next/link";
import Slider from "react-slick";
import type { Settings } from "react-slick";

type Props = {
	testi?: TestimonialRow[];
};

function stripHtml(value: string | null | undefined): string {
	return (value ?? "")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<\/p>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/&quot;/gi, '"')
		.replace(/&#39;/gi, "'")
		.replace(/\s+/g, " ")
		.trim();
}

function truncateText(value: string, maxLength: number): string {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength).trimEnd()}...`;
}

const TestiCarousel = ({ testi = [] }: Props) => {
	const home = useTranslations("HomeData");
	const locale = useLocale();

	const desktopSlides = testi.length >= 3 ? 2.35 : testi.length === 2 ? 2 : 1;
	const tabletSlides = testi.length >= 2 ? 2 : 1;

	const settings = {
		dots: false,
		arrows: testi.length > 1,
		infinite: false,
		speed: 500,
		slidesToShow: desktopSlides,
		slidesToScroll: 1,
		centerMode: false,
		swipeToSlide: true,
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: testi.length >= 3 ? 2.1 : tabletSlides,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: tabletSlides,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1.15,
					slidesToScroll: 1,
					arrows: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
				},
			},
		],
	} satisfies Settings;

	const ctaLabel =
		locale === "mn" ? "БҮХ СЭТГЭГДЛИЙГ ҮЗЭХ" : "READ ALL TESTIMONIALS";

	return (
		<div className='home-testimonials clearfix'>
			<div className='home-testimonials-wrapper clearfix'>
				<div className='home-testimonials-banner'>
					<Image
						priority
						src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/test.jpg'
						className='img-responsive h-full w-full object-cover'
						alt='Barloworld Mongolia'
						sizes='100vw'
						layout='fill'
						quality={100}
					/>
				</div>
				<div className='home-testimonials-right-panel'>
					<div className='home-testimonials-header'>
						<h2>
							{locale === "en" ? (
								<>
									Hear From
									<span>Our Customers</span>
								</>
							) : (
								home("testimonials")
							)}
						</h2>
					</div>
					<div className='home-testimonials-slider-wrapper'>
						<div className='home-testimonials-slider home-testimonials-slider-homepage slick-initialized slick-slider'>
							<Slider {...settings} className='p-0'>
								{testi.map((item) => {
									const title = stripHtml(
										locale === "mn" ? item.title : item.title_en
									);
									const subtitle = stripHtml(
										locale === "mn" ? item.subtitle : item.subtitle_en
									);
									const description = stripHtml(
										locale === "mn" ? item.description : item.description_en
									);
									const quote = truncateText(description || subtitle, 280);

									return (
										<div key={item.id} className='home-testimonials-slide'>
											<div className='home-testimonials-slider-item-column z-10'>
												<p className='testimonial-quote'>{quote}</p>
												<div className='testimonial-attribution'>
													<p className='testimonial-author'>
														<span className='testimonial-author-dash'>-</span>
														<span>{title}</span>
													</p>
												</div>
											</div>
										</div>
									);
								})}
							</Slider>
						</div>
						<Link href='/testimonials' className='btn btn-primary'>
							{ctaLabel}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestiCarousel;
