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

const Home = async () => {
	const cookieStore = cookies();
	const langCookie = cookieStore.get("lang")?.value;
	const language = langCookie === "mn" ? "mn" : "en";
	const mastheads = await getMastheadsPublic();

	return (
		<>
			{/* 1. Full-width hero carousel */}
			<Masthead mastheads={mastheads} language={language} />

			{/* 2. Equipment category quick-links */}
			{/* <EquipmentCategories /> */}

			{/* 3. Equipment search widget */}
			{/* <EquipmentSearch /> */}

			{/* 4. Deals & Promotions (from DB) */}
			<DealsSection lang={language} />

			{/* 5. About */}
			<About />

			{/* 5. Company introduction */}
			<CompanyIntro />

			{/* 6. Customer testimonials (from DB) */}
			<TestimonialsSection lang={language} />

			{/* 7. Blog (Sanity-powered) */}
			{integrations?.isSanityEnabled && <Blog />}

			{/* 8. Contact CTA */}
			<ContactCTA />
		</>
	);
};

export default Home;
