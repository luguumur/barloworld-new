"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";

export async function createUserDirect(data: {
	name: string;
	email: string;
	password: string;
	role: string;
}) {
	await isAuthorized();
	const existing = await prisma.user.findUnique({
		where: { email: data.email.toLowerCase().trim() },
	});
	if (existing) throw new Error("A user with this email already exists.");
	const hashed = await bcrypt.hash(data.password, 10);
	return prisma.user.create({
		data: {
			name: data.name.trim(),
			email: data.email.toLowerCase().trim(),
			password: hashed,
			role: data.role,
		},
	});
}

export async function getUsers(filter: any) {
	const currentUser = await isAuthorized();
	console.log("currentUser", currentUser);
	console.log("filter", filter);
	const res = await prisma.user.findMany({
		where: {
			role: filter,
		},
	});

	const filtredUsers = res.filter(
		(user) =>
			user.email !== currentUser?.email && !user.email?.includes("demo-")
	);

	return filtredUsers;
}

export async function updateUser(data: any) {
	const { email } = data;
	return await prisma.user.update({
		where: {
			email: email.toLowerCase(),
		},
		data: {
			email: email.toLowerCase(),
			...data,
		},
	});
}

export async function deleteUser(user: any) {
	if (user?.email?.includes("demo-")) {
		return new Error("Can't delete demo user");
	}

	if (!user) {
		return new Error("User not found");
	}

	return await prisma.user.delete({
		where: {
			email: user?.email.toLowerCase() as string,
		},
	});
}

export async function serchUser(email: string) {
	return await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
	});
}
