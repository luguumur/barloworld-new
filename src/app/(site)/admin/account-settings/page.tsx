import { cookies } from "next/headers";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import EditProfile from "@/components/User/AccountSettings/EditProfile";
import PasswordChange from "@/components/User/AccountSettings/PasswordChange";
import PageSizeSettings from "@/components/User/AccountSettings/PageSizeSettings";
import {
	ADMIN_PAGE_SIZE_COOKIE,
	DEFAULT_PAGE_SIZE,
	PAGE_SIZE_OPTIONS,
	type PageSizeOption,
} from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Account Settings - ${process.env.SITE_NAME}`,
	description: `Account Settings Description`,
};

export default function AccountSettingsPage() {
	const raw = parseInt(cookies().get(ADMIN_PAGE_SIZE_COOKIE)?.value ?? "", 10);
	const pageSize: PageSizeOption = (
		PAGE_SIZE_OPTIONS as readonly number[]
	).includes(raw)
		? (raw as PageSizeOption)
		: DEFAULT_PAGE_SIZE;

	return (
		<>
			<Breadcrumb pageTitle='Account Settings' />

			<div className='flex flex-wrap gap-11 lg:flex-nowrap'>
				<EditProfile />
				<PasswordChange />
			</div>

			<div className='mt-11'>
				<PageSizeSettings current={pageSize} />
			</div>
		</>
	);
}
