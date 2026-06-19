import { getTranslationsPublic } from "@/actions/translation";
import { cookies } from "next/headers";

/**
 * Server-only helper. Returns a resolver function t(key, fallback) that picks
 * the correct locale string from the DB Translation table.
 *
 * The underlying getTranslationsPublic() is cached (1 hour, revalidated on any
 * admin translation mutation), so repeated calls within a render are cheap.
 *
 * Usage (server component):
 *   const t = await getDbT();
 *   <h2>{t("ContactCTA.title", "We are here for you")}</h2>
 */
export async function getDbT() {
	const translations = await getTranslationsPublic();
	const cookieStore = cookies();
	const locale = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const map = new Map(translations.map((row) => [row.key, row]));

	return function t(key: string, fallback = ""): string {
		const entry = map.get(key);
		if (!entry) return fallback;
		return locale === "mn" ? entry.value_mn : entry.value_en;
	};
}
