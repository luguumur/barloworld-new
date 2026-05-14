import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";

const categories = [
	{
		title: "Earthmoving",
		title_mn: "Газар хөдөлгөгч тоног төхөөрөмж",
		image:
			"https://d3leeb4r1qy96s.cloudfront.net/assets/img/leadership/cat-excavator.jpg",
		items: ["Excavators", "Bulldozers", "Motor Graders", "Scrapers"],
	},
	{
		title: "Material Handling",
		title_mn: "Материал зөөх тоног төхөөрөмж",
		image:
			"https://d3leeb4r1qy96s.cloudfront.net/assets/img/leadership/cat-loader.jpg",
		items: ["Wheel Loaders", "Skid Steer Loaders", "Telehandlers", "Forklifts"],
	},
	{
		title: "Compaction",
		title_mn: "Тамхилах тоног төхөөрөмж",
		image:
			"https://d3leeb4r1qy96s.cloudfront.net/assets/img/leadership/cat-compactor.jpg",
		items: [
			"Soil Compactors",
			"Landfill Compactors",
			"Vibratory Rollers",
			"Pneumatic Rollers",
		],
	},
	{
		title: "Trucks",
		title_mn: "Тээврийн хэрэгсэл",
		image:
			"https://d3leeb4r1qy96s.cloudfront.net/assets/img/leadership/Baasandorj.jpg",
		items: [
			"Articulated Trucks",
			"Off-Highway Trucks",
			"On-Highway Trucks",
			"Water Trucks",
		],
	},
];

const benefits = [
	{
		icon: "🔧",
		title: "Fully Maintained Fleet",
		title_mn: "Бүрэн засвар үйлчилгээтэй флот",
		desc: "All rental equipment is regularly serviced and maintained by certified CAT technicians.",
		desc_mn:
			"Бүх түрээсийн тоног төхөөрөмжийг сертификаттай CAT мэргэжилтнүүд тогтмол засварлаж, үйлчилдэг.",
	},
	{
		icon: "📞",
		title: "24/7 Support",
		title_mn: "24/7 Дэмжлэг",
		desc: "Our team is available around the clock for any equipment issues or emergencies.",
		desc_mn:
			"Манай баг тоног төхөөрөмжийн асуудал эсвэл яаралтай тусламжийн хувьд цагийн турш ажилладаг.",
	},
	{
		icon: "🚚",
		title: "Delivery & Pickup",
		title_mn: "Хүргэлт & Буцаалт",
		desc: "We deliver and collect equipment directly to your job site anywhere in Mongolia.",
		desc_mn:
			"Монгол улсын хаана ч байсан тоног төхөөрөмжийг таны ажлын байранд хүргэж, буцааж авдаг.",
	},
	{
		icon: "📋",
		title: "Flexible Terms",
		title_mn: "Уян хатан нөхцөл",
		desc: "Daily, weekly, or monthly rental options tailored to your project timeline.",
		desc_mn:
			"Өдрийн, долоо хоногийн, сарын түрээсийн сонголтуудыг таны төслийн хугацаанд тохируулан боловсруулдаг.",
	},
];

type Props = { lang?: "mn" | "en" };

export default function RentPage({ lang = "en" }: Props) {
	const isMn = lang === "mn";

	const officeHours: any = {
		weekdays: "Даваа-Баасан 09:00-18:00",
		weekend: "Бямба 09:00-15:00",
		holiday: "Ням - Амарна",
	};
	return (
		<>
			<ProductPageHeader
				title={isMn ? "Түрээс" : "Rent"}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: isMn ? "Түрээс" : "Rent" },
				]}
				backgroundImage='/images/bg/rent.jpg'
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9'>
						<div className='flex w-full flex-col items-center justify-center gap-4 overflow-auto'>
							<h3 className='text-lg font-semibold'>
								Түрээсийн салбарын байршил
							</h3>
							<span className='text-center text-xs md:text-sm'>
								Барлоуорлд Монгол ХХК-ийн түрээсийн салбарууд
								<br />
								<span className='font-semibold'>
									Ажлын цаг: {officeHours.weekdays} | {officeHours.weekend},{" "}
									{officeHours.holiday}
								</span>
							</span>

							<div className='flex max-h-[668px] w-full flex-col gap-4 md:max-w-7xl md:flex-row md:gap-6'>
								<div className='aspect-square flex-1 overflow-hidden rounded-sm'>
									<iframe
										src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5867562554454!2d106.86322311587898!3d47.90568317526192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693197317afc7%3A0x6358104e5496994a!2sBarloworld%20Mongolia!5e0!3m2!1sen!2smn!4v1569379371193!5m2!1sen!2smn&wmode=transparent'
										width='100%'
										height='100%'
										style={{ border: 0 }}
										allowFullScreen
										loading='lazy'
										referrerPolicy='no-referrer-when-downgrade'
										title='Barloworld Mongolia Rental Offices Location'
									/>
								</div>

								<div className='relative flex-1 overflow-hidden rounded-sm'>
									<img
										src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/specials/rental_office_02_3_11zon.png'
										alt='Rental Office Location'
										className='h-full w-full object-cover'
									/>
									<a
										className='focus-visible:outline-gray-1000 focus-visible:outline-gray-1000 absolute bottom-4 right-4 flex h-8 cursor-pointer appearance-none flex-row items-center justify-center rounded-full border border-transparent bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-800 no-underline outline-none transition-colors hover:bg-yellow-500 hover:!text-gray-900 focus-visible:outline-2 focus-visible:brightness-90 active:brightness-90 disabled:cursor-default focus-visible:dark:outline-gray-100'
										href='https://www.google.com/maps/search/Barloworld+Mongolia+rental+offices'
										target='_blank'
										rel='noopener noreferrer'
									>
										<div className='flex flex-row items-center gap-2 md:gap-3'>
											<div className='inline-flex h-4 w-4 leading-none text-current'>
												<span className='text-sm'>📍</span>
											</div>
											Google map дээр харах
										</div>
									</a>
								</div>
							</div>
						</div>

						{/* CTA */}
						<section
							className='mt-10'
							style={{
								background: "#222",
								padding: "36px",
								textAlign: "center",
								marginBottom: "40px",
							}}
						>
							<h3
								style={{
									color: "#fff",
									fontSize: "22px",
									fontWeight: 700,
									marginBottom: "12px",
								}}
							>
								{isMn ? "Түрээсийн үнийн санал авах" : "Request a Rental Quote"}
							</h3>
							<p
								style={{
									color: "#bbb",
									fontSize: "14px",
									marginBottom: "24px",
								}}
							>
								{isMn
									? "Манай мэргэжилтнүүд таны шаардлагад тохирсон хамгийн тохиромжтой шийдлийг санал болгоно."
									: "Our specialists will propose the most suitable solution for your requirements."}
							</p>
							<div
								style={{
									display: "flex",
									gap: "12px",
									justifyContent: "center",
									flexWrap: "wrap",
								}}
							>
								<a
									href='/support'
									className='btn btn-primary'
									style={{ minWidth: "160px" }}
								>
									{isMn ? "Холбоо барих" : "Contact Us"}
								</a>
							</div>
						</section>
					</main>
				</div>
			</article>
		</>
	);
}
