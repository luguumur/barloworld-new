// import "../../styles/satoshi.css"; // Replaced with Roboto Condensed
import "react-quill/dist/quill.snow.css";
import "../../styles/globals.css";
import { Providers } from "./providers";
import ToastContext from "../context/ToastContext";
import NextTopLoader from "nextjs-toploader";
import Loader from "@/components/Common/PreLoader";
import FooterWrapper from "@/components/Footer/FooterWrapper";
import { HeaderWrapper } from "@/components/Header/HeaderWrapper";
import { getMenuForPublic } from "@/actions/menu";
import { cookies } from "next/headers";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const langCookie = cookieStore.get("lang")?.value;
	const lang = langCookie === "mn" ? "mn" : "en";
	const menu = await getMenuForPublic(lang);
	return (
		<>
			<Loader />
			<>
				<ToastContext />
				<Providers>
					<NextTopLoader
						color='#feca34'
						crawlSpeed={300}
						showSpinner={false}
						shadow='none'
					/>
					<HeaderWrapper menu={menu} />
					{children}
					<FooterWrapper />
				</Providers>
			</>
		</>
	);
}
