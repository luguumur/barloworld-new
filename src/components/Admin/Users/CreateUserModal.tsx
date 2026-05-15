"use client";
import { useState, useTransition } from "react";
import { createUserDirect } from "@/actions/user";
import { getAdminRoles } from "@/actions/adminRole";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BUILT_IN_ROLES = ["ADMIN"];

export default function CreateUserModal({
	onClose,
	customRoles,
}: {
	onClose: () => void;
	customRoles: { name: string; label: string; color: string }[];
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "USER",
	});
	const [showPassword, setShowPassword] = useState(false);

	const set =
		(k: keyof typeof form) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setForm((f) => ({ ...f, [k]: e.target.value }));

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		if (form.password.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}
		startTransition(async () => {
			try {
				await createUserDirect({
					name: form.name,
					email: form.email,
					password: form.password,
					role: form.role,
				});
				toast.success("User created successfully");
				router.refresh();
				onClose();
			} catch (err: any) {
				toast.error(err?.message ?? "Failed to create user");
			}
		});
	};

	const allRoles = [
		...BUILT_IN_ROLES.map((r) => ({ name: r, label: r })),
		...customRoles.map((r) => ({ name: r.name, label: r.label })),
	];

	return (
		<div className='fixed inset-0 z-[9999] flex items-center justify-center bg-dark/50 px-4'>
			<div className='shadow-2 w-full max-w-md rounded-10 bg-white p-8 dark:bg-gray-dark'>
				<div className='mb-6 flex items-center justify-between'>
					<h3 className='text-xl font-bold text-dark dark:text-white'>
						Create User
					</h3>
					<button
						onClick={onClose}
						className='text-body hover:text-dark dark:text-gray-4 dark:hover:text-white'
					>
						<svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
							<path
								d='M18 6L6 18M6 6l12 12'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='mb-1.5 block text-sm font-medium text-dark dark:text-white'>
							Full Name
						</label>
						<input
							required
							value={form.name}
							onChange={set("name")}
							placeholder='John Doe'
							className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white'
						/>
					</div>

					<div>
						<label className='mb-1.5 block text-sm font-medium text-dark dark:text-white'>
							Email
						</label>
						<input
							required
							type='email'
							value={form.email}
							onChange={set("email")}
							placeholder='user@example.com'
							className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white'
						/>
					</div>

					<div>
						<label className='mb-1.5 block text-sm font-medium text-dark dark:text-white'>
							Role
						</label>
						<select
							value={form.role}
							onChange={set("role")}
							className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white'
						>
							{allRoles.map((r) => (
								<option key={r.name} value={r.name}>
									{r.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className='mb-1.5 block text-sm font-medium text-dark dark:text-white'>
							Password
						</label>
						<div className='relative'>
							<input
								required
								type={showPassword ? "text" : "password"}
								value={form.password}
								onChange={set("password")}
								placeholder='Min. 8 characters'
								className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 pr-10 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white'
							/>
							<button
								type='button'
								onClick={() => setShowPassword((v) => !v)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-body dark:text-gray-4'
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>

					<div>
						<label className='mb-1.5 block text-sm font-medium text-dark dark:text-white'>
							Confirm Password
						</label>
						<input
							required
							type={showPassword ? "text" : "password"}
							value={form.confirmPassword}
							onChange={set("confirmPassword")}
							placeholder='Repeat password'
							className='w-full rounded-lg border border-stroke bg-gray-1 px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-white/5 dark:text-white'
						/>
					</div>

					<div className='flex gap-3 pt-2'>
						<button
							type='button'
							onClick={onClose}
							className='flex-1 rounded-lg border border-stroke py-3 text-sm font-medium text-dark hover:bg-gray-1 dark:border-dark-3 dark:text-white dark:hover:bg-white/5'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isPending}
							className='flex-1 rounded-lg bg-primary py-3 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60'
						>
							{isPending ? "Creating…" : "Create User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
