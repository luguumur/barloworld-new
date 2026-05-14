import { cache } from "react";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";

export const isAuthorized = cache(async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user) throw new Error("Unauthorized");
	return session.user;
});
