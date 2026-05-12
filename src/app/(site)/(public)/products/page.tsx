import { cookies } from "next/headers";
import { getProductTypesPublic } from "@/lib/productTypePublic";
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
				<div className='flexible-image-cards-header' />
				<div className='flexible-image-cards-listing'>
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

			{/* <div className='mx-auto container px-4 py-12 sm:px-8 xl:px-0'>
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
