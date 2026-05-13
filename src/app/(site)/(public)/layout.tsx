import "../../../styles/main.css";
import CookieBanner from "@/components/Common/CookieBanner";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			<CookieBanner />
		</>
	);
}
