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
						<div className='row push--bottom'>
							<div className='col-md-7 col-sm-9'>
								<nav className='nav--footer font-satoshi'>
									<ul className='menu text-center md:text-left'>
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
							</div>
							<div className='col-md-5 col-sm-3'>
								<div className='flex items-center justify-center gap-6 font-noto lg:justify-end'>
									<ul className='page-footer__social social-links hidden-xs hidden-sm clearfix !float-none'>
										<li className='mr-6 sm:mr-0'>
											<a
												className='icon-facebook'
												target='_blank'
												rel='noopener noreferrer'
												href='https://www.facebook.com/BarloworldMongolia'
												aria-label='Facebook'
											></a>
										</li>
										<li className='mr-6 sm:mr-0'>
											<a
												className='icon-twitter'
												target='_blank'
												rel='noopener noreferrer'
												href='https://x.com/BarloworldMN'
												aria-label='Twitter'
											></a>
										</li>
										<li className='mr-6 sm:mr-0'>
											<a
												className='icon-instagram'
												target='_blank'
												rel='noopener noreferrer'
												href='https://www.instagram.com/barloworldmongolia'
												aria-label='Instagram'
											></a>
										</li>
										<li className='mr-6 sm:mr-0'>
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
										className='btn-phone phone-number hidden-sm-down'
										href='tel:+97670187588'
										aria-label='Call us'
									>
										+976 7018-7588
									</a>
								</div>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-4 hidden-xxs hidden-xs hidden-sm'>
								<nav className='nav--footer-secondary clearfix'>
									<ul className='menu mb-9 text-center text-sm sm:text-base md:text-left'>
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
							</div>
							{/* <div className="col-sm-8 col-sm-push-4 col-md-4 col-md-push-4 col-lg-5 col-lg-push-3">
                <div className="page-footer__extra-links clearfix">
                  <div className="flags">
                    <a href="https://translate.google.com/">
                      <img
                        src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/brazil.png"
                        alt=""
                      />
                    </a>
                    <a href="https://translate.google.com/">
                      <img
                        src="https://thompsonmachinery.com/content/themes/thompsonmachinery/images/france.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div> */}
							<div className='col-sm-4'>
								<p
									className='page-footer__copyright'
									aria-label='Copyright information'
								>
									Copyright © {new Date().getFullYear()} Barloworld Mongolia.{" "}
									<br /> All Rights Reserved
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
