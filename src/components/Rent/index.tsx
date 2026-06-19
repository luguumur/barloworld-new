import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getDbT } from "@/libs/getDbT";

export default async function RentPage() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const t = await getDbT();

	const title = t("Rent.title", lang === "mn" ? "Түрээс" : "Rent");

	return (
		<>
			<ProductPageHeader
				title={title}
				breadcrumbs={[
					{ label: t("Common.home", "Home"), href: "/" },
					{ label: title },
				]}
				backgroundImage='/images/bg/rent.jpg'
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9'>
						<div className='flex w-full flex-col items-center justify-center gap-4 overflow-auto'>
							<h3 className='text-lg font-semibold'>
								{t("Rent.location_title", "Rental Branch Locations")}
							</h3>
							<span className='text-center text-xs md:text-sm'>
								{t(
									"Rent.company_subtitle",
									"Barloworld Mongolia LLC rental branches"
								)}
								<br />
								<span className='font-semibold'>
									{t("Rent.office_hours_label", "Office Hours")}:{" "}
									{t("Rent.weekdays", "Mon-Fri 09:00-18:00")} |{" "}
									{t("Rent.weekend", "Sat 09:00-15:00")},{" "}
									{t("Rent.holiday", "Sun - Closed")}
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
										className='absolute bottom-4 right-4 flex h-8 cursor-pointer appearance-none flex-row items-center justify-center rounded-full border border-transparent bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-800 no-underline outline-none transition-colors hover:bg-yellow-500 hover:!text-gray-900 focus-visible:outline-2 focus-visible:brightness-90 active:brightness-90 disabled:cursor-default'
										href='https://www.google.com/maps/search/Barloworld+Mongolia+rental+offices'
										target='_blank'
										rel='noopener noreferrer'
									>
										<div className='flex flex-row items-center gap-2 md:gap-3'>
											<span className='text-sm'>📍</span>
											{t("Rent.view_on_map", "View on Google Maps")}
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
								{t("Rent.cta_title", "Request a Rental Quote")}
							</h3>
							<p
								style={{
									color: "#bbb",
									fontSize: "14px",
									marginBottom: "24px",
								}}
							>
								{t(
									"Rent.cta_desc",
									"Our specialists will propose the most suitable solution for your requirements."
								)}
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
									{t("Rent.contact_btn", "Contact Us")}
								</a>
							</div>
						</section>
					</main>
				</div>
			</article>
		</>
	);
}
