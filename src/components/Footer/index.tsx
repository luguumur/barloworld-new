import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
	const homet = useTranslations("HomeData");
	const menut = useTranslations("MenuData");

	return (
		<footer>
			<div className='page-footer'>
				<div className='page-footer__main'>
					<div className='container'>

						{/* Row 1: Primary nav + Social / Phone / Back to top */}
						<div className='flex flex-col gap-6 pb-8 md:flex-row md:items-start md:justify-between md:pb-10'>

							{/* Primary navigation */}
							<nav className='nav--footer'>
								<ul className='menu flex flex-wrap justify-center gap-x-2 gap-y-2 md:justify-start'>
									<li className='!pl-0 !pr-3'>
										<Link href='/equipment'>{menut("equipment")}</Link>
									</li>
									<li className='!pl-0 !pr-3'>
										<Link href='/parts'>{menut("parts")}</Link>
									</li>
									<li className='!pl-0 !pr-3'>
										<Link href='/service'>{menut("service")}</Link>
									</li>
									<li className='!pl-0 !pr-3'>
										<Link href='/technology'>{menut("technology")}</Link>
									</li>
									<li className='!pl-0 !pr-3'>
										<Link href='/deals-specials'>{menut("specials")}</Link>
									</li>
									<li className='!pl-0 !pr-3'>
										<Link href='/contact-us'>{menut("contact")}</Link>
									</li>
								</ul>
							</nav>

							{/* Social icons + Phone + Back to top */}
							<div className='flex flex-col items-center gap-4 md:items-end'>
								<ul className='page-footer__social social-links clearfix flex justify-center gap-1 md:justify-end'>
									<li>
										<a
											className='icon-facebook'
											target='_blank'
											rel='noopener noreferrer'
											href='https://www.facebook.com/BarloworldMongolia'
											aria-label='Facebook'
										></a>
									</li>
									<li>
										<a
											className='icon-twitter'
											target='_blank'
											rel='noopener noreferrer'
											href='https://x.com/BarloworldMN'
											aria-label='Twitter'
										></a>
									</li>
									<li>
										<a
											className='icon-instagram'
											target='_blank'
											rel='noopener noreferrer'
											href='https://www.instagram.com/barloworldmongolia'
											aria-label='Instagram'
										></a>
									</li>
									<li>
										<a
											className='icon-linkedin2'
											target='_blank'
											rel='noopener noreferrer'
											href='https://www.linkedin.com/company/barloworldmongolia'
											aria-label='LinkedIn'
										></a>
									</li>
									<li>
										<a
											className='icon-youtube3'
											target='_blank'
											rel='noopener noreferrer'
											href='https://www.youtube.com/@BarloworldMongolia'
											aria-label='YouTube'
										></a>
									</li>
								</ul>
								<a
									className='btn-phone phone-number'
									href='tel:+97670187588'
									aria-label='Call us'
								>
									+976 7018-7588
								</a>
								<div className='back-to-top'>
									<a href='#'>Back to Top</a>
								</div>
							</div>
						</div>

						{/* Row 2: Secondary nav + Extra links + Copyright */}
						<div className='flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between'>

							{/* Secondary nav — hidden on mobile */}
							<nav className='nav--footer-secondary hidden md:block'>
								<ul className='menu flex flex-wrap gap-x-4'>
									<li className='menu-item'>
										<Link href='/management'>{homet("board")}</Link>
									</li>
									<li className='menu-item'>
										<Link href='/blog'>{homet("social")}</Link>
									</li>
									<li className='menu-item'>
										<Link href='/blog'>{homet("news")}</Link>
									</li>
									<li className='menu-item'>
										<Link href='/magazine'>{homet("magazine")}</Link>
									</li>
								</ul>
							</nav>

							{/* Extra links */}
							<div className='page-footer__extra-links'>
								<ul className='flex gap-4'>
									<li>
										<a href='https://thompsonmachinery.com/contact-us/locations'>
											Locations
										</a>
									</li>
									<li>
										<a href='https://thompsonmachinery.com/contact-us'>
											Contact Us
										</a>
									</li>
								</ul>
							</div>

							{/* Copyright */}
							<p
								className='page-footer__copyright'
								aria-label='Copyright information'
							>
								Copyright © {new Date().getFullYear()} Barloworld Mongolia.{" "}
								All Rights Reserved
							</p>
						</div>

					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
