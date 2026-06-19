import { cookies } from "next/headers";
import React from "react";
import PageSidebar from "../Common/PageSidebar";
import ContactForm from "../Common/ContactForm";
import ProductPageHeader from "../Products/ProductPageHeader";
import { getDbT } from "@/libs/getDbT";

const Support = async () => {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const isMn = lang === "mn";
	const t = await getDbT();

	const title = t("Support.title", isMn ? "Холбоо барих" : "Contact Us");
	const disclaimer = t(
		"Support.sms_disclaimer",
		"*If you wish to be removed from receiving future communications, you can opt-out by texting STOP, QUIT, END, REVOKE, OPT-OUT, CANCEL, or UNSUBSCRIBE."
	);

	return (
		<>
			<ProductPageHeader
				title={title}
				breadcrumbs={[
					{ label: t("Common.home", "Home"), href: "/" },
					{ label: title },
				]}
			/>
			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />
					<main className='page-content col-md-9'>
						<ContactForm
							labels={{
								name: t("ContactForm.name_label", "Name"),
								email: t("ContactForm.email_label", "Email"),
								phone: t("ContactForm.phone_label", "Phone Number"),
								subject: t("ContactForm.subject_label", "Subject"),
								message: t("ContactForm.message_label", "Message"),
								submit: t("ContactForm.submit_btn", "Submit Request"),
								submitting: t("ContactForm.submitting", "Submitting..."),
								success: t(
									"ContactForm.success",
									"Your contact request has been submitted!"
								),
								error: t(
									"ContactForm.error",
									"Failed to submit. Please try again."
								),
							}}
						/>
						<p className='mb-8 text-gray-600'>{disclaimer}</p>
					</main>
				</div>
			</article>
		</>
	);
};

export default Support;
