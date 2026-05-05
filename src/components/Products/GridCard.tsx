import Image from "next/image";
import Link from "next/link";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

type GridCardProps = {
	href: string;
	name: string;
	imgPath?: string | null;
	count?: number;
	countLabel?: string;
};

export default function GridCard({ href, name, imgPath, count, countLabel }: GridCardProps) {
	const img = resolveImg(imgPath);

	return (
		<Link href={href} className="group block overflow-hidden rounded-lg border border-gray-3 bg-white shadow-sm hover:shadow-xl transition-all duration-300 dark:border-dark-2 dark:bg-dark">
			{/* Image */}
			<div className="relative h-52 w-full overflow-hidden bg-gray-2 dark:bg-dark-2">
				{img ? (
					<Image
						src={img}
						alt={name}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						unoptimized
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<span className="text-5xl font-black text-primary opacity-20 font-satoshi">CAT</span>
					</div>
				)}
				{/* Yellow bottom bar on hover */}
				<div className="absolute bottom-0 left-0 right-0 h-1 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
			</div>

			{/* Content */}
			<div className="flex items-center justify-between p-4">
				<h3 className="font-satoshi text-base font-bold uppercase tracking-wide text-dark dark:text-white leading-tight">
					{name}
				</h3>
				<div className="flex items-center gap-2">
					{count !== undefined && (
						<span className="text-xs text-gray-5 font-medium">
							{count} {countLabel ?? "items"}
						</span>
					)}
					<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-dark font-bold text-sm transition-transform duration-200 group-hover:translate-x-0.5">
						→
					</span>
				</div>
			</div>
		</Link>
	);
}
