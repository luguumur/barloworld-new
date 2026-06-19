import { cookies } from "next/headers";
import { getMastheadsPublic } from "@/actions/masthead";
import { getTestimonialsPublic } from "@/actions/testimonial";
import { getNewsPublic } from "@/actions/news";
import { getDbT } from "@/libs/getDbT";
import Masthead from "./Masthead";
import DealsSection from "./DealsSection";
import Main from "./Main";
import About from "./About";
import TestimonialsSection from "./TestimonialsSection";
import ContactCTA from "./ContactCTA";

const Home = async () => {
	const cookieStore = cookies();
	const langCookie = cookieStore.get("lang")?.value;
	const language = langCookie === "mn" ? "mn" : "en";

	const [mastheads, testi, , t] = await Promise.all([
		getMastheadsPublic(),
		getTestimonialsPublic(),
		getNewsPublic(),
		getDbT(),
	]);

	return (
		<>
			<Masthead mastheads={mastheads} language={language} />
			<DealsSection lang={language} />
			<Main />
			<About />
			<TestimonialsSection
				testi={testi}
				labels={{
					titleLine1: t("TestimonialsSection.title_line1", "Hear From"),
					titleLine2: t("TestimonialsSection.title_line2", "Our Customers"),
					cta: t("TestimonialsSection.cta", "READ ALL TESTIMONIALS"),
				}}
			/>
			<ContactCTA />
		</>
	);
};

export default Home;
