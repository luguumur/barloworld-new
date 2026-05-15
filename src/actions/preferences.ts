"use server";
import { cookies } from "next/headers";
import { isAuthorized } from "@/libs/isAuthorized";
import { type PageSizeOption } from "@/lib/constants";

export async function savePageSize(size: PageSizeOption) {
	await isAuthorized();
	cookies().set("admin_page_size", String(size), {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		httpOnly: false,
		sameSite: "lax",
	});
}
