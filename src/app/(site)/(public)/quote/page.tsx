import { Metadata } from "next";
import QuoteForm from "@/components/Common/QuoteForm";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getDbT } from "@/libs/getDbT";

export const metadata: Metadata = {
	title: `Request a Quote - ${process.env.SITE_NAME}`,
	description: "Request a quote for Cat equipment from Barloworld Mongolia.",
};

export default async function QuotePage({
	searchParams,
}: {
	searchParams: Promise<{ equipment?: string }>;
}) {
	const { equipment } = await searchParams;
	const t = await getDbT();

	const title = t("QuotePage.title", "Request a Quote");

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
						<h2 className='mb-4 text-2xl font-bold'>
							{t("QuotePage.heading", "Get a Quote")}
						</h2>
						<p className='mb-8 text-gray-600'>
							{t(
								"QuotePage.description",
								"Fill out the form below and our team will contact you shortly."
							)}
						</p>
						<QuoteForm
							defaultProduct={equipment ?? ""}
							labels={{
								firstName: t("QuoteForm.first_name", "First Name"),
								lastName: t("QuoteForm.last_name", "Last Name"),
								title: t("QuoteForm.title_label", "Title"),
								state: t("QuoteForm.state_label", "State / Region"),
								phone: t("QuoteForm.phone_label", "Phone Number"),
								email: t("QuoteForm.email_label", "Email"),
								product: t(
									"QuoteForm.product_label",
									"Equipment / Product Name"
								),
								message: t("QuoteForm.message_label", "Message"),
								submit: t("QuoteForm.submit_btn", "Submit Request"),
								submitting: t("QuoteForm.submitting", "Submitting..."),
								success: t(
									"QuoteForm.success",
									"Your quote request has been submitted!"
								),
								error: t(
									"QuoteForm.error",
									"Failed to submit. Please try again."
								),
							}}
						/>
					</main>
				</div>
			</article>
		</>
	);
}
