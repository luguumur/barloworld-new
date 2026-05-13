"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createContactRequestPublic } from "@/actions/contactRequest";

type Props = {
	defaultProduct?: string;
};

export default function ContactForm({ defaultProduct = "" }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: "",
		subject: "",
		phoneNumber: "",
		email: "",
		productName: defaultProduct,
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createContactRequestPublic({
				name: form.name,
				subject: form.subject || null,
				phoneNumber: form.phoneNumber,
				email: form.email,
				message: form.message || null,
			});
			toast.success("Your contact request has been submitted!");
			router.push("/thank-you");
		} catch {
			toast.error("Failed to submit. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className='row'>
				<div className='col-md-6 form-row'>
					<label htmlFor='name'>Name *</label>
					<input
						id='name'
						name='name'
						type='text'
						value={form.name}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
				<div className='col-md-6 form-row'>
					<label htmlFor='email'>Email *</label>
					<input
						id='email'
						name='email'
						type='email'
						value={form.email}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-email'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6 form-row'>
					<label htmlFor='phoneNumber'>Phone Number *</label>
					<input
						id='phoneNumber'
						name='phoneNumber'
						type='tel'
						value={form.phoneNumber}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-tel'
					/>
				</div>
				<div className='col-md-6 form-row'>
					<label htmlFor='subject'>Subject</label>
					<input
						id='subject'
						name='subject'
						type='text'
						value={form.subject}
						onChange={handleChange}
						placeholder='e.g. Ulaanbaatar'
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12 form-row'>
					<label htmlFor='message'>Message</label>
					<textarea
						id='message'
						name='message'
						rows={6}
						value={form.message}
						onChange={handleChange}
						className='wpcf7-form-control wpcf7-textarea'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12 form-row'>
					<button
						type='submit'
						disabled={loading}
						className='btn btn-primary btn-block w-full disabled:opacity-60'
					>
						{loading ? "Submitting..." : "Submit Request"}
					</button>
				</div>
			</div>
		</form>
	);
}
