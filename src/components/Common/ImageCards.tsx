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

export default function ImageCards({ cards }: Props) {
	return (
		<section className='flexible-image-cards'>
			<div className='container'>
				<div className='flexible-image-cards-header' />
				<div className='flexible-image-cards-listing'>
					{cards.map((card) => (
						<div key={card.href} className='col-sm-6'>
							<div className='image-cards-box'>
								<a href={card.href}>
									<div className='card-image relative h-[500px] w-full'>
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
											<div className='flex min-h-[240px] w-full items-center justify-center bg-gray-1 text-body/50 dark:bg-white/5 dark:text-gray-5'>
												<ImagePlaceholderSvg className='h-16 w-16' />
											</div>
										)}
									</div>
									<div className='image-card-content'>
										<div className='image-card-btn'>
											<span className='image-card-btn-text'>Learn More</span>
											<div className='image-card-btn-clippy'>
												<span className='icon-right' />
											</div>
										</div>
										<h3>{card.title}</h3>
									</div>
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
