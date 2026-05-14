import { cookies } from "next/headers";
import React from "react";
import PageSidebar from "../Common/PageSidebar";
import ContactForm from "../Common/ContactForm";
import ProductPageHeader from "../Products/ProductPageHeader";

const Support = async () => {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const isMn = lang === "mn";
	return (
		<>
			<ProductPageHeader
				title={isMn ? "Холбоо барих" : "Contact Us"}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: isMn ? "Холбоо барих" : "Contact Us" },
				]}
				// backgroundImage='/images/content/contact-header.jpg'
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<ContactForm />
						<p className='mb-8 text-gray-600'>
							*If you wish to be removed from receiving future communications,
							you can opt-out by texting STOP, QUIT, END, REVOKE, OPT-OUT,
							CANCEL, or UNSUBSCRIBE. Message and data rates may apply based on
							your mobile carrier’s plan. By opting into SMS communications from
							Thompson Machinery, you agree to receive recurring text messages
							regarding account updates, order notifications, delivery
							notifications, and general support.
						</p>
					</main>
				</div>
			</article>
		</>
	);
};

export default Support;
