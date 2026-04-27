"use client";

import { useEffect, useState } from "react";

const SUPPORTED_LANGUAGES = ["en", "mn"] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

export default function LanguageSwitcher() {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const savedLanguage = localStorage.getItem("lang");
		if (savedLanguage === "mn" || savedLanguage === "en") {
			setLanguage(savedLanguage);
			document.cookie = `lang=${savedLanguage}; path=/; max-age=31536000; samesite=lax`;
		}
	}, []);

	const updateLanguage = (nextLanguage: Language) => {
		if (nextLanguage === language) return;
		localStorage.setItem("lang", nextLanguage);
		document.cookie = `lang=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
		setLanguage(nextLanguage);
		window.location.reload();
	};

	return (
		<div
			className='ml-3 flex items-center rounded-lg border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-black'
			aria-label='Select language'
		>
			<button
				type='button'
				onClick={() => updateLanguage("en")}
				className={`rounded-md px-2 py-1 text-sm transition-colors ${
					language === "en"
						? "bg-primary text-white"
						: "text-black dark:text-white"
				}`}
			>
				EN
			</button>
			<button
				type='button'
				onClick={() => updateLanguage("mn")}
				className={`rounded-md px-2 py-1 text-sm transition-colors ${
					language === "mn"
						? "bg-primary text-white"
						: "text-black dark:text-white"
				}`}
			>
				MN
			</button>
		</div>
	);
}
