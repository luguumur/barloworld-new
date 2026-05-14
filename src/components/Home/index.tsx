import { cookies } from "next/headers";
import { getMastheadsPublic } from "@/actions/masthead";
import { integrations } from "../../../integrations.config";
import Masthead from "./Masthead";
import EquipmentCategories from "./EquipmentCategories";
import EquipmentSearch from "./EquipmentSearch";
import DealsSection from "./DealsSection";
import CompanyIntro from "./CompanyIntro";
import TestimonialsSection from "./TestimonialsSection";
import ContactCTA from "./ContactCTA";
import Blog from "./Blog";
import About from "./About";
import { getTestimonialsPublic } from "@/actions/testimonial";
import { getNewsPublic } from "@/actions/news";
import Main from "./Main";

const Home = async () => {
	const cookieStore = cookies();
	const langCookie = cookieStore.get("lang")?.value;
	const language = langCookie === "mn" ? "mn" : "en";
	const mastheads = await getMastheadsPublic();
	const testi = await getTestimonialsPublic();
	const news = await getNewsPublic();
	return (
		<>
			<Masthead mastheads={mastheads} language={language} />
			<DealsSection lang={language} />
			<Main />
			<About />
			<TestimonialsSection testi={testi} />
			<ContactCTA />
		</>
	);
};

export default Home;
