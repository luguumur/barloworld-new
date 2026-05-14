import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getNewsByIdPublic, getNewsPublic } from "@/actions/news";

export const revalidate = 0;

type Props = { params: Promise<{ id: string }> };

function resolveImg(thumbnail: string | null): string | null {
	if (!thumbnail?.trim()) return null;
	if (thumbnail.startsWith("http") || thumbnail.startsWith("/"))
		return thumbnail;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${thumbnail}` : null;
}

function stripHtml(value: string | null | undefined): string {
	return (value ?? "")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/&amp;/gi, "&")
		.replace(/\s+/g, " ")
		.trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const news = await getNewsByIdPublic(id);
	if (!news) return { title: "Not Found" };
	return {
		title: `${news.title_en} - ${process.env.SITE_NAME}`,
		description: stripHtml(news.subtitle_en ?? news.content_en).slice(0, 160),
	};
}

export default async function NewsDetailPage({ params }: Props) {
	const { id } = await params;
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const isMn = lang === "mn";

	const [news, related] = await Promise.all([
		getNewsByIdPublic(id),
		getNewsPublic(4),
	]);

	if (!news) notFound();

	const title = isMn ? news.title : news.title_en;
	const subtitle = isMn ? news.subtitle : news.subtitle_en;
	const content = isMn ? news.content : news.content_en;
	const src = resolveImg(news.thumbnail);
	const catName = news.category
		? isMn
			? news.category.name
			: news.category.name_en
		: null;
	const otherNews = related.filter((n) => n.id !== news.id).slice(0, 3);

	return (
		<>
			<ProductPageHeader
				title={title}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: isMn ? "Мэдээ" : "News", href: "/news" },
					{ label: title },
				]}
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9 font-noto'>
						{/* Back button */}
						<div style={{ marginBottom: "20px" }}>
							<Link
								href='/news'
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "6px",
									fontSize: "13px",
									fontWeight: 600,
									color: "#555",
									textDecoration: "none",
								}}
							>
								<svg
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path d='M19 12H5M12 5l-7 7 7 7' />
								</svg>
								{isMn ? "Мэдээний жагсаалт" : "Back to News"}
							</Link>
						</div>

						{/* Meta */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "10px",
								marginBottom: "20px",
								flexWrap: "wrap",
							}}
						>
							{catName && (
								<Link
									href={`/news?category=${news.categoryId}`}
									style={{
										fontSize: "11px",
										fontWeight: 700,
										background: "#FFBE00",
										color: "#000",
										padding: "3px 10px",
										textDecoration: "none",
										textTransform: "uppercase",
									}}
								>
									{catName}
								</Link>
							)}
							<span style={{ fontSize: "13px", color: "#aaa" }}>
								{new Date(news.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						</div>

						{/* Thumbnail */}
						{src && (
							<div style={{ marginBottom: "28px" }}>
								<Image
									src={src}
									alt={title}
									width={0}
									height={0}
									sizes='100vw'
									style={{ width: "100%", height: "auto", display: "block" }}
									unoptimized
									priority
								/>
							</div>
						)}

						{/* Subtitle */}
						{subtitle && (
							<p
								style={{
									fontSize: "17px",
									fontWeight: 600,
									color: "#555",
									lineHeight: 1.7,
									marginBottom: "20px",
								}}
							>
								{stripHtml(subtitle)}
							</p>
						)}

						{/* Content */}
						<div
							className='prose max-w-none'
							style={{
								fontSize: "15px",
								lineHeight: 1.8,
								color: "#333",
								marginBottom: "40px",
							}}
							dangerouslySetInnerHTML={{ __html: content }}
						/>

						{/* Related */}
						{otherNews.length > 0 && (
							<div
								style={{
									borderTop: "2px solid #FFBE00",
									paddingTop: "28px",
									marginTop: "40px",
								}}
							>
								<h3
									style={{
										fontWeight: 700,
										fontSize: "16px",
										marginBottom: "20px",
										textTransform: "uppercase",
										color: "#1a1a1a",
									}}
								>
									{isMn ? "Бусад мэдээ" : "More News"}
								</h3>
								<div
									style={{
										display: "grid",
										gridTemplateColumns:
											"repeat(auto-fill, minmax(180px, 1fr))",
										gap: "16px",
									}}
								>
									{otherNews.map((n) => {
										const nTitle = isMn ? n.title : n.title_en;
										const nSrc = resolveImg(n.thumbnail);
										return (
											<Link
												key={n.id}
												href={`/news/${n.id}`}
												style={{ textDecoration: "none", color: "inherit" }}
											>
												{nSrc ? (
													<div
														style={{
															position: "relative",
															aspectRatio: "16/9",
															background: "#f3f3f3",
															marginBottom: "8px",
															overflow: "hidden",
														}}
													>
														<Image
															src={nSrc}
															alt={nTitle}
															fill
															style={{ objectFit: "cover" }}
															unoptimized
														/>
													</div>
												) : (
													<div
														style={{
															aspectRatio: "16/9",
															background: "#222",
															marginBottom: "8px",
														}}
													/>
												)}
												<p
													style={{
														fontWeight: 700,
														fontSize: "13px",
														color: "#1a1a1a",
														lineHeight: 1.4,
													}}
												>
													{nTitle}
												</p>
												<p
													style={{
														fontSize: "11px",
														color: "#aaa",
														marginTop: "4px",
													}}
												>
													{new Date(n.createdAt).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
													})}
												</p>
											</Link>
										);
									})}
								</div>
							</div>
						)}
						{/* CTA footer */}
						<section
							style={{
								background: "#222",
								padding: "36px",
								textAlign: "center",
								marginTop: "64px",
								marginBottom: "40px",
							}}
						>
							<h3
								style={{
									color: "#fff",
									fontSize: "20px",
									fontWeight: 700,
									marginBottom: "10px",
								}}
							>
								{isMn
									? "Тоног төхөөрөмжийн талаар лавлах уу?"
									: "Interested in Our Equipment?"}
							</h3>
							<p
								style={{
									color: "#bbb",
									fontSize: "14px",
									marginBottom: "24px",
								}}
							>
								{isMn
									? "Манай мэргэжилтнүүд таны асуултад хариулахад бэлэн байна."
									: "Our specialists are ready to answer your questions."}
							</p>
							<div
								style={{
									display: "flex",
									gap: "12px",
									justifyContent: "center",
									flexWrap: "wrap",
								}}
							>
								<a
									href='/support'
									className='btn btn-primary'
									style={{ minWidth: "150px" }}
								>
									{isMn ? "Холбоо барих" : "Contact Us"}
								</a>
							</div>
						</section>
					</main>
				</div>
			</article>
		</>
	);
}
