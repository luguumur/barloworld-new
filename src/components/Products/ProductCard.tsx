import Image from "next/image";
import Link from "next/link";
import type { ProductRow } from "@/actions/product";
import ImagePlaceholderSvg from "../Common/ImagePlaceholderSvg";

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
	const attrs = product.attributeValues?.slice(0, 3) ?? [];

	return (
		<Link href={href} className='card card--product js-cat-filterable test'>
			<figure className='card__primary-info'>
				{img ? (
					<Image
						src={img}
						alt={name}
						fill
						className='img-responsive'
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
						unoptimized
					/>
				) : (
					<div className='flex h-full min-h-[240px] w-full items-center justify-center bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
						<ImagePlaceholderSvg className='h-16 w-16' />
					</div>
				)}
			</figure>

			<figcaption className='card__secondary-info'>
				<h4 className='card__title'>{name}</h4>
				<dl className='product-stats-summary clearfix'>
					{attrs.map((av) => (
						<div key={av.id} className='product-stats-summary__row'>
							<dt>
								{lang === "mn" ? av.attribute.name : av.attribute.name_en}
							</dt>
							<dd>{av.string_value ?? "—"}</dd>
						</div>
					))}
				</dl>
				<span className='btn btn-primary text--left'>View Details</span>
			</figcaption>
		</Link>
	);
}
