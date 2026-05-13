import React from "react";
import { notFound } from "next/navigation";
import { getPageBySlug } from "@/actions/page";
import { Metadata } from "next";
import ProductPageHeader from "@/components/Products/ProductPageHeader";

type Props = {
	params: Promise<{ slug: string[] }> | { slug: string[] };
};

async function getParams(params: Props["params"]) {
	return typeof (params as Promise<{ slug: string[] }>).then === "function"
		? await (params as Promise<{ slug: string[] }>)
		: (params as { slug: string[] });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await getParams(params);
	const fullSlug = slug.join("/");
	const page = await getPageBySlug(fullSlug);
	if (!page) return { title: "Not Found" };
	const title = page.title_en ?? page.title;
	return {
		title: `${title} | ${process.env.SITE_NAME ?? "Site"}`,
		description: page.description_en ?? page.description ?? undefined,
	};
}

export const dynamic = "force-dynamic";

export default async function CustomPageRoute({ params }: Props) {
	const { slug } = await getParams(params);
	const fullSlug = slug.join("/");
	const page = await getPageBySlug(fullSlug);
	if (!page) notFound();

	const title = page.title_en ?? page.title;
	const content = page.content_en ?? page.content ?? "";

	// Build breadcrumbs from URL segments
	const breadcrumbs = [
		{ label: "Home", href: "/" },
		...slug.map((segment, i) => {
			const label = segment
				.replace(/-/g, " ")
				.replace(/\b\w/g, (c) => c.toUpperCase());
			const href = "/" + slug.slice(0, i + 1).join("/");
			return i === slug.length - 1 ? { label } : { label, href };
		}),
	];

	return (
		<>
			<ProductPageHeader title={title} breadcrumbs={breadcrumbs} />
			<main>
				<section className='relative z-1 overflow-hidden pb-17.5 pt-10 xl:pb-27.5'>
					<div className='container mx-auto w-full px-4 sm:px-8 xl:px-0'>
						<div className='mx-auto w-full max-w-[770px]'>
							<div
								className='prose dark:prose-invert prose-headings:font-satoshi prose-headings:font-bold prose-p:mb-4 prose-ul:my-4 prose-li:my-1 max-w-none text-black dark:text-gray-5'
								dangerouslySetInnerHTML={{ __html: content }}
							/>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
