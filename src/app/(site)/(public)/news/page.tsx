import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getNewsPublic } from "@/actions/news";
import { getNewsCategoriesPublic } from "@/actions/newsCategory";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `News - ${process.env.SITE_NAME}`,
	description: "Latest news and updates from Barloworld Mongolia.",
};

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

export default async function NewsPage({
	searchParams,
}: {
	searchParams: Promise<{ category?: string }>;
}) {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const isMn = lang === "mn";

	const { category } = await searchParams;

	const [newsList, categories] = await Promise.all([
		getNewsPublic(0, category),
		getNewsCategoriesPublic(),
	]);

	return (
		<>
			<ProductPageHeader
				title={isMn ? "Мэдээ" : "News"}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: isMn ? "Мэдээ" : "News" },
				]}
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9 font-noto'>
						{/* Category filter */}
						{categories.length > 0 && (
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: "8px",
									marginBottom: "28px",
								}}
							>
								<Link
									href='/news'
									style={{
										padding: "5px 14px",
										fontSize: "13px",
										fontWeight: 600,
										border: "1px solid",
										borderColor: !category ? "#FC0" : "#ddd",
										background: !category ? "#FC0" : "#fff",
										color: !category ? "#000" : "#555",
										textDecoration: "none",
									}}
								>
									{isMn ? "Бүгд" : "All"}
								</Link>
								{categories.map((cat) => (
									<Link
										key={cat.id}
										href={`/news?category=${cat.id}`}
										style={{
											padding: "5px 14px",
											fontSize: "13px",
											fontWeight: 600,
											border: "1px solid",
											borderColor: category === cat.id ? "#FC0" : "#ddd",
											background: category === cat.id ? "#FC0" : "#fff",
											color: category === cat.id ? "#000" : "#555",
											textDecoration: "none",
										}}
									>
										{isMn ? cat.name : cat.name_en}
									</Link>
								))}
							</div>
						)}

						{/* Grid */}
						{newsList.length === 0 ? (
							<p style={{ color: "#888", padding: "40px 0" }}>
								{isMn ? "Мэдээ олдсонгүй." : "No news found."}
							</p>
						) : (
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
									gap: "28px",
									marginBottom: "40px",
								}}
							>
								{newsList.map((item) => {
									const title = isMn ? item.title : item.title_en;
									const subtitle = isMn ? item.subtitle : item.subtitle_en;
									const src = resolveImg(item.thumbnail);
									const catName = item.category
										? isMn
											? item.category.name
											: item.category.name_en
										: null;

									return (
										<article
											key={item.id}
											style={{
												background: "#fff",
												border: "1px solid #ebebeb",
												overflow: "hidden",
												display: "flex",
												flexDirection: "column",
											}}
										>
											<Link
												href={`/news/${item.id}`}
												style={{ display: "block", overflow: "hidden" }}
											>
												{src ? (
													<div
														style={{
															position: "relative",
															width: "100%",
															aspectRatio: "16/9",
															background: "#f3f3f3",
														}}
													>
														<Image
															src={src}
															alt={title}
															fill
															style={{ objectFit: "cover" }}
															unoptimized
														/>
													</div>
												) : (
													<div
														style={{
															width: "100%",
															aspectRatio: "16/9",
															background: "#222",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
														}}
													>
														<span
															style={{
																color: "#FC0",
																fontWeight: 900,
																opacity: 0.4,
															}}
														>
															CAT
														</span>
													</div>
												)}
											</Link>

											<div
												style={{
													padding: "20px",
													display: "flex",
													flexDirection: "column",
													flex: 1,
												}}
											>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														gap: "8px",
														marginBottom: "10px",
													}}
												>
													{catName && (
														<span
															style={{
																fontSize: "11px",
																fontWeight: 700,
																background: "#FC0",
																color: "#000",
																padding: "2px 8px",
																textTransform: "uppercase",
															}}
														>
															{catName}
														</span>
													)}
													<span style={{ fontSize: "12px", color: "#aaa" }}>
														{new Date(item.createdAt).toLocaleDateString(
															"en-US",
															{
																year: "numeric",
																month: "short",
																day: "numeric",
															}
														)}
													</span>
												</div>

												<h3
													style={{
														fontWeight: 700,
														fontSize: "15px",
														lineHeight: 1.4,
														marginBottom: "8px",
														color: "#1a1a1a",
														flex: 1,
													}}
												>
													<Link
														href={`/news/${item.id}`}
														style={{ textDecoration: "none", color: "inherit" }}
													>
														{title}
													</Link>
												</h3>

												{subtitle && (
													<p
														style={{
															fontSize: "13px",
															color: "#666",
															lineHeight: 1.6,
															marginBottom: "12px",
														}}
													>
														{stripHtml(subtitle).slice(0, 100)}
													</p>
												)}

												<Link
													href={`/news/${item.id}`}
													style={{
														fontSize: "13px",
														fontWeight: 700,
														color: "#FC0",
														textDecoration: "none",
														marginTop: "auto",
													}}
												>
													{isMn ? "Дэлгэрэнгүй →" : "Read more →"}
												</Link>
											</div>
										</article>
									);
								})}
							</div>
						)}
					</main>
				</div>
			</article>
		</>
	);
}
