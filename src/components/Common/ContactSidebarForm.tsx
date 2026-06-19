"use client";
import { useState } from "react";
import { createNotificationPublic } from "@/actions/notification";
import toast from "react-hot-toast";

type Labels = {
	title?: string;
	titleAccent?: string;
	name?: string;
	email?: string;
	phone?: string;
	message?: string;
	submit?: string;
	submitting?: string;
	success?: string;
	error?: string;
	requiredError?: string;
};

type Props = {
	phone?: string;
	labels?: Labels;
};

export default function ContactSidebarForm({
	phone = "+97670187588",
	labels,
}: Props) {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const l = {
		title: labels?.title ?? "Contact us Today",
		titleAccent: labels?.titleAccent ?? "to Get a Quote",
		name: labels?.name ?? "Your Name",
		email: labels?.email ?? "Email",
		phone: labels?.phone ?? "Phone",
		message: labels?.message ?? "Message",
		submit: labels?.submit ?? "Submit",
		submitting: labels?.submitting ?? "Sending...",
		success: labels?.success ?? "Your request has been sent!",
		error: labels?.error ?? "Failed to send. Please try again.",
		requiredError: labels?.requiredError ?? "Name and phone are required",
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.name.trim() || !form.phone.trim()) {
			toast.error(l.requiredError);
			return;
		}
		setLoading(true);
		try {
			await createNotificationPublic({
				title: `Contact request from ${form.name.trim()}`,
				message: form.message.trim() || "(no message)",
				senderName: form.name.trim(),
				senderEmail: form.email.trim() || null,
				senderPhone: form.phone.trim(),
			});
			toast.success(l.success);
			setForm({ name: "", email: "", phone: "", message: "" });
		} catch {
			toast.error(l.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='widget widget_black_studio_tinymce'>
			<h6 className='heading-title accent'>
				<b>{l.title}</b> <span>{l.titleAccent}</span>
			</h6>
			<div className='textwidget'>
				<a
					className='btn btn-secondary btn-block mb-8'
					href={`tel:${phone.replace(/\s/g, "")}`}
				>
					{phone}
				</a>
				<form
					onSubmit={handleSubmit}
					className='wpcf7-form'
					aria-label='Contact form'
					noValidate
				>
					<div className='row'>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='your-name'>{l.name}*</label>
							<input
								id='your-name'
								name='name'
								value={form.name}
								onChange={handleChange}
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-text'
								aria-required='true'
								type='text'
								required
							/>
						</div>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='email'>{l.email}</label>
							<input
								id='email'
								name='email'
								value={form.email}
								onChange={handleChange}
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-email'
								type='email'
							/>
						</div>
						<div className='col-xs-6 col-md-12 form-row'>
							<label htmlFor='phone'>{l.phone}*</label>
							<input
								id='phone'
								name='phone'
								value={form.phone}
								onChange={handleChange}
								size={40}
								maxLength={400}
								className='wpcf7-form-control wpcf7-tel'
								aria-required='true'
								type='tel'
								required
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-12 form-row'>
							<label htmlFor='message'>{l.message}</label>
							<textarea
								id='message'
								name='message'
								value={form.message}
								onChange={handleChange}
								cols={40}
								rows={10}
								maxLength={2000}
								className='wpcf7-form-control wpcf7-textarea textarea-short'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-xs-6 col-md-12 form-row'>
							<button
								className='btn btn-primary btn-block mb-8 w-full disabled:opacity-60'
								type='submit'
								disabled={loading}
							>
								{loading ? l.submitting : l.submit}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
