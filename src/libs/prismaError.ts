import { Prisma } from "@prisma/client";

export function handleTableMissing<T>(error: unknown, fallback: T): T {
	if (
		error instanceof Prisma.PrismaClientKnownRequestError &&
		error.code === "P2021"
	) {
		return fallback;
	}
	if (error instanceof Error && error.message.includes("does not exist")) {
		return fallback;
	}
	throw error;
}
