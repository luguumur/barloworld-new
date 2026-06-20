import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter, Noto_Sans, Roboto_Condensed } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const notoSans = Noto_Sans({
	subsets: ["latin", "cyrillic"],
	variable: "--font-noto-sans",
	display: "swap",
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const robotoCondensed = Roboto_Condensed({
	subsets: ["latin"],
	variable: "--font-roboto-condensed",
	display: "swap",
	weight: ["400", "700"],
});

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning={true}
			className={`${inter.variable} ${notoSans.variable} ${robotoCondensed.variable}`}
		>
			<head>
				{/* Preload icon font to break CSS→font chain */}
				<link
					rel='preload'
					as='font'
					type='font/ttf'
					href='/fonts/icons/icomoon.ttf'
					crossOrigin='anonymous'
				/>
			</head>
			<body
				className={`${inter.className} flex min-h-screen flex-col dark:bg-[#151F34]`}
			>
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
};

export default layout;
