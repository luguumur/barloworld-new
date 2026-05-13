import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getDealByIdPublic, getDealsPublic } from "@/actions/deal";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function stripHtml(value: string | null | undefined): string {
	return (value ?? "")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<br\s*\/?>/gi, " ")
		.replace(/<\/p>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/\s+/g, " ")
		.trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const deal = await getDealByIdPublic(id);
	if (!deal) return { title: "Deal Not Found" };
	return {
		title: `${deal.title_en} - ${process.env.SITE_NAME}`,
		description: stripHtml(deal.subtitle_en ?? deal.description_en).slice(
			0,
			160
		),
	};
}

export default async function DealDetailPage({ params }: Props) {
	const { id } = await params;
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const [deal, related] = await Promise.all([
		getDealByIdPublic(id),
		getDealsPublic(4),
	]);

	if (!deal) notFound();

	const title = lang === "mn" ? deal.title : deal.title_en;
	const subtitle = lang === "mn" ? deal.subtitle : deal.subtitle_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);
	const otherDeals = related.filter((d) => d.id !== deal.id).slice(0, 3);

	return (
		<>
			<ProductPageHeader
				title={title}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: "Deals & Specials", href: "/deals-specials" },
					{ label: title },
				]}
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9'>
						{/* Hero image */}
						{img && (
							<div style={{ marginBottom: "32px" }}>
								<Image
									src={img}
									alt={title}
									width={0}
									height={0}
									sizes='100vw'
									style={{ width: "100%", height: "auto", display: "block" }}
									priority
									unoptimized
								/>
							</div>
						)}

						{/* Subtitle */}
						{subtitle && (
							<p
								style={{
									fontSize: "16px",
									color: "#666",
									letterSpacing: "0.05em",
									marginBottom: "20px",
									textTransform: "uppercase",
									fontWeight: 600,
								}}
							>
								{stripHtml(subtitle)}
							</p>
						)}

						{/* Description */}
						{description && (
							<div
								style={{
									fontSize: "15px",
									lineHeight: 1.8,
									color: "#333",
									marginBottom: "36px",
								}}
								dangerouslySetInnerHTML={{ __html: description }}
							/>
						)}
						<hr></hr>
						{/* CTA */}
						{/* <div
							style={{
								display: "flex",
								gap: "12px",
								flexWrap: "wrap",
								marginBottom: "48px",
								paddingTop: "8px",
								borderTop: "2px solid #FFBE00",
							}}
						>
							<a href='/contact-us/' className='btn btn-primary'>
								{lang === "mn" ? "Холбоо барих" : "Contact Us"}
							</a>
							<a href='/quote' className='btn btn-secondary'>
								{lang === "mn" ? "Үнийн санал авах" : "Request a Quote"}
							</a>
						</div> */}

						{/* Related deals */}
						{otherDeals.length > 0 && (
							<div style={{ marginTop: "48px" }}>
								<h3
									style={{
										fontWeight: 900,
										fontSize: "18px",
										textTransform: "uppercase",
										marginBottom: "20px",
										color: "#1a1a1a",
									}}
								>
									{lang === "mn" ? "Бусад санал" : "Other Deals"}
								</h3>
								<div
									style={{
										display: "grid",
										gridTemplateColumns:
											"repeat(auto-fill, minmax(200px, 1fr))",
										gap: "20px",
									}}
								>
									{otherDeals.map((d) => {
										const dTitle = lang === "mn" ? d.title : d.title_en;
										const dImg = resolveImg(d.img_path);
										return (
											<Link
												key={d.id}
												href={`/deals-specials/${d.id}`}
												style={{
													display: "block",
													border: "1px solid #e5e5e5",
													overflow: "hidden",
													textDecoration: "none",
													color: "inherit",
												}}
											>
												{dImg ? (
													<div
														style={{
															position: "relative",
															aspectRatio: "16/9",
															background: "#f3f3f3",
														}}
													>
														<Image
															src={dImg}
															alt={dTitle}
															fill
															style={{ objectFit: "cover" }}
															unoptimized
														/>
													</div>
												) : (
													<div
														style={{
															aspectRatio: "16/9",
															background: "#f3f3f3",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<span
															style={{
																color: "#ffcd11",
																fontWeight: 900,
																opacity: 0.4,
															}}
														>
															CAT
														</span>
													</div>
												)}
												<div style={{ padding: "12px" }}>
													<p
														style={{
															fontWeight: 700,
															fontSize: "13px",
															textTransform: "uppercase",
															lineHeight: 1.3,
															color: "#1a1a1a",
														}}
													>
														{stripHtml(dTitle)}
													</p>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
						)}
					</main>
				</div>
			</article>
		</>
	);
}
