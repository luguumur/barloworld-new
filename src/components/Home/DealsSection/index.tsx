import { getDealsPublic } from "@/actions/deal";

import HomeDealsSlider from "./HomeDealsSlider";

export default async function DealsSection({
	lang = "en",
}: {
	lang?: "mn" | "en";
}) {
	const deals = await getDealsPublic(6);

	if (!deals.length) return null;

	return (
		<section className='home-deals'>
			<div className='home-deals-graphics'>
				<img
					width='1920'
					height='938'
					src='https://thompsonmachinery.com/content/uploads/2021/11/home-deals-graphics-image.png'
					alt=''
					className='img-responsive'
					loading='lazy'
					decoding='async'
					fetchPriority='low'
				/>
			</div>
			<div className='home-deals-content-wrapper'>
				<div className='container'>
					<div className='home-deals-header'>
						<h2>DEALS &amp; SPECIALS</h2>
						<a
							href='/deals-specials/'
							target='_self'
							className='home-deals-header__link hidden-xs-down'
						>
							VIEW ALL DEALS &amp; SPECIALS{" "}
							<span className='icon-chevron-right'></span>
						</a>
					</div>

					<HomeDealsSlider deals={deals} lang={lang} />

					<div className='home-deals-footer hidden-sm-up'>
						<a
							href='/deals-specials/'
							target='_self'
							className='btn btn-secondary'
						>
							VIEW ALL DEALS &amp; SPECIALS
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
