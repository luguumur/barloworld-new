import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ContactCTA() {
	const home = useTranslations("HomeData");
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
						<h2>{home("wearehere")}</h2>
						<p>{home("do_you_need_equipment")}</p>
						<p>
							<a className='btn btn-primary' href='/support/'>
								{home("contact")}
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
