import { getMagazinesPublic, MagazineRow } from "@/actions/magazine";
import MagazineGridClient from "./MagazineGridClient";

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http") || image.startsWith("/")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${image}` : null;
}

export default async function MagazineGrid() {
	const magazines = await getMagazinesPublic();
	if (!magazines.length) return null;

	const items = magazines.map((mag) => ({
		id: mag.id,
		title: mag.title,
		number: mag.number,
		date: mag.date,
		url: mag.url,
		image: resolveImage(mag.image),
	}));

	return <MagazineGridClient items={items} />;
}
