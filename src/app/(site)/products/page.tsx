import { cookies } from "next/headers";
import { getProductTypesPublic } from "@/lib/productTypePublic";
import GridCard from "@/components/Products/GridCard";
import ProductPageHeader from "@/components/Products/ProductPageHeader";

export const revalidate = 0;

export const metadata = {
	title: "Products | Barloworld Mongolia",
};

interface QuickLink {
	href: string;
	icon: string;
	label: string;
	variant: "primary" | "secondary";
}

interface ImageCard {
	href: string;
	image: string;
	alt: string;
	title: string;
}

interface EquipmentSection {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface Benefit {
	label: string;
	description: string;
}

interface FAQItem {
	question: string;
	answer: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const quickLinksPrimary: QuickLink[] = [
	{
		href: "https://thompsonmachinery.com/new/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-equipment.png",
		label: "Find equipment",
		variant: "primary",
	},
	{
		href: "https://thompsonmachinery.com/contact-us/locations/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-location.png",
		label: "Find location",
		variant: "primary",
	},
	{
		href: "https://thompsonmachinery.com/contact-us/find-a-rep/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-call.png",
		label: "Find a rep",
		variant: "primary",
	},
];

const quickLinksSecondary: QuickLink[] = [
	{
		href: "https://thompsonmachinery.com/operator-training/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-safety.png",
		label: "Safety & training",
		variant: "secondary",
	},
	{
		href: "https://thompsonmachinery.com/service/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-service.png",
		label: "Service & maintenance",
		variant: "secondary",
	},
	{
		href: "https://thompsonmachinery.com/new-account-application/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-credit.png",
		label: "Credit application",
		variant: "secondary",
	},
	{
		href: "https://thompsonmachinery.com/thompson-careers/",
		icon: "https://thompsonmachinery.com/content/uploads/2016/12/icon-career.png",
		label: "Careers",
		variant: "secondary",
	},
];

const imageCards: ImageCard[] = [
	{
		href: "/new/cat-machines/",
		image:
			"https://thompsonmachinery.com/content/uploads/2015/08/menu-cat-machines.jpg",
		alt: "Cat Equipment",
		title: "Cat Equipment",
	},
	{
		href: "/new/tes/",
		image:
			"https://thompsonmachinery.com/content/uploads/2015/08/menu-power-systems.jpg",
		alt: "Power Systems",
		title: "Power Systems",
	},
	{
		href: "/new/sitech-construction-technology/",
		image:
			"https://thompsonmachinery.com/content/uploads/2015/08/menu-sitech.jpg",
		alt: "SITECH Construction Technology",
		title: "SITECH Construction Technology",
	},
	{
		href: "/new/weiler-paving-equipment/",
		image:
			"https://thompsonmachinery.com/content/uploads/2015/08/menu-weiler-paving.jpg",
		alt: "Weiler Paving Equipment",
		title: "Weiler Paving Equipment",
	},
	{
		href: "https://thompsonmachinery.com/new/work-tools-attachments/",
		image:
			"https://thompsonmachinery.com/content/uploads/2015/08/menu-work-tools-attachments.jpg",
		alt: "Work Tools/Attachments",
		title: "Work Tools/Attachments",
	},
];

const equipmentSections: EquipmentSection[] = [
	{
		id: "cat-equipment",
		title: "Cat® Equipment",
		content: (
			<p>
				We remain leaders in the market for new Cat equipment. We can assess
				your project needs and provide a durable and reliable equipment solution
				that fits the job. Our experts will help you find a model with the
				performance, capacities, capabilities, dimensions and features to suit
				your industry and project requirements.{" "}
				<a href='https://thompsonmachinery.com/new/cat-machines/'>
					Browse our full lineup.
				</a>
			</p>
		),
	},
	{
		id: "power-systems",
		title: "Power Systems",
		content: (
			<>
				<p>
					Our new equipment inventory also includes brand-new{" "}
					<a href='https://thompsonmachinery.com/new-equipment/tes/electric-power/'>
						power systems for engines and generators
					</a>
					. We carry diesel power and natural gas mobile generators to support
					your project efforts. Our team can also help you use the generators
					for emergency planning and disaster preparedness assistance.
				</p>
				<p>Our selection includes:</p>
				<ul>
					<li>Diesel gen sets</li>
					<li>Gas gen sets</li>
					<li>Mobile gen sets</li>
					<li>Industrial power systems</li>
					<li>Marine power systems</li>
					<li>Oil and gas power systems</li>
				</ul>
			</>
		),
	},
	{
		id: "sitech",
		title: "SITECH® Construction Technology",
		content: (
			<>
				<p>
					SITECH® is an authorized dealer for{" "}
					<a href='https://thompsonmachinery.com/new/sitech-construction-technology/'>
						several heavy and highway construction
					</a>{" "}
					products and services. Thompson Machinery can provide:
				</p>
				<ul>
					<li>Machine control</li>
					<li>Paving control</li>
					<li>Site positioning</li>
					<li>Software solutions</li>
					<li>Drone services</li>
					<li>Fleet and asset management</li>
				</ul>
			</>
		),
	},
	{
		id: "weiler",
		title: "Weiler Paving Equipment",
		content: (
			<>
				<p>
					Weiler has many{" "}
					<a href='https://thompsonmachinery.com/new/weiler-paving-equipment/'>
						durable and reliable road equipment products
					</a>{" "}
					for the most demanding road jobs. They base their products on the
					needs and challenges of actual contractors on their job sites. We
					offer their machines to help you optimize your productivity, with
					options like:
				</p>
				<ul>
					<li>Remixing transfer vehicles</li>
					<li>Commercial pavers</li>
					<li>Road wideners</li>
					<li>Window elevators</li>
					<li>Screeds</li>
					<li>Tack distributors</li>
				</ul>
			</>
		),
	},
	{
		id: "work-tools",
		title: "Work Tools and Attachments",
		content: (
			<p>
				If you already own Cat equipment, Thompson Machinery offers a{" "}
				<a href='https://thompsonmachinery.com/new/work-tools-attachments/'>
					wide assortment of new attachments
				</a>{" "}
				to enhance your machine&apos;s performance. Anything your fleet needs,
				we are sure to have it.{" "}
				<a href='https://thompsonmachinery.com/new/work-tools-attachments/'>
					Browse all available attachments.
				</a>
			</p>
		),
	},
];

const benefits: Benefit[] = [
	{
		label: "Productivity",
		description:
			"When your equipment is brand new, it will work well, allowing you to complete jobs faster and increasing your overall productivity.",
	},
	{
		label: "Savings",
		description:
			"While regular inspections are recommended, buying new will require less maintenance and save you from larger breakdown fees.",
	},
	{
		label: "Dependability",
		description:
			"New equipment means you know exactly where it came from, providing peace of mind that it will be fully functional from day one.",
	},
	{
		label: "Technology",
		description:
			"Because heavy equipment continues to evolve, purchasing new machines provides your company with the most advanced technology available.",
	},
];

const faqItems: FAQItem[] = [
	{
		question:
			"What factors should businesses consider when investing in heavy equipment?",
		answer:
			"Think about the equipment's cost, how well it fits your specific jobs, and how reliable it will be. Consider factors like fuel efficiency, maintenance needs, and the availability of support. Thompson Machinery can help you evaluate these factors and find the best equipment for your business.",
	},
	{
		question: "How can new equipment improve efficiency and reduce costs?",
		answer:
			"New equipment boosts productivity with faster cycle times, better fuel efficiency, and fewer repairs. Modern tech and attachments also improve precision and cut costs. Thompson Machinery can help you find the right Cat machine or attachment to maximize your job's productivity and savings.",
	},
	{
		question:
			"What are the benefits of buying new construction equipment versus used?",
		answer:
			"New construction equipment offers increased productivity due to its optimal functionality, leading to faster job completion. While requiring regular inspections, new equipment reduces maintenance needs and breakdown costs, ensuring dependability from day one.",
	},
	{
		question:
			"How do I determine the right size and capacity of equipment for my needs?",
		answer:
			"To pick the right equipment size, think about your project's needs: the job site, the amount of material, and your timeline. Getting advice from equipment professionals can really help. Thompson Machinery's team can assess your project and find a reliable equipment solution that fits the bill.",
	},
	{
		question:
			"What are the benefits of preventative maintenance for new equipment?",
		answer:
			"Preventative maintenance for new equipment ensures optimal performance and longevity. Regular inspections and servicing can identify minor issues before they escalate, preventing costly downtime and repairs. Thompson Machinery offers comprehensive service and maintenance plans to keep your new equipment running smoothly.",
	},
	{
		question:
			"What are the safety considerations when operating new heavy equipment?",
		answer:
			"Operating new heavy equipment requires strict adherence to safety protocols to prevent accidents and injuries. Key considerations include proper training, regular equipment inspections, and maintaining awareness of the surrounding environment. Thompson Machinery provides safety and training resources to ensure operators are well-prepared to handle new equipment safely.",
	},
	{
		question:
			"What are the long-term ownership costs associated with new equipment?",
		answer:
			"Long-term ownership costs for new equipment include fuel, maintenance, insurance, and potential repairs. While new equipment typically has lower initial maintenance needs, planning for these expenses is crucial for accurate budgeting and forecasting.",
	},
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function QuickLinks() {
	return (
		<div className='quick-links quick-links__sidebar'>
			<div className='quick-links__topper accent black'>Quick Links</div>
			<div className='quick-links__primary'>
				{quickLinksPrimary.map((link) => (
					<a key={link.href} className='quick-link--primary' href={link.href}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							width={35}
							height={24}
							className='quick-link--primary__icon'
							src={link.icon}
							alt={link.label}
						/>
						<span>{link.label}</span>
					</a>
				))}
			</div>
			<div className='quick-links__secondary'>
				{quickLinksSecondary.map((link) => (
					<a key={link.href} className='quick-link--secondary' href={link.href}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							width={35}
							height={24}
							className='quick-link--secondary__icon'
							src={link.icon}
							alt={link.label}
						/>
						<span>{link.label}</span>
					</a>
				))}
			</div>
		</div>
	);
}

function ContactForm() {
	return (
		<div className='widget widget_black_studio_tinymce'>
			<h6 className='heading-title accent'>
				<b>Contact us Today</b> <span>to Get a Quote</span>
			</h6>
			<div className='textwidget'>
				<a
					className='button button--secondary button--block'
					href='tel:8002283644'
				>
					800.228.3644
				</a>
				<form
					action='/new/#contact-form'
					method='post'
					className='wpcf7-form'
					aria-label='Contact form'
					noValidate
				>
					<div className='row'>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='your-name'>Your Name*</label>
							<input
								id='your-name'
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-text'
								aria-required='true'
								type='text'
								name='your-name'
								required
							/>
						</div>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='email'>Email*</label>
							<input
								id='email'
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-email'
								aria-required='true'
								type='email'
								name='email'
								required
							/>
						</div>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='phone'>Phone*</label>
							<input
								id='phone'
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-tel'
								aria-required='true'
								type='tel'
								name='phone'
								required
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12 form-row'>
							<label htmlFor='message'>Message</label>
							<textarea
								id='message'
								cols={40}
								rows={10}
								maxLength={2000}
								className='wpcf7-form-control wpcf7-textarea textarea-short'
								name='message'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-6 col-md-12 form-row'>
							<button
								className='button button--primary button--block'
								type='submit'
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

function Sidebar() {
	return (
		<aside className='page-sidebar page-rental-sidebar col-md-3'>
			<QuickLinks />
			<ContactForm />
		</aside>
	);
}

function ImageCards() {
	return (
		<section className='flexible-image-cards'>
			<div className='container'>
				<div className='flexible-image-cards-listing'>
					<div className='row'>
						{imageCards.map((card) => (
							<div key={card.href} className='col-sm-6'>
								<div className='image-cards-box'>
									<a href={card.href}>
										<div className='card-image'>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												width={600}
												height={500}
												src={card.image}
												className='img-responsive'
												alt={card.alt}
											/>
										</div>
										<div className='image-card-content'>
											<div className='image-card-btn'>
												<span className='image-card-btn-text'>Learn More</span>
												<div className='image-card-btn-clippy'>
													<span className='icon-right' />
												</div>
											</div>
											<h3>{card.title}</h3>
										</div>
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function VideoEmbed() {
	return (
		<p style={{ textAlign: "center" }}>
			<iframe
				src='https://www.youtube.com/embed/z7QayFBIdTo'
				width={840}
				height={473}
				frameBorder={0}
				allowFullScreen
				title='Cat® - Growing More Than A Business'
			/>
		</p>
	);
}

function EquipmentSections() {
	return (
		<>
			{equipmentSections.map((section) => (
				<div key={section.id} id={section.id}>
					<h3>{section.title}</h3>
					{section.content}
				</div>
			))}
		</>
	);
}

function Benefits() {
	return (
		<>
			<h2>Benefits of Purchasing New Cat Equipment</h2>
			<p>
				You may be on the fence about purchasing new Cat equipment. At Thompson
				Machinery, we can provide you with the right equipment for the job,
				helping enhance:
			</p>
			<ul>
				{benefits.map((benefit) => (
					<li key={benefit.label}>
						<strong>{benefit.label}:</strong> {benefit.description}
					</li>
				))}
			</ul>
		</>
	);
}

function FAQ() {
	return (
		<section className='tm-faqs' aria-labelledby='tm-faqs-heading'>
			<h2 id='tm-faqs-heading'>Frequently Asked Questions</h2>
			{faqItems.map((item) => (
				<details key={item.question} className='tm-faq-item'>
					<summary className='tm-faq-question'>{item.question}</summary>
					<div className='tm-faq-answer'>
						<p>{item.answer}</p>
					</div>
				</details>
			))}
		</section>
	);
}

function MainContent() {
	return (
		<main className='page-content col-md-9'>
			<h2>New Equipment for Sale</h2>
			<p>
				If you want to invest in productivity and efficiency, Thompson Machinery
				has a vast selection of new heavy construction equipment from Cat®. We
				offer one of the most extensive collections in the industry to assist
				you with any job, large or small.
			</p>
			<p>
				Thompson Machinery offers the full line of Cat products, which contains
				over 300 pieces of equipment. Take a closer look at the products we
				offer below.
			</p>
			<p>
				<a
					className='button button--primary'
					href='https://thompsonmachinery.com/contact-us/'
				>
					Contact Us For More Info
				</a>
			</p>

			<ImageCards />
			<VideoEmbed />
			<EquipmentSections />

			<h2>Check Out Our Extensive Selection of New Heavy Equipment</h2>
			<p>
				The Thompson Machinery team works hard to find the right equipment for
				the most rugged environments. Regardless of your industry or
				site-specific needs, we have options that can improve your operations.
				Browse our large collection of new products or{" "}
				<a href='https://thompsonmachinery.com/contact-us/'>
					contact us for more information
				</a>{" "}
				today.
			</p>
			<p>
				<a
					className='button button--primary'
					href='https://thompsonmachinery.com/contact-us/'
				>
					Contact Us For More Info
				</a>
			</p>

			<Benefits />
			<FAQ />
		</main>
	);
}

export default async function ProductTypesPage() {
	const cookieStore = cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";

	const types = await getProductTypesPublic();

	return (
		<>
			<ProductPageHeader
				title='Cat Equipment'
				breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
			/>

			{/* <div className='mx-auto max-w-[1170px] px-4 py-12 sm:px-8 xl:px-0'>
				{types.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-24 text-center'>
						<span className='mb-4 font-satoshi text-6xl font-black text-primary opacity-20'>
							CAT
						</span>
						<p className='text-gray-5'>No product categories available yet.</p>
					</div>
				) : (
					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{types.map((type) => (
							<GridCard
								key={type.id}
								href={`/products/${type.id}`}
								name={lang === "mn" ? type.name : type.name_en}
								imgPath={type.img_path}
							/>
						))}
					</div>
				)}
			</div> */}
			<article className='page-body container'>
				<div className='row'>
					<Sidebar />
					<MainContent />
				</div>
			</article>
		</>
	);
}
