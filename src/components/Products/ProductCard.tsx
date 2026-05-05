import Image from "next/image";
import Link from "next/link";
import type { ProductRow } from "@/actions/product";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

type Props = {
	product: ProductRow;
	href: string;
	lang?: "mn" | "en";
};

export default function ProductCard({ product, href, lang = "en" }: Props) {
	const name = lang === "mn" ? product.name : product.name_en;
	const img = resolveImg(product.img_path);

	return (
		<Link href={href} className="group flex flex-col overflow-hidden rounded-lg border border-gray-3 bg-white shadow-sm hover:shadow-xl transition-all duration-300 dark:border-dark-2 dark:bg-dark">
			{/* Image */}
			<div className="relative h-56 w-full overflow-hidden bg-gray-2 dark:bg-dark-2">
				{img ? (
					<Image
						src={img}
						alt={name}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						unoptimized
					/>
				) : (
					<div className="flex h-full flex-col items-center justify-center gap-2">
						<span className="text-4xl font-black text-primary opacity-20 font-satoshi">CAT</span>
					</div>
				)}
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col p-5">
				<h3 className="font-satoshi text-base font-bold uppercase tracking-wide text-dark dark:text-white leading-snug mb-2">
					{name}
				</h3>

				<div className="mt-auto pt-4 flex items-center justify-between">
					<span className="font-satoshi text-sm font-bold text-primary uppercase tracking-wide group-hover:underline">
						View Details →
					</span>
					{product.brochure_path && (
						<span className="text-xs text-gray-5 border border-gray-3 rounded px-2 py-0.5">
							Brochure
						</span>
					)}
				</div>
			</div>
		</Link>
	);
}
