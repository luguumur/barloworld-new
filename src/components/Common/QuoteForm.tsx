"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuoteRequestPublic } from "@/actions/quoteRequest";
import toast from "react-hot-toast";

type Labels = {
	firstName?: string;
	lastName?: string;
	title?: string;
	state?: string;
	phone?: string;
	email?: string;
	product?: string;
	message?: string;
	submit?: string;
	submitting?: string;
	success?: string;
	error?: string;
};

type Props = {
	defaultProduct?: string;
	labels?: Labels;
};

export default function QuoteForm({ defaultProduct = "", labels }: Props) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		title: "",
		contactState: "",
		phoneNumber: "",
		email: "",
		productName: defaultProduct,
		message: "",
	});

	const l = {
		firstName: labels?.firstName ?? "First Name",
		lastName: labels?.lastName ?? "Last Name",
		title: labels?.title ?? "Title",
		state: labels?.state ?? "State / Region",
		phone: labels?.phone ?? "Phone Number",
		email: labels?.email ?? "Email",
		product: labels?.product ?? "Equipment / Product Name",
		message: labels?.message ?? "Message",
		submit: labels?.submit ?? "Submit Request",
		submitting: labels?.submitting ?? "Submitting...",
		success: labels?.success ?? "Your quote request has been submitted!",
		error: labels?.error ?? "Failed to submit. Please try again.",
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createQuoteRequestPublic({
				firstName: form.firstName,
				lastName: form.lastName,
				title: form.title || null,
				contactState: form.contactState || null,
				phoneNumber: form.phoneNumber,
				email: form.email,
				productName: form.productName,
				message: form.message || null,
			});
			toast.success(l.success);
			router.push("/thank-you");
		} catch {
			toast.error(l.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<div className='row'>
				<div className='col-md-6 form-row'>
					<label htmlFor='firstName'>{l.firstName} *</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						value={form.firstName}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
				<div className='col-md-6 form-row'>
					<label htmlFor='lastName'>{l.lastName} *</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						value={form.lastName}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6 form-row'>
					<label htmlFor='title'>{l.title}</label>
					<input
						id='title'
						name='title'
						type='text'
						value={form.title}
						onChange={handleChange}
						placeholder='e.g. Procurement Manager'
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
				<div className='col-md-6 form-row'>
					<label htmlFor='contactState'>{l.state}</label>
					<input
						id='contactState'
						name='contactState'
						type='text'
						value={form.contactState}
						onChange={handleChange}
						placeholder='e.g. Ulaanbaatar'
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-6 form-row'>
					<label htmlFor='phoneNumber'>{l.phone} *</label>
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
					<label htmlFor='email'>{l.email} *</label>
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
				<div className='col-md-12 form-row'>
					<label htmlFor='productName'>{l.product} *</label>
					<input
						id='productName'
						name='productName'
						type='text'
						value={form.productName}
						onChange={handleChange}
						required
						className='wpcf7-form-control wpcf7-text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col-md-12 form-row'>
					<label htmlFor='message'>{l.message}</label>
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
						{loading ? l.submitting : l.submit}
					</button>
				</div>
			</div>
		</form>
	);
}
