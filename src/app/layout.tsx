import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter, Roboto_Condensed } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const robotoCondensed = Roboto_Condensed({
	subsets: ["latin"],
	variable: "--font-roboto-condensed",
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning={true}
			className={`${inter.variable} ${robotoCondensed.variable}`}
		>
			<head />
			<body
				className={`${inter.className} flex min-h-screen flex-col dark:bg-[#151F34]`}
			>
				<NextIntlClientProvider>{children}</NextIntlClientProvider>
			</body>
		</html>
	);
};

export default layout;
