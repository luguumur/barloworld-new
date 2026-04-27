import Hero from "./Hero";
import Features from "./Features";
import FeaturesWithImage from "./FeaturesWithImage";
import Counter from "./Counter";
import CallToAction from "./CallToAction";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Blog from "./Blog";
import Newsletter from "./Newsletter";

import { integrations } from "../../../integrations.config";
import Masthead from "./Masthead";
import { getMastheadsPublic } from "@/actions/masthead";
import { cookies } from "next/headers";

const Home = async () => {
	const cookieStore = await cookies();
	const langCookie = cookieStore.get("lang")?.value;
	const language = langCookie === "mn" ? "mn" : "en";
	const mastheads = await getMastheadsPublic();
	return (
		<>
			<Masthead mastheads={mastheads} language={language} />
			<Hero />
			<Features />
			<FeaturesWithImage />
			<Counter />
			<CallToAction />
			<Testimonials />
			<Pricing />
			<FAQ />
			<Newsletter />
			{integrations?.isSanityEnabled && <Blog />}
		</>
	);
};

export default Home;
