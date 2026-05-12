import { getRequestConfig } from "next-intl/server";

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

export default getRequestConfig(async () => {
	// Static for now, we'll change this later
	const locale = "en";

	return {
		locale,
		messages: await loadMessages(locale),
	};
});
