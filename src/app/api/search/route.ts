import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prismaDb";
import type { SiteSearchHit } from "@/types/search";

const maxQueryLength = 200;
const perModelLimit = 8;

function textFilter(q: string) {
	return { contains: q, mode: "insensitive" as const };
}

export async function GET(req: NextRequest) {
	const raw = req.nextUrl.searchParams.get("q")?.trim() ?? "";
	if (raw.length < 2) {
		return NextResponse.json({ hits: [] satisfies SiteSearchHit[] });
	}
	const q = raw.slice(0, maxQueryLength);

	try {
		const [pages, news, products, deals, magazines, mastheads, menuItems] =
			await Promise.all([
				prisma.page.findMany({
					where: {
						OR: [
							{ title: textFilter(q) },
							{ title_en: textFilter(q) },
							{ slug: textFilter(q) },
							{ content: textFilter(q) },
							{ content_en: textFilter(q) },
						],
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.news.findMany({
					where: {
						OR: [
							{ title: textFilter(q) },
							{ title_en: textFilter(q) },
							{ subtitle: textFilter(q) },
							{ subtitle_en: textFilter(q) },
							{ content: textFilter(q) },
							{ content_en: textFilter(q) },
						],
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.product.findMany({
					where: {
						OR: [
							{ name: textFilter(q) },
							{ name_en: textFilter(q) },
							{ description: textFilter(q) },
							{ description_en: textFilter(q) },
						],
						status: "ACTIVE",
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.deal.findMany({
					where: {
						OR: [
							{ title: textFilter(q) },
							{ title_en: textFilter(q) },
							{ description: textFilter(q) },
							{ description_en: textFilter(q) },
						],
						status: "ACTIVE",
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.magazine.findMany({
					where: {
						OR: [{ title: textFilter(q) }, { title_en: textFilter(q) }],
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.masthead.findMany({
					where: {
						OR: [
							{ title: textFilter(q) },
							{ title_en: textFilter(q) },
							{ description: textFilter(q) },
							{ description_en: textFilter(q) },
						],
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
				prisma.menuItem.findMany({
					where: {
						OR: [
							{ title: textFilter(q) },
							{ title_en: textFilter(q) },
							{ path: textFilter(q) },
						],
					},
					take: perModelLimit,
					orderBy: { updatedAt: "desc" },
				}),
			]);

		const hits: SiteSearchHit[] = [];

		for (const p of pages) {
			hits.push({
				objectID: `page-${p.id}`,
				title: p.title_en || p.title,
				url: `/${p.slug}`,
				type: "Page",
				imageURL: "",
			});
		}
		for (const n of news) {
			hits.push({
				objectID: `news-${n.id}`,
				title: n.title_en || n.title,
				url: `/news/${n.id}`,
				type: "News",
				imageURL: n.thumbnail ?? "",
			});
		}
		for (const p of products) {
			hits.push({
				objectID: `product-${p.id}`,
				title: p.name_en || p.name,
				url: `/product/${p.id}`,
				type: "Product",
				imageURL: p.img_path ?? "",
			});
		}
		for (const d of deals) {
			hits.push({
				objectID: `deal-${d.id}`,
				title: d.title_en || d.title,
				url: `/deal/${d.id}`,
				type: "Deal",
				imageURL: d.img_path ?? "",
			});
		}
		for (const m of magazines) {
			hits.push({
				objectID: `magazine-${m.id}`,
				title: m.title_en || m.title,
				url: m.url?.trim() || `/magazine/${m.id}`,
				type: "Magazine",
				imageURL: m.image ?? "",
			});
		}
		for (const m of mastheads) {
			hits.push({
				objectID: `masthead-${m.id}`,
				title: m.title_en || m.title,
				url: m.url?.trim() || `/masthead/${m.id}`,
				type: "Masthead",
				imageURL: m.imageurl ?? "",
			});
		}
		for (const mi of menuItems) {
			const path = mi.path.trim();
			const url =
				path.startsWith("http://") || path.startsWith("https://")
					? path
					: path.startsWith("/")
						? path
						: `/${path}`;
			hits.push({
				objectID: `menu-${mi.id}`,
				title: mi.title_en || mi.title,
				url,
				type: "Menu",
				imageURL: "",
			});
		}

		const seen = new Set<string>();
		const deduped = hits.filter((h) => {
			const key = `${h.url}|${h.title}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});

		return NextResponse.json({ hits: deduped.slice(0, 24) });
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error("GET /api/search", e);
		return NextResponse.json(
			{ error: "Search failed", hits: [] },
			{ status: 500 }
		);
	}
}
