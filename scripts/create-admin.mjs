import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const EMAIL = "iluguumur@gmail.com";
const PASSWORD = "Admin@1234"; // change this after first login

async function main() {
	const hash = await bcrypt.hash(PASSWORD, 10);

	const user = await prisma.user.upsert({
		where: { email: EMAIL },
		update: { role: "ADMIN", password: hash },
		create: {
			email: EMAIL,
			name: "Admin",
			role: "ADMIN",
			password: hash,
		},
	});

	console.log(`✓ Admin user ready: ${user.email} (role: ${user.role})`);
	console.log(`  Password: ${PASSWORD}`);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
