type Props = { className?: string };

export default function ImagePlaceholderSvg({ className }: Props) {
	return (
		<svg
			className={className}
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			aria-hidden
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={1.5}
				d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14'
			/>
		</svg>
	);
}
