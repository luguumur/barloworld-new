export type MastheadSlide = {
	id: string;
	dateLabel: string;
	title: string;
	description: string;
	href: string;
	ctaLabel: string;
	/** Tailwind background utility classes for the media side (under optional image) */
	mediaClassName: string;
	/** Optional hero image (absolute URL or site path) */
	imageUrl?: string | null;
};

export const mastheadSlides: MastheadSlide[] = [
	{
		id: "power",
		dateLabel: "April 2026",
		title: "Reliable power for a growing world",
		description:
			"From prime to standby, modern energy systems keep communities and industry moving. Explore how Barlo helps teams plan, deploy, and support critical infrastructure.",
		href: "/auth/signin",
		ctaLabel: "Full story",
		mediaClassName:
			"bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-950 bg-[length:100%_100%]",
	},
	{
		id: "platform",
		dateLabel: "Product",
		title: "One platform for operations and customer experience",
		description:
			"Unify dashboards, content, and commerce in a single Next.js stack. Ship faster with patterns your team already knows—without sacrificing polish or performance.",
		href: "/auth/signin",
		ctaLabel: "View overview",
		mediaClassName:
			"bg-gradient-to-tr from-stone-900 via-zinc-800 to-neutral-900 bg-[length:100%_100%]",
	},
	{
		id: "sustainability",
		dateLabel: "Company",
		title: "Built for teams who care about longevity",
		description:
			"Accessible defaults, maintainable components, and clear information architecture help products stay healthy as they scale—so you can focus on customers, not rework.",
		href: "/auth/signin",
		ctaLabel: "Learn more",
		mediaClassName:
			"bg-gradient-to-bl from-neutral-950 via-zinc-900 to-slate-950 bg-[length:100%_100%]",
	},
];
