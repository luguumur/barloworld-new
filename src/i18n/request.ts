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

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	// Static for now, we'll change this later
	const locale = "en";

	return {
		locale,
		messages: (await import(`../../dictionary/${locale}.json`)).default,
	};
});
