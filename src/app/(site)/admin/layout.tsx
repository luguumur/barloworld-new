import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getAdminRoleByName } from "@/actions/adminRole";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	const role = (session?.user as any)?.role as string | undefined;

	// ADMIN = null (full access). Custom roles get their allowed paths.
	let allowedPaths: string[] | null = null;
	if (role && role !== "ADMIN") {
		const adminRole = await getAdminRoleByName(role);
		allowedPaths = adminRole?.permissions ?? [];
	}

	return (
		<AdminLayoutClient allowedPaths={allowedPaths}>
			{children}
		</AdminLayoutClient>
	);
}
