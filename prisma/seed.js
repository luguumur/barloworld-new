/* Seed script for initial dynamic pages (DB-based custom pages). */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	const slug = "service";

	const title = "Our Services";
	const title_en = "Our Services";
	const description = "Learn about the services we offer.";
	const description_en = "Learn about the services we offer.";

	const content = `
    <p>Welcome to our services page. You can edit this content from the admin panel under <strong>Pages</strong>.</p>
    <h2>What we offer</h2>
    <ul>
      <li>Custom solutions</li>
      <li>Support and maintenance</li>
      <li>Consulting</li>
    </ul>
  `.trim();

	const content_en = content;

	const page = await prisma.page.upsert({
		where: { slug },
		update: {
			title,
			title_en,
			description,
			description_en,
			content,
			content_en,
		},
		create: {
			slug,
			title,
			title_en,
			description,
			description_en,
			content,
			content_en,
		},
	});

	console.log(`Seeded page with slug "${page.slug}" (id: ${page.id}).`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

