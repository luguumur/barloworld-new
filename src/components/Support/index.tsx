"use client";
import React from "react";
import Breadcrumbs from "../Common/Breadcrumbs";
import Image from "next/image";
import PageSidebar from "../Common/PageSidebar";
import ContactForm from "../Common/ContactForm";

const Support = () => {
	return (
		<article className='page-body container'>
			<div className='row'>
				<PageSidebar />
				<main className='page-content col-md-9'>
					<ContactForm />
					<p className='mb-8 text-gray-600'>
						*If you wish to be removed from receiving future communications, you
						can opt-out by texting STOP, QUIT, END, REVOKE, OPT-OUT, CANCEL, or
						UNSUBSCRIBE. Message and data rates may apply based on your mobile
						carrier’s plan. By opting into SMS communications from Thompson
						Machinery, you agree to receive recurring text messages regarding
						account updates, order notifications, delivery notifications, and
						general support.
					</p>
				</main>
			</div>
		</article>
	);
};

export default Support;
