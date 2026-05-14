export default function FormButton({ height, children }: any) {
	return (
		<button
			type='submit'
			className='btn btn-secondary w-full text-center'
			style={{ height: height }}
		>
			{children}
		</button>
	);
}
