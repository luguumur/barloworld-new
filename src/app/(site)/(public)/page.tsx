import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://barloworld.mn"),
	title: `Барловорлд Монголиа ХХК | Barloworld Mongolia`,
	description: `Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia.`,
	keywords: `Тоног төхөөрөмж, tonog tohooromj, tonog tuhuurumj,Wagner Asia Equipment LLC, Dealer of Caterpillar, Mongolia, Sales , Services, Rental, Barloworld Mongolia LLC, Barloworld, Barloworld Equipment, Backhoe Loader, Skid Steer Loader, Telehandler, Auger, Electric Power, Wheel Dozer, Motor Grader, Track Loader, Reclaimer, Stabilizer, Handler, Excavator, Equipment, Dozer, Loader, Achigch, Achigch, Tractor, Generator, Exca, Exce, Truck, Mining, Mining Tractor, Mining Truck, Барловоролд, Барловорлд Монголиа, Уул уурхай, Уул уурхайн тоног төхөөрөмж, замын тоног төхөөрөмж, барилгын тоног төхөөрөмж, хүнд тоног төхөөрөмж, хүнд машин механизм, ачигч, бага оврын дугуйт ачигч, сунадаг ачигч, трактор, универсал трактор, түнтгэр шар, бобкат, bobcat, cat, komatsu, xcmg, sdlg, автогрейдер, гинжит трактор, генератор`,
	authors: [{ name: `Barloworld Mongolia LLC`, url: `https://barloworld.mn` }],
	openGraph: {
		url: "https://barloworld.mn",
		type: "website",
		title: `Барловорлд Монголиа ХХК | Barloworld Mongolia`,
		description: `Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia.`,
		images: [
			{
				url: "https://barloworld.mn/wp-content/uploads/2024/04/logo-white.png",
				width: 1200,
				height: 630,
				alt: `Барловорлд Монголиа ХХК | Barloworld Mongolia`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: `Барловорлд Монголиа ХХК | Barloworld Mongolia`,
		description: `Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia.`,
		images: "https://barloworld.mn/wp-content/uploads/2024/04/logo-white.png",
	},
};

export default function HomePage() {
	return (
		<main>
			<Home />
		</main>
	);
}
