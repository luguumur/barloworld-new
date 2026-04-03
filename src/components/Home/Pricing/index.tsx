"use client";
import Pricing from "@/paddle/PaddleBilling";

const HomePricing = () => {
	return (
		<>
			<Pricing isBilling={false} />
		</>
	);
};

export default HomePricing;
