import React from "react";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllPageSlugs } from "@/actions/page";
import { Metadata } from "next";

type Props = {
	params: Promise<{ slug: string }> | { slug: string };
};

async function getParams(params: Props["params"]) {
	return typeof (params as Promise<{ slug: string }>).then === "function"
		? await (params as Promise<{ slug: string }>)
		: (params as { slug: string });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await getParams(params);
	const page = await getPageBySlug(slug);
	if (!page) return { title: "Not Found" };
	const title = page.title_en ?? page.title;
	const description = page.description_en ?? page.description ?? undefined;
	return {
		title: `${title} | ${process.env.SITE_NAME ?? "Site"}`,
		description: description ?? undefined,
	};
}

export async function generateStaticParams() {
	const slugs = await getAllPageSlugs();
	return slugs.map((slug) => ({ slug }));
}

export default async function CustomPageRoute({ params }: Props) {
	const { slug } = await getParams(params);
	const page = await getPageBySlug(slug);
	if (!page) notFound();

	const title = page.title_en ?? page.title;
	const content = page.content_en ?? page.content ?? "";

	return (
		<main>
			<section className="relative z-1 overflow-hidden pb-17.5 pt-35 xl:pb-27.5">
				<div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
					<div className="mx-auto w-full max-w-[770px]">
						<h1 className="mb-6 font-satoshi text-3xl font-bold -tracking-[1.6px] text-black dark:text-white lg:text-heading-4 xl:text-heading-3">
							{title}
						</h1>
						<div
							className="prose dark:prose-invert max-w-none text-black dark:text-gray-5 prose-headings:font-satoshi prose-headings:font-bold prose-p:mb-4 prose-ul:my-4 prose-li:my-1"
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}
