import type { MastheadRow } from "@/actions/masthead";
import { resolveMastheadImageUrl } from "@/libs/resolveMastheadImageUrl";
import { mastheadSlides, type MastheadSlide } from "./slides";

function formatFallbackDate(d: Date, lang: "mn" | "en") {
	try {
		return new Intl.DateTimeFormat(lang === "mn" ? "mn-MN" : "en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(d);
	} catch {
		return d.toISOString().slice(0, 10);
	}
}

export function mastheadRowsToSlides(
	rows: MastheadRow[],
	lang: "mn" | "en"
): MastheadSlide[] {
	return rows.map((m, i) => {
		const subtitle =
			(lang === "mn" ? m.subtitle : m.subtitle_en ?? m.subtitle)?.trim() ?? "";
		const dateLabel =
			subtitle || formatFallbackDate(new Date(m.updatedAt), lang);
		const gradient =
			mastheadSlides[i % mastheadSlides.length]?.mediaClassName ??
			mastheadSlides[0].mediaClassName;

		return {
			id: m.id,
			dateLabel,
			title: lang === "mn" ? m.title : m.title_en,
			description: lang === "mn" ? m.description : m.description_en,
			href: (m.url && m.url.trim()) || "/",
			ctaLabel: lang === "mn" ? "Дэлгэрэнгүй" : "Learn more",
			mediaClassName: gradient,
			imageUrl: resolveMastheadImageUrl(m.imageurl),
		};
	});
}
