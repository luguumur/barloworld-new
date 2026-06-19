import UserEmptyState from "./UserEmptyState";
import UserListTable from "./UserListTable";
import UserTopbar from "./UserTopbar";
import { getUsers } from "@/actions/user";
import { getAdminRoles } from "@/actions/adminRole";
import { User } from "@prisma/client";

export const revalidate = 0;

export default async function UsersListContainer({ filter, search }: any) {
	const [allUsers, customRoles] = await Promise.all([
		getUsers(filter),
		getAdminRoles(),
	]);

	let users: User[] = allUsers;
	if (search) {
		users = users?.filter(
			(user) => user?.email?.toLowerCase().includes(search?.toLowerCase())
		);
	}

	return (
		<>
			<div className='mb-5'>
				<UserTopbar
					customRoles={customRoles.map((r) => ({
						name: r.name,
						label: r.label,
						color: r.color,
					}))}
				/>
			</div>
			{users?.length ? (
				<UserListTable
					users={users}
					customRoles={customRoles.map((r) => ({
						name: r.name,
						label: r.label,
					}))}
				/>
			) : (
				<UserEmptyState />
			)}
		</>
	);
}
