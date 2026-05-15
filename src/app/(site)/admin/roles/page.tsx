import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import RolesManager from "@/components/Admin/Roles/RolesManager";
import { getAdminRoles } from "@/actions/adminRole";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Roles - ${process.env.SITE_NAME}`,
};

export const revalidate = 0;

export default async function RolesPage() {
	const roles = await getAdminRoles();

	return (
		<>
			<Breadcrumb pageTitle='Roles' />
			<div className='mb-6 rounded-10 bg-white p-5 shadow-1 dark:bg-gray-dark'>
				<p className='text-sm text-body dark:text-gray-4'>
					Create custom roles and configure which admin sections each role can
					access. Assign these roles to users from{" "}
					<strong className='text-dark dark:text-white'>Manage Users</strong>.
					<br />
					<span className='mt-1 block text-xs'>
						Built-in roles <strong>ADMIN</strong> (full access) cannot be edited
						here.
					</span>
				</p>
			</div>
			<RolesManager roles={roles} />
		</>
	);
}
