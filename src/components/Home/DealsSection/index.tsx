import { getDealsPublic, type DealRow } from "@/actions/deal";
import Image from "next/image";
import Link from "next/link";

function resolveImg(path: string | null | undefined): string | null {
	const raw = path?.trim();
	if (!raw) return null;
	if (raw.startsWith("http") || raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : null;
}

function DealCard({ deal, lang }: { deal: DealRow; lang: "mn" | "en" }) {
	const title = lang === "mn" ? deal.title : deal.title_en;
	const description = lang === "mn" ? deal.description : deal.description_en;
	const img = resolveImg(deal.img_path);

	return (
		<div className='group flex flex-col overflow-hidden rounded-lg border border-gray-3 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-dark-2 dark:bg-dark'>
			<div className='relative h-48 w-full overflow-hidden bg-gray-2 dark:bg-dark-2'>
				{img ? (
					<Image
						src={img}
						alt={title}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-105'
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
						unoptimized
					/>
				) : (
					<div className='flex h-full items-center justify-center'>
						<span className='text-4xl font-black text-primary opacity-30'>
							CAT
						</span>
					</div>
				)}
				<div className='absolute left-3 top-3 rounded bg-primary px-2 py-0.5 font-satoshi text-xs font-bold text-black'>
					DEAL
				</div>
			</div>

			<div className='flex flex-1 flex-col p-5'>
				<h3 className='mb-2 font-satoshi text-base font-bold leading-snug text-dark dark:text-white'>
					{title}
				</h3>
				<p className='line-clamp-2 flex-1 text-sm text-body dark:text-gray-5'>
					{description}
				</p>
				<Link
					href='/products'
					className='mt-4 inline-flex items-center gap-1.5 font-satoshi text-sm font-bold text-primary hover:underline'
				>
					VIEW DEAL →
				</Link>
			</div>
		</div>
	);
}

export default async function DealsSection({
	lang = "en",
}: {
	lang?: "mn" | "en";
}) {
	const deals = await getDealsPublic(6);

	if (!deals.length) return null;

	return (
		// <section className='bg-gray-1 py-14 dark:bg-dark'>
		// 	<div className='mx-auto container px-4 sm:px-8 xl:px-0'>
		// 		<div className='mb-8 flex items-end justify-between'>
		// 			<div>
		// 				<p className='mb-1 text-sm font-semibold uppercase tracking-widest text-primary'>
		// 					Тусгай санал
		// 				</p>
		// 				<h2 className='font-satoshi text-2xl font-black -tracking-[0.5px] text-dark dark:text-white sm:text-3xl'>
		// 					Deals & Promotions
		// 				</h2>
		// 			</div>
		// 			<Link
		// 				href='/products'
		// 				className='hidden items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:flex'
		// 			>
		// 				View all deals →
		// 			</Link>
		// 		</div>

		// 		<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
		// 			{deals.map((deal) => (
		// 				<DealCard key={deal.id} deal={deal} lang={lang} />
		// 			))}
		// 		</div>

		// 		<div className='mt-8 sm:hidden'>
		// 			<Link
		// 				href='/products'
		// 				className='flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-3 font-satoshi font-bold text-primary'
		// 			>
		// 				View all deals →
		// 			</Link>
		// 		</div>
		// 	</div>
		// </section>
		<section className='home-deals'>
			<div className='home-deals-graphics'>
				<img
					width='1920'
					height='938'
					src='https://thompsonmachinery.com/content/uploads/2021/11/home-deals-graphics-image.png'
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
					{/* <div className='home-deals-box js-home-deals-slider slick-initialized slick-slider'>
						{deals.map((deal) => (
							<DealCard key={deal.id} deal={deal} lang={lang} />
						))}
					</div> */}
					{/* <div className='home-deals-box js-home-deals-slider slick-initialized slick-slider'>
						<button
							type='button'
							data-role='none'
							className='slick-prev slick-arrow'
							aria-label='Previous'
							role='button'
						>
							Previous
						</button>

						<div
							aria-live='polite'
							className='slick-list draggable'
							style={{ height: "356.641px" }}
						>
							<div
								className='slick-track'
								style={{ opacity: 1, width: "9198px" }}
								role='listbox'
							>
								<div
									className='home-deals-item slick-slide slick-current slick-active'
									data-slick-index='0'
									aria-hidden='false'
									style={{
										width: "1314px",
										position: "relative",
										left: "0px",
										top: "0px",
										zIndex: "999",
										opacity: 1,
									}}
									role='option'
									aria-describedby='slick-slide20'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='759'
												height='367'
												src='https://thompsonmachinery.com/content/uploads/2020/04/0-for-60-759x367.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>WE’VE GOT YOUR SAVINGS</h3>
											<p>CLICK HERE FOR COMPLETE INFORMATION…</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/0-for-60-months/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='1'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-1314px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide21'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='600'
												height='400'
												src='https://thompsonmachinery.com/content/uploads/2026/02/Direct-mailer-image-for-landing-page-600x400.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>20% Off First-Time Rentals</h3>
											<p>
												UP FOR 70 RENT- READY BRANDS? Get Started &nbsp;
												Thompson Machinery Cat Rentals℠&nbsp;&nbsp;is your
												one-stop rental solution. In addition to a full range of
												Cat Equipment, we offer an…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/20-off-first-time-rentals/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='2'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-2628px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide22'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='649'
												height='400'
												src='https://thompsonmachinery.com/content/uploads/2019/02/Q2-2026-Digital-Deals-Specials-Box-01-649x400.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>Digital Deals with the Cat Central App</h3>
											<p>
												PARTS YOU TRUST. SAVINGS YOU DON’T WANT TO MISS. ONLINE
												ONLY. &nbsp;Get 10% OFF Cat Wear Parts and 30% OFF Cat
												Batteries, exclusively through&nbsp;the Cat Central App
												or&nbsp;Parts.Cat.com.…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/digital-deals/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='3'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-3942px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide23'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='640'
												height='360'
												src='https://thompsonmachinery.com/content/uploads/2020/01/Q3-2025-0-for-36-Email-Header-1.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>Cat®Commercial Account</h3>
											<p>
												Special Financing with a Cat® Commercial Account!
												Introducing the Cat Commercial Account No annual fee,
												competitive rates, and flexible terms, your all-in-one
												solution for parts, attachments, service, and equipment
												upgrades.…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/cat-commercial-account/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='4'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-5256px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide24'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='711'
												height='400'
												src='https://thompsonmachinery.com/content/uploads/2022/12/1920x1080_GCI-National-Offer-711x400.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>Great Payback Event</h3>
											<p>
												INVENTORY ON THE GROUND Exclusive offer to own your
												machine — and the competition. Choose from two great
												options: &nbsp; AS LOW AS 0% FOR 36 MONTHS + CVA Reduce…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/greatpayback/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='5'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-6570px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide25'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='759'
												height='360'
												src='https://thompsonmachinery.com/content/uploads/2020/02/Batteries-Special-Box-759x360.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>SAVE BIG ON CAT BATTERIES</h3>
											<p>
												30% OFF CAT® BATTERIES USE PROMO CODE “BATTERY30”
												EXTREME FEATURES, SUPREME RESULTS START SHOPPING When
												your equipment needs to start, there’s no room for
												doubt. A reliable machine starts with…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/battery-special/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
								<div
									className='home-deals-item slick-slide'
									data-slick-index='6'
									aria-hidden='true'
									style={{
										width: "1314px",
										position: "relative",
										left: "-7884px",
										top: "0px",
										zIndex: "998",
										opacity: "0",
									}}
									role='option'
									aria-describedby='slick-slide26'
								>
									<div className='home-deals-item-box clearfix'>
										<div className='home-deals-image'>
											<img
												width='447'
												height='242'
												src='https://thompsonmachinery.com/content/uploads/2016/02/GOV-SPECIALS-Box-Image-0216c.jpg'
												className='img-responsive'
											/>
										</div>
										<div className='home-deals-content'>
											<h3>Trade Association Discounts</h3>
											<p>
												Association members and event attendees save up to
												$2,750 on your next purchase of new qualifying Cat
												machines. Including: Skid Steer Loaders, Compact Track
												Loaders, Multi Terrain Loaders, Compact and…
											</p>
											<a
												href='https://thompsonmachinery.com/deals-specials/trade-association-discounts/'
												className='btn btn-primary'
											>
												VIEW DEAL
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<button
							type='button'
							data-role='none'
							className='slick-next slick-arrow'
							aria-label='Next'
							role='button'
						>
							Next
						</button>
					</div>

					<div className='home-deals-footer hidden-sm-up'>
						<a
							href='/deals-specials/'
							target='_self'
							className='btn btn-secondary'
						>
							VIEW ALL DEALS &amp; SPECIALS
						</a>
					</div> */}
				</div>
			</div>
		</section>
	);
}
