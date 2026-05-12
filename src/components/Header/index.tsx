"use client";
import logoLight from "@/../public/images/logo/belogo.webp";
import logo from "@/../public/images/logo/belogo.webp";
import { Menu } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { menuData } from "./menuData";
import GlobalSearchModal from "../GlobalSearch";
import ThemeSwitcher from "./ThemeSwitcher";
import { onScroll } from "@/libs/scrollActive";
import { usePathname } from "next/navigation";

type MenuItemPublic = {
	id: number;
	title: string;
	path?: string;
	newTab?: boolean;
	submenu?: { id: number; title: string; path: string; newTab?: boolean }[];
};

const Header = ({ menu: menuProp }: { menu?: MenuItemPublic[] }) => {
	const menuItems = menuProp && menuProp.length > 0 ? menuProp : menuData;
	const [stickyMenu, setStickyMenu] = useState(false);
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [navbarOpen, setNavbarOpen] = useState(false);
	const pathUrl = usePathname();
	// console.log(menuItems, "menu items in header");
	useEffect(() => {
		if (window.location.pathname === "/") {
			window.addEventListener("scroll", onScroll);
		}
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// useEffect(() => {
	// 	const handleSticky = () => setStickyMenu(window.scrollY > 0);
	// 	window.addEventListener("scroll", handleSticky);
	// 	return () => window.removeEventListener("scroll", handleSticky);
	// }, []);

	return (
		<>
			{/* ── Utility bar ── */}
			<div className='bg-[#474d59] py-2 text-xs text-white/80'>
				<div className='container'>
					<div className=''>
						<div className='mx-auto flex items-center justify-between px-4 sm:px-8 xl:px-0'>
							<div className='flex items-center gap-5'>
								<a
									href='tel:+97670187588'
									className='flex items-center gap-1.5 transition hover:text-primary'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='h-3.5 w-3.5 shrink-0 text-primary'
									>
										<path
											fillRule='evenodd'
											d='M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z'
											clipRule='evenodd'
										/>
									</svg>
									+976 7018-7588
								</a>
								<a
									href='mailto:info@barloworld.mn'
									className='hidden items-center gap-1.5 transition hover:text-primary sm:flex'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										className='h-3.5 w-3.5 shrink-0 text-primary'
									>
										<path d='M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z' />
										<path d='M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z' />
									</svg>
									info@barloworld.mn
								</a>
							</div>
							<div className='flex items-center gap-4'>
								<Link href='/support' className='transition hover:text-primary'>
									Contact Us
								</Link>
								<span className='text-white/20'>|</span>
								<Link
									href='/blog'
									className='hidden transition hover:text-primary sm:block'
								>
									News & Blog
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ── Main nav ── */}
			<header
				className={` left-0 top-0 z-999 w-full bg-white transition-all duration-300 ease-in-out
				dark:bg-dark`}
			>
				<div className='container'>
					<div className=''>
						<div className=' relative mx-auto items-center justify-between gap-2 border-b border-gray-3 px-4 dark:border-dark-2 sm:px-8 xl:flex xl:border-0 xl:px-0'>
							{/* Logo + hamburger */}
							<div className='tems-center flex justify-between py-3 xl:py-0'>
								<Link href='/'>
									<Image
										src={logoLight}
										alt='Barloworld Mongolia'
										width={149}
										height={37}
										className='hidden w-full dark:block'
										priority
									/>
									<Image
										src={logo}
										alt='Barloworld Mongolia'
										width={149}
										height={37}
										className='w-full dark:hidden'
										priority
									/>
								</Link>

								<button
									onClick={() => setNavbarOpen(!navbarOpen)}
									aria-label='Toggle menu'
									className='block xl:hidden'
								>
									<span className='relative block h-5.5 w-5.5 cursor-pointer'>
										<span className='du-block absolute right-0 h-full w-full'>
											{[0, 150, 200].map((delay, i) => (
												<span
													key={i}
													style={{
														transitionDelay: `${!navbarOpen ? delay : 0}ms`,
													}}
													className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
														!navbarOpen ? "!w-full" : "w-0"
													}`}
												/>
											))}
										</span>
										<span className='du-block absolute right-0 h-full w-full rotate-45'>
											<span
												className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
													!navbarOpen ? "!h-0 delay-[0]" : "delay-300"
												}`}
											/>
											<span
												className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
													!navbarOpen ? "!h-0" : "delay-200"
												}`}
											/>
										</span>
									</span>
								</button>
							</div>

							{/* Nav + actions */}
							<div
								className={`invisible h-0 w-full items-center justify-between overflow-hidden xl:visible xl:flex xl:h-auto xl:overflow-visible ${
									navbarOpen
										? "!visible !h-auto max-h-[400px] overflow-y-auto rounded-b-lg bg-white pb-6 pt-2 shadow-lg dark:bg-dark"
										: ""
								}`}
							>
								<nav>
									<ul className='flex flex-col gap-1 xl:flex-row xl:gap-0.5'>
										{menuItems?.map((item: Menu, key) =>
											item?.submenu ? (
												<Dropdown
													stickyMenu={stickyMenu}
													item={item}
													key={key}
													setNavbarOpen={setNavbarOpen}
												/>
											) : (
												<li
													key={key}
													className={stickyMenu ? "xl:py-4" : "xl:py-5"}
												>
													<Link
														onClick={() => setNavbarOpen(false)}
														href={item?.path ?? ""}
														target={item?.newTab ? "_blank" : ""}
														rel={item?.newTab ? "noopener noreferrer" : ""}
														className={`flex rounded-md px-[14px] py-[5px] font-noto text-sm font-medium transition ${
															pathUrl === item?.path
																? "bg-primary/10 text-primary"
																: "text-black hover:bg-primary/5 hover:text-primary dark:text-gray-4 dark:hover:text-white"
														}`}
													>
														{item?.title}
													</Link>
												</li>
											)
										)}
									</ul>
								</nav>

								<div className='mt-4 flex items-center gap-2 xl:mt-0'>
									<button
										onClick={() => setSearchModalOpen(true)}
										className='flex h-9 w-9 items-center justify-center rounded-full text-dark transition hover:bg-primary/10 hover:text-primary dark:text-gray-5'
										aria-label='Search'
									>
										<svg
											width='18'
											height='18'
											viewBox='0 0 18 18'
											fill='currentColor'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M16.9347 15.3963L12.4816 11.7799C14.3168 9.26991 14.1279 5.68042 11.8338 3.41337C10.6194 2.19889 9.00003 1.52417 7.27276 1.52417C5.54549 1.52417 3.92617 2.19889 2.71168 3.41337C0.201738 5.92332 0.201738 10.0256 2.71168 12.5355C3.92617 13.75 5.54549 14.4247 7.27276 14.4247C8.91907 14.4247 10.4574 13.804 11.6719 12.6975L16.179 16.3409C16.287 16.4219 16.4219 16.4759 16.5569 16.4759C16.7458 16.4759 16.9077 16.3949 17.0157 16.26C17.2316 15.9901 17.2046 15.6122 16.9347 15.3963ZM7.27276 13.2102C5.86935 13.2102 4.5739 12.6705 3.57532 11.6719C1.52418 9.62076 1.52418 6.30116 3.57532 4.27701C4.5739 3.27843 5.86935 2.73866 7.27276 2.73866C8.67617 2.73866 9.97162 3.27843 10.9702 4.27701C13.0213 6.32815 13.0213 9.64775 10.9702 11.6719C9.99861 12.6705 8.67617 13.2102 7.27276 13.2102Z' />
										</svg>
									</button>
									<ThemeSwitcher />
									<LanguageSwitcher />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Yellow gradient accent strip */}
				<div
					className='hidden h-[21px] w-full xl:block'
					style={{
						backgroundImage: "url(/images/bg/header-gradient.png)",
						backgroundRepeat: "repeat-x",
					}}
					aria-hidden
				/>
			</header>

			<GlobalSearchModal
				searchModalOpen={searchModalOpen}
				setSearchModalOpen={setSearchModalOpen}
			/>
		</>
	);
};

export default Header;
