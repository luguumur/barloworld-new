import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import Card from "@/components/Common/Dashboard/Card";
import { Metadata } from "next";
import HomeContentForm from "@/components/Admin/HomeMain/HomeContentForm";
import HomeCardList from "@/components/Admin/HomeMain/HomeCardList";
import { getHomeContent, getHomeCards } from "@/actions/homeMain";
import { DEFAULT_CONTENT } from "@/actions/homeMainDefaults";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Home Main Section - ${process.env.SITE_NAME}`,
};

export default async function HomeMainPage() {
	const [content, cards] = await Promise.all([
		getHomeContent(),
		getHomeCards(),
	]);
	const initial = content
		? {
				titleBefore: content.titleBefore,
				titleBefore_en: content.titleBefore_en,
				titleMain: content.titleMain,
				titleMain_en: content.titleMain_en,
				description: content.description,
				description_en: content.description_en,
				btnText: content.btnText,
				btnText_en: content.btnText_en,
				btnUrl: content.btnUrl,
			}
		: DEFAULT_CONTENT;

	return (
		<>
			<Breadcrumb pageTitle='Home — Main Section' />

			<div className='flex flex-col gap-6'>
				{/* Left panel content */}
				<Card>
					<h2 className='mb-6 font-satoshi text-xl font-bold text-dark dark:text-white'>
						Left Panel Content
					</h2>
					<HomeContentForm initial={initial} />
				</Card>

				{/* Image cards */}
				<Card>
					<HomeCardList cards={cards} />
				</Card>
			</div>
		</>
	);
}
