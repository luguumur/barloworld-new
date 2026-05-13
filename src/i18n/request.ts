import { getRequestConfig } from "next-intl/server";
import { getTranslationsPublic } from "@/actions/translation";

export const SUPPORTED_LOCALES = [
	{
		name: "English",
		code: "en",
	},
	{
		name: "Mongolian",
		code: "mn",
	},
];

/** Use only static import paths — webpack/turbopack cannot resolve template-literal JSON imports. */
async function loadMessages(locale: string) {
	switch (locale) {
		case "mn":
			return (await import("../../dictionary/mn.json")).default;
		case "en":
		default:
			return (await import("../../dictionary/en.json")).default;
	}
}

/**
 * Applies a flat dot-separated key like "HomeData.title" or "Menu"
 * onto a nested messages object. DB translations override JSON defaults.
 */
function applyTranslation(
	messages: Record<string, unknown>,
	key: string,
	value: string,
): void {
	const parts = key.split(".");
	if (parts.length === 1) {
		messages[key] = value;
		return;
	}
	const [ns, ...rest] = parts;
	if (typeof messages[ns] !== "object" || messages[ns] === null) {
		messages[ns] = {};
	}
	applyTranslation(messages[ns] as Record<string, unknown>, rest.join("."), value);
}

export default getRequestConfig(async () => {
	const locale = "en";

	const [jsonMessages, dbRows] = await Promise.all([
		loadMessages(locale),
		getTranslationsPublic(),
	]);

	const messages = JSON.parse(JSON.stringify(jsonMessages)) as Record<string, unknown>;

	for (const row of dbRows) {
		const value = (locale as string) === "mn" ? row.value_mn : row.value_en;
		applyTranslation(messages, row.key, value);
	}

	return { locale, messages };
});
