type Props = {
	phone?: string;
};

export default function ContactSidebarForm({ phone = "+97670187588" }: Props) {
	return (
		<div className='widget widget_black_studio_tinymce'>
			<h6 className='heading-title accent'>
				<b>Contact us Today</b> <span>to Get a Quote</span>
			</h6>
			<div className='textwidget'>
				<a
					className='btn btn-secondary btn-block mb-8'
					href={`tel:${phone.replace(/\s/g, "")}`}
				>
					{phone}
				</a>
				<form
					action='/contact-us/#contact-form'
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
								className='btn btn-primary btn-block mb-8 w-full'
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
