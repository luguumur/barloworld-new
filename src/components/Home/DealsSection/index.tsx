import { getDealsPublic } from "@/actions/deal";
import HomeDealsSlider from "./HomeDealsSlider";
import { getDbT } from "@/libs/getDbT";

export default async function DealsSection({
	lang = "en",
}: {
	lang?: "mn" | "en";
}) {
	const [deals, t] = await Promise.all([getDealsPublic(6), getDbT()]);

	if (!deals.length) return null;

	const title = t("DealsSection.title", "DEALS & SPECIALS");
	const viewAll = t("DealsSection.view_all", "VIEW ALL DEALS & SPECIALS");

	return (
		<section className='home-deals'>
			<div
				className='home-deals-graphics'
				style={{
					backgroundImage:
						"url('https://thompsonmachinery.com/content/uploads/2021/11/home-deals-graphics-image.png')",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				aria-hidden='true'
			/>
			<div className='home-deals-content-wrapper'>
				<div className='container'>
					<div className='home-deals-header'>
						<h2>{title}</h2>
						<a
							href='/deals-specials/'
							target='_self'
							className='home-deals-header__link hidden-xs-down font-bold text-black dark:text-gray-200'
						>
							{viewAll} <span className='icon-chevron-right'></span>
						</a>
					</div>

					<HomeDealsSlider deals={deals} lang={lang} />

					<div className='home-deals-footer hidden-sm-up'>
						<a
							href='/deals-specials/'
							target='_self'
							className='btn btn-secondary'
						>
							{viewAll}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
