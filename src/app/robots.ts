import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/admin/", "/user/", "/api/"],
		},
		sitemap: `${process.env.SITE_URL ?? "https://barloworld.mn"}/sitemap.xml`,
	};
}
