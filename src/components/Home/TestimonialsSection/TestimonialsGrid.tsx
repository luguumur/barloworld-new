"use client";
import type { TestimonialRow } from "@/actions/testimonial";

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

function resolveImg(url: string | null | undefined): string | null {
	const raw = url?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function QuoteIcon() {
	return (
		<svg
			width='36'
			height='28'
			viewBox='0 0 36 28'
			fill='none'
			style={{ marginBottom: "16px", opacity: 0.8 }}
		>
			<path
				d='M0 28V17.2C0 13.8667 0.6 10.8 1.8 8C3 5.2 4.8 2.93333 7.2 1.2L10.8 4C9.06667 5.46667 7.73333 7.06667 6.8 8.8C5.86667 10.5333 5.4 12.5333 5.4 14.8H10.8V28H0ZM21.6 28V17.2C21.6 13.8667 22.2 10.8 23.4 8C24.6 5.2 26.4 2.93333 28.8 1.2L32.4 4C30.6667 5.46667 29.3333 7.06667 28.4 8.8C27.4667 10.5333 27 12.5333 27 14.8H32.4V28H21.6Z'
				fill='#FFBE00'
			/>
		</svg>
	);
}

function TestimonialCard({
	item,
	lang,
}: {
	item: TestimonialRow;
	lang: "mn" | "en";
}) {
	const author = stripHtml(lang === "mn" ? item.title : item.title_en);
	const role = stripHtml(lang === "mn" ? item.subtitle : item.subtitle_en);
	const quote = stripHtml(
		lang === "mn" ? item.description : item.description_en
	);
	const img = resolveImg(item.imageUrl);
	const video = item.videoUrl?.trim() || null;

	return (
		<div
			style={{
				background: "#fff",
				border: "1px solid #ebebeb",
				padding: "32px",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
			}}
		>
			<QuoteIcon />

			{/* video thumbnail */}
			{video && (
				<div style={{ marginBottom: "20px" }}>
					<a
						href={video}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							display: "block",
							position: "relative",
							aspectRatio: "16/9",
							background: "#000",
							overflow: "hidden",
						}}
					>
						<img
							src={`https://img.youtube.com/vi/${extractYouTubeId(
								video
							)}/hqdefault.jpg`}
							alt={author}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: 0.8,
							}}
						/>
						<div
							style={{
								position: "absolute",
								inset: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div
								style={{
									width: "56px",
									height: "56px",
									borderRadius: "50%",
									background: "#FFBE00",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<svg width='20' height='20' viewBox='0 0 24 24' fill='#000'>
									<path d='M8 5v14l11-7z' />
								</svg>
							</div>
						</div>
					</a>
				</div>
			)}

			{/* quote */}
			<p
				style={{
					fontSize: "15px",
					lineHeight: 1.75,
					color: "#444",
					flex: 1,
					marginBottom: "24px",
					fontStyle: "italic",
				}}
			>
				&ldquo;{quote}&rdquo;
			</p>

			{/* author */}
			<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
				{/* {img && (
					<img
						src={img}
						alt={author}
						style={{
							width: "48px",
							height: "48px",
							borderRadius: "50%",
							objectFit: "cover",
							flexShrink: 0,
							border: "2px solid #FFBE00",
						}}
					/>
				)} */}
				<div>
					<p
						style={{
							fontWeight: 700,
							fontSize: "14px",
							color: "#1a1a1a",
							margin: 0,
						}}
					>
						{author}
					</p>
					{role && (
						<p style={{ fontSize: "13px", color: "#888", margin: 0 }}>{role}</p>
					)}
				</div>
			</div>
		</div>
	);
}

function extractYouTubeId(url: string): string {
	const match = url.match(
		/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
	);
	return match?.[1] ?? "";
}

export default function TestimonialsGrid({
	items,
	lang,
}: {
	items: TestimonialRow[];
	lang: "mn" | "en";
}) {
	if (!items.length) {
		return (
			<p style={{ padding: "60px 0", textAlign: "center", color: "#888" }}>
				{lang === "mn" ? "Сэтгэгдэл байхгүй байна." : "No testimonials yet."}
			</p>
		);
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
				gap: "28px",
				paddingTop: "8px",
				paddingBottom: "48px",
			}}
		>
			{items.map((item) => (
				<TestimonialCard key={item.id} item={item} lang={lang} />
			))}
		</div>
	);
}
