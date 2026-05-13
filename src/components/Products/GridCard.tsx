import ImagePlaceholderSvg from "@/components/Common/ImagePlaceholderSvg";

export type ImageCard = {
	href: string;
	image: string | null;
	alt: string;
	title: string;
};

type Props = {
	cards: ImageCard[];
};

export default function GridCard({ cards }: Props) {
	return (
		<ul>
			{cards.map((card) => (
				<li key={card.href} className='col-xs-6 col-sm-4'>
					<div className='button-image'>
						<a href={card.href}>
							<div className='card-image'>
								{card.image ? (
									/* eslint-disable-next-line @next/next/no-img-element */
									<img
										width={600}
										height={500}
										src={card.image}
										className='img-responsive'
										alt={card.alt}
									/>
								) : (
									<div className='flex min-h-[180px] w-full items-center justify-center bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
										<ImagePlaceholderSvg className='h-12 w-12' />
									</div>
								)}
							</div>
							<h6 className='button-image--name'>
								<span>{card.title}</span>
							</h6>
						</a>
					</div>
				</li>
			))}
		</ul>
	);
}
