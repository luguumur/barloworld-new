import Image from "next/image";
import { getDbT } from "@/libs/getDbT";

export default async function ContactCTA() {
	const t = await getDbT();
	return (
		<section className='cta'>
			<div className='cta-banner'>
				<Image
					priority
					src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image.jpg'
					fill
					alt='cta-banner'
					loading='eager'
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className='cta-overlay'>
				<div className='container'>
					<div className='text-white'>
						<h2>{t("ContactCTA.title", "We are here for you")}</h2>
						<p>
							{t(
								"ContactCTA.description",
								"Do you need equipment that delivers outstanding performance at your job site? Contact us today."
							)}
						</p>
						<p>
							<a className='btn btn-primary' href='/support/'>
								{t("ContactCTA.contact_btn", "Contact Us")}
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
