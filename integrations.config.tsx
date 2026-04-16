const integrations = {
	isSanityEnabled: true,
	isOpenAIEnabled: false,
	/** Set false to search PostgreSQL via /api/search (Prisma) instead of Algolia */
	isAlgoliaEnabled: false,
	/** When isAlgoliaEnabled is false, site search uses DATABASE_URL + Prisma */
	isDatabaseSearchEnabled: true,
	isMailchimpEnabled: false,
	isAuthEnabled: true,
	isPaymentsEnabled: false,
};

const messages = {
	sanity: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			Sanity is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
				target='_blank'
				rel='noopener noreferrer'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	payment: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			Payment is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
				target='_blank'
				rel='noopener noreferrer'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	openai: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			OpenAI is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	algolia: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			Algolia is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	mailchimp: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			Mailchimp is not enabled. Follow the {""}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	auth: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			Auth is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
	s3: (
		<div style={{ whiteSpace: "pre-wrap" }}>
			S3 is not enabled. Follow the{" "}
			<a
				href='https://docs.saasbold.com/integrations/enable-or-disable-integrations'
				className='text-primary underline'
				target='_blank'
				rel='noopener noreferrer'
			>
				documentation
			</a>{" "}
			to enable it.
		</div>
	),
};

export { integrations, messages };
