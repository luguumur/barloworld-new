"use client";
import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
	const [visible, setVisible] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!localStorage.getItem(STORAGE_KEY)) {
			setVisible(true);
			// small delay so the initial translate-y-full is painted before we transition
			setTimeout(() => setMounted(true), 50);
		}
	}, []);

	// close drawer on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
				setDrawerOpen(false);
			}
		};
		if (drawerOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [drawerOpen]);

	// close drawer on Escape
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setDrawerOpen(false);
		};
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, []);

	const accept = () => {
		localStorage.setItem(STORAGE_KEY, "accepted");
		setVisible(false);
		setDrawerOpen(false);
	};

	const decline = () => {
		localStorage.setItem(STORAGE_KEY, "necessary");
		setVisible(false);
		setDrawerOpen(false);
	};

	if (!visible) return null;

	return (
		<>
			{/* ── Banner ── */}
			<div
				className={`fixed bottom-0 left-0 right-0 z-[9998] border-t border-[#e0e0e0] bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.10)] transition-transform duration-500 ease-out ${
					mounted ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<div className='container mx-auto px-4 py-5 md:px-8'>
					<div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
						<p className='max-w-3xl text-sm leading-relaxed text-[#333]'>
							This site uses cookies to create a better experience for you. Some
							of these cookies are set automatically because they&apos;re
							necessary for the site to perform. Other cookies are used for
							functional, performance, and targeting purposes to enhance your
							experience.{" "}
							<button
								onClick={() => setDrawerOpen(true)}
								className='text-[#ffbe00] underline hover:no-underline'
							>
								Learn more
							</button>
							.
						</p>
						<div className='flex shrink-0 flex-wrap gap-3'>
							<button
								onClick={accept}
								className='rounded bg-[#ffbe00] px-6 py-2.5 text-sm font-semibold text-black transition hover:brightness-95'
							>
								I Accept
							</button>
							<button
								onClick={() => setDrawerOpen(true)}
								className='rounded border border-[#ccc] bg-white px-6 py-2.5 text-sm font-semibold text-[#333] transition hover:bg-gray-100'
							>
								Cookie Settings
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* ── Drawer ── */}
			<div
				className={`fixed inset-0 z-[9999] flex justify-end transition-all duration-300 ${
					drawerOpen ? "visible" : "invisible"
				}`}
			>
				{/* backdrop */}
				<div
					className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
						drawerOpen ? "opacity-100" : "opacity-0"
					}`}
				/>

				{/* panel */}
				<div
					ref={drawerRef}
					className={`relative flex h-full w-full max-w-[460px] flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
						drawerOpen ? "translate-x-0" : "translate-x-full"
					}`}
				>
					{/* header */}
					<div className='flex items-center justify-between border-b border-[#e0e0e0] px-6 py-4'>
						<h2 className='text-lg font-bold text-[#333]'>Cookie Settings</h2>
						<button
							onClick={() => setDrawerOpen(false)}
							className='flex h-8 w-8 items-center justify-center rounded-full text-[#666] hover:bg-gray-100'
						>
							<svg
								width='16'
								height='16'
								viewBox='0 0 20 20'
								fill='currentColor'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M11.008 10.5l3.784-3.783c.275-.275.275-.734 0-1.009-.275-.275-.733-.275-1.008 0L10 9.492 6.216 5.708c-.275-.275-.733-.275-1.008 0-.275.275-.275.734 0 1.009L8.992 10.5 5.208 14.283c-.275.275-.275.733 0 1.008.275.275.733.275 1.008 0L10 11.508l3.784 3.783c.275.275.733.275 1.008 0 .275-.275.275-.733 0-1.008L11.008 10.5z'
								/>
							</svg>
						</button>
					</div>

					{/* body */}
					<div className='flex-1 overflow-y-auto px-6 py-6'>
						<p className='mb-6 text-sm leading-relaxed text-[#555]'>
							By clicking &quot;I Accept&quot;, you are agreeing to our use of
							functional, performance and targeting cookies. To learn more,
							select &quot;Cookie Settings&quot; below.
						</p>

						<div className='space-y-4'>
							{/* Strictly Necessary */}
							<div className='rounded border border-[#eee] p-4'>
								<div className='mb-1 flex items-center justify-between'>
									<p className='font-semibold text-[#333]'>
										Strictly Necessary
									</p>
									<span className='rounded-full bg-[#ffbe00]/20 px-2.5 py-0.5 text-xs font-semibold text-[#b38900]'>
										Always on
									</span>
								</div>
								<p className='text-xs leading-relaxed text-[#666]'>
									These cookies are required for the website to function and
									cannot be switched off. They are set in response to actions
									made by you, such as setting privacy preferences, logging in,
									or filling in forms.
								</p>
							</div>

							{/* Functional & Performance */}
							<div className='rounded border border-[#eee] p-4'>
								<div className='mb-1 flex items-center justify-between'>
									<p className='font-semibold text-[#333]'>
										Functional &amp; Performance
									</p>
								</div>
								<p className='text-xs leading-relaxed text-[#666]'>
									These cookies allow us to count visits and traffic sources so
									we can measure and improve site performance. They help us know
									which pages are the most and least popular and see how
									visitors move around the site.
								</p>
							</div>

							{/* Targeting */}
							<div className='rounded border border-[#eee] p-4'>
								<div className='mb-1 flex items-center justify-between'>
									<p className='font-semibold text-[#333]'>Targeting</p>
								</div>
								<p className='text-xs leading-relaxed text-[#666]'>
									These cookies may be set through our site by our advertising
									partners. They may be used to build a profile of your
									interests and show you relevant adverts on other sites.
								</p>
							</div>
						</div>
					</div>

					{/* footer */}
					<div className='border-t border-[#e0e0e0] px-6 py-4'>
						<div className='flex flex-col gap-3'>
							<button
								onClick={accept}
								className='w-full rounded bg-[#ffbe00] py-3 text-sm font-semibold text-black transition hover:brightness-95'
							>
								Accept All Cookies
							</button>
							<button
								onClick={decline}
								className='w-full rounded border border-[#ccc] bg-white py-3 text-sm font-semibold text-[#333] transition hover:bg-gray-100'
							>
								Necessary Cookies Only
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
