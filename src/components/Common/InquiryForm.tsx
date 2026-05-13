"use client";
import { useState } from "react";
import { createNotificationPublic } from "@/actions/notification";
import toast from "react-hot-toast";

export default function InquiryForm() {
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		title: "",
		message: "",
		senderName: "",
		senderEmail: "",
		senderPhone: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.title.trim() || !form.message.trim()) {
			toast.error("Subject and message are required");
			return;
		}
		setLoading(true);
		try {
			await createNotificationPublic({
				title: form.title,
				message: form.message,
				senderName: form.senderName || null,
				senderEmail: form.senderEmail || null,
				senderPhone: form.senderPhone || null,
			});
			toast.success("Your inquiry has been sent!");
			setForm({
				title: "",
				message: "",
				senderName: "",
				senderEmail: "",
				senderPhone: "",
			});
		} catch {
			toast.error("Failed to send inquiry. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
			<div className='grid gap-4 sm:grid-cols-2'>
				<div>
					<label className='mb-1 block text-sm font-medium text-dark dark:text-white'>
						Your name
					</label>
					<input
						type='text'
						name='senderName'
						value={form.senderName}
						onChange={handleChange}
						placeholder='John Doe'
						className='h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:placeholder-gray-5 dark:focus:border-transparent'
					/>
				</div>
				<div>
					<label className='mb-1 block text-sm font-medium text-dark dark:text-white'>
						Phone number
					</label>
					<input
						type='tel'
						name='senderPhone'
						value={form.senderPhone}
						onChange={handleChange}
						placeholder='+976 9999 9999'
						className='h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:placeholder-gray-5 dark:focus:border-transparent'
					/>
				</div>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium text-dark dark:text-white'>
					Email
				</label>
				<input
					type='email'
					name='senderEmail'
					value={form.senderEmail}
					onChange={handleChange}
					placeholder='you@example.com'
					className='h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:placeholder-gray-5 dark:focus:border-transparent'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium text-dark dark:text-white'>
					Subject <span className='text-red'>*</span>
				</label>
				<input
					type='text'
					name='title'
					value={form.title}
					onChange={handleChange}
					placeholder='What is your inquiry about?'
					required
					className='h-11 w-full rounded-lg border border-stroke bg-gray-1 px-4 outline-none duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:placeholder-gray-5 dark:focus:border-transparent'
				/>
			</div>

			<div>
				<label className='mb-1 block text-sm font-medium text-dark dark:text-white'>
					Message <span className='text-red'>*</span>
				</label>
				<textarea
					name='message'
					value={form.message}
					onChange={handleChange}
					rows={5}
					placeholder='Write your message here...'
					required
					className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 outline-none duration-300 focus:shadow-input focus:ring-2 focus:ring-primary/20 dark:border-stroke-dark dark:bg-white/5 dark:text-white dark:placeholder-gray-5 dark:focus:border-transparent'
				/>
			</div>

			<button
				type='submit'
				disabled={loading}
				className='flex h-12 items-center justify-center rounded-lg bg-primary px-8 font-medium text-white duration-300 hover:bg-primary-dark disabled:opacity-60'
			>
				{loading ? "Sending..." : "Send Inquiry"}
			</button>
		</form>
	);
}
