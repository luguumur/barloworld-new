import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

type Props = {
	title: string;
	breadcrumbs: BreadcrumbItem[];
	backgroundImage?: string | null;
	subtitle?: string;
};

export default function ProductPageHeader({
	title,
	breadcrumbs,
	backgroundImage,
	subtitle,
}: Props) {
	const bgImg = backgroundImage ?? "/images/content/cta-banner-image.jpg";

	return (
		<header className='masthead text--center clearfix font-noto'>
			<div className='masthead-background'>
				<h1 className='text-6xl font-bold text-white'>{title}</h1>
				<div className='masthead-dark-overlay'>
					<img
						width={589}
						height={336}
						className='masthead-overlay-left entered lazyloaded'
						src='/images/content/masthead-graphic-left.png'
						alt=''
					/>
					<img
						width={588}
						height={336}
						className='masthead-overlay-right entered lazyloaded'
						src='/images/content/masthead-graphic-right.png'
						alt=''
					/>
					<span className='masthead-overlay-color' />
				</div>
				<img
					width={1920}
					height={382}
					className='masthead-background-image entered lazyloaded'
					src={bgImg}
					alt=''
				/>
			</div>

			<div className='breadcrumbs hidden-xxs hidden-xs'>
				<div className='container'>
					<span>
						{breadcrumbs.map((item, i) => (
							<span key={i}>
								{i > 0 && <span className='separator' />}
								{item.href ? (
									<span>
										<Link href={item.href}>{item.label}</Link>
									</span>
								) : (
									<span className='breadcrumb_last' aria-current='page'>
										{item.label}
									</span>
								)}
							</span>
						))}
					</span>
				</div>
			</div>

			{subtitle && (
				<div
					className='container'
					style={{ paddingTop: "0.75rem", paddingBottom: "0.5rem" }}
				>
					<p className='text-sm text-gray-5'>{subtitle}</p>
				</div>
			)}
		</header>
	);
}
