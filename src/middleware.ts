import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		const pathname = req.nextUrl?.pathname;
		const role = req.nextauth.token?.role as string | undefined;
		const isAdmin = role === "ADMIN";
		const isUser = role === "USER";
		// Custom roles (anything that's not USER) can access /admin
		const canAccessAdmin = isAdmin || (!!role && !isUser);

		if (pathname.includes("/admin") && !canAccessAdmin) {
			return NextResponse.redirect(new URL("/user", req.url));
		}

		if (pathname.includes("/user") && !isUser) {
			return NextResponse.redirect(new URL("/admin", req.url));
		}

		// if logged in redirect to admin
		return NextResponse.next();
	},
	{
		secret: process.env.SECRET,
		callbacks: {
			authorized: (params) => {
				const { token } = params;
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: ["/user/:path*", "/admin/:path*"],
};
