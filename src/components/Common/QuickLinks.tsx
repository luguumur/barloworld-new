export type QuickLink = {
	href: string;
	icon: string;
	label: string;
};

type Props = {
	primary: QuickLink[];
	secondary?: QuickLink[];
};

export default function QuickLinks({ primary, secondary = [] }: Props) {
	return (
		<div className='quick-links quick-links__sidebar'>
			<div className='quick-links__topper accent black'>Quick Links</div>
			<div className='quick-links__primary'>
				{primary.map((link) => (
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
			{secondary.length > 0 && (
				<div className='quick-links__secondary'>
					{secondary.map((link) => (
						<a
							key={link.href}
							className='quick-link--secondary'
							href={link.href}
						>
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
			)}
		</div>
	);
}
