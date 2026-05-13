"use client";
import type { DealRow } from "@/actions/deal";
import Image from "next/image";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function truncate(value: string, max: number): string {
	if (value.length <= max) return value;
	const cut = value.lastIndexOf(" ", max);
	return value.slice(0, cut > 0 ? cut : max) + "…";
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

function DealCard({ deal, lang }: { deal: DealRow; lang: "mn" | "en" }) {
	const title = lang === "mn" ? deal.title : deal.title_en;
	const subtitle = lang === "mn" ? deal.subtitle : deal.subtitle_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);
	const cta = lang === "mn" ? "ДЭЛГЭРЭНГҮЙ" : "VIEW DEAL";

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				background: "#fff",
				border: "1px solid #e5e5e5",
				overflow: "hidden",
				height: "100%",
			}}
		>
			{/* image */}
			<div
				style={{
					position: "relative",
					width: "100%",
					aspectRatio: "16/9",
					background: "#f3f3f3",
					flexShrink: 0,
				}}
			>
				{img ? (
					<Image
						src={img}
						alt={stripHtml(title)}
						fill
						style={{ objectFit: "cover", objectPosition: "center" }}
						unoptimized
					/>
				) : (
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<span
							style={{
								fontSize: "40px",
								fontWeight: 900,
								color: "#ffcd11",
								opacity: 0.4,
								textTransform: "uppercase",
							}}
						>
							CAT
						</span>
					</div>
				)}
			</div>

			{/* content */}
			<div
				style={{
					padding: "24px",
					display: "flex",
					flexDirection: "column",
					flex: 1,
				}}
			>
				<h3
					style={{
						fontWeight: 900,
						fontSize: "20px",
						lineHeight: 1.15,
						textTransform: "uppercase",
						color: "#1a1a1a",
						marginBottom: "12px",
					}}
				>
					{stripHtml(title)}
				</h3>

				{subtitle && (
					<p
						style={{
							fontSize: "14px",
							color: "#666",
							marginBottom: "10px",
							letterSpacing: "0.04em",
						}}
					>
						{truncate(stripHtml(subtitle), 30)}
					</p>
				)}

				{description && (
					<p
						style={{
							fontSize: "14px",
							lineHeight: 1.7,
							color: "#444",
							marginBottom: "20px",
							flex: 1,
						}}
					>
						{truncate(stripHtml(description), 160)}
					</p>
				)}

				<div style={{ marginTop: "auto" }}>
					<a href={`/deals-specials/${deal.id}`} className='btn btn-primary'>
						{cta}
					</a>
				</div>
			</div>
		</div>
	);
}

export default function DealsGrid({
	deals,
	lang,
}: {
	deals: DealRow[];
	lang: "mn" | "en";
}) {
	if (!deals.length) {
		return (
			<p style={{ padding: "60px 0", textAlign: "center", color: "#888" }}>
				No active deals at this time. Check back soon.
			</p>
		);
	}

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				gap: "28px",
				paddingTop: "8px",
				paddingBottom: "40px",
			}}
		>
			{deals.map((deal) => (
				<DealCard key={deal.id} deal={deal} lang={lang} />
			))}
		</div>
	);
}
