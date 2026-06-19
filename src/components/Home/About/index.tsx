import Image from "next/legacy/image";
import { getDbT } from "@/libs/getDbT";

const About = async () => {
	const t = await getDbT();
	return (
		<section className='home-about image-button'>
			<div className='image-button-graphics-right hidden-xs-down'>
				<img
					width='585'
					height='283'
					src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/graphics2-585x272.webp'
					className='img-responsive entered lazyloaded'
					alt=''
				/>
			</div>
			<div className='image-button-graphics-left hidden-sm-down'>
				<img
					width='455'
					height='220'
					src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/graphics1-497x283.webp'
					className='img-responsive entered lazyloaded'
					alt=''
				/>
			</div>
			<div className='container'>
				<div className='flex flex-col md:flex-row md:items-start'>
					<div className='w-full md:w-1/2'>
						<div className='home-about-left-panel'>
							<div className='home-about-image overflow-hidden'>
								<Image
									src='https://d3leeb4r1qy96s.cloudfront.net/assets/img/HOME_Parts.jpg'
									width={700}
									height={364}
									className='lazyloaded'
									alt='Barloworld Mongolia'
									layout='intrinsic'
									quality={85}
								/>
								<div className='home-about-image-overlay'>
									<a
										className='video-button-link external'
										data-fancybox='goal-video'
										href='https://www.youtube.com/watch?v=sds1NxKwucM&ab_channel=BarloworldMongolia'
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Watch video on YouTube'
									>
										<div className='video-button-outer'>
											<div className='video-button-inner'>
												<span className='play-btn'></span>
											</div>
										</div>
									</a>
								</div>
							</div>
							<div className='home-about-short-content'>
								<div className='home-about-short-content-flex-box'>
									<div className='home-about-short-content-heading'>
										<div className='text-[20px] font-extrabold uppercase text-[#FC0]'>
											{t("About.vision_label", "Vision")}
										</div>
									</div>
									<div className='home-about-short-content-info'>
										<p>
											{t(
												"About.vision_text",
												"To be the best Cat dealer, period."
											)}
										</p>
									</div>
								</div>

								<div className='home-about-short-content-flex-box'>
									<div className='home-about-short-content-heading'>
										<div className='text-[20px] font-extrabold uppercase text-[#FC0]'>
											{t("About.mission_label", "Mission")}
										</div>
									</div>
									<div className='home-about-short-content-info'>
										<p>
											{t(
												"About.mission_text",
												"Superior Services. Lasting Relationships. Stronger Communities."
											)}
										</p>
									</div>
								</div>

								<div className='home-about-short-content-flex-box'>
									<div className='home-about-short-content-heading'>
										<div className='text-[20px] font-extrabold uppercase text-[#FC0]'>
											{t("About.values_label", "Values")}
										</div>
									</div>
									<div className='home-about-short-content-info'>
										<p>
											{t(
												"About.values_text",
												"Barloworld Mongolia is committed to honesty, integrity, respect, safety, high quality, and positive attitude."
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='w-full md:w-1/2'>
						<div className='home-about-right-panel'>
							<h2>{t("About.welcome", "WELCOME TO BARLOWORLD MONGOLIA")}</h2>
							<p>{t("About.description", "")}</p>
							<p>
								<a
									className='btn btn-primary mb-4 inline-block min-w-[120px]'
									href='/about/'
								>
									{t("About.more_btn", "Learn More")}
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
