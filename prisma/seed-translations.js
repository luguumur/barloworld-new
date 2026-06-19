/* Run: node prisma/seed-translations.js */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const translations = [
	// ========== EquipmentCategories ==========
	{
		key: "EquipmentCategories.subtitle",
		value_mn: "Бидний санал болгох",
		value_en: "What We Offer",
	},
	{
		key: "EquipmentCategories.title",
		value_mn: "Бидний санал болгодог",
		value_en: "What We Offer",
	},
	{
		key: "EquipmentCategories.view_all",
		value_mn: "Бүх бүтээгдэхүүнийг үзэх →",
		value_en: "View all products →",
	},
	{
		key: "EquipmentCategories.new_equipment",
		value_mn: "Шинэ тоног төхөөрөмж",
		value_en: "New Equipment",
	},
	{
		key: "EquipmentCategories.used_equipment",
		value_mn: "Хуучин тоног төхөөрөмж",
		value_en: "Used Equipment",
	},
	{ key: "EquipmentCategories.rental", value_mn: "Түрээс", value_en: "Rental" },
	{
		key: "EquipmentCategories.parts",
		value_mn: "Сэлбэг хэрэгсэл",
		value_en: "Parts",
	},
	{
		key: "EquipmentCategories.service",
		value_mn: "Үйлчилгээ",
		value_en: "Service",
	},
	{
		key: "EquipmentCategories.power_systems",
		value_mn: "Цахилгаан системүүд",
		value_en: "Power Systems",
	},

	// ========== CompanyIntro ==========
	{
		key: "CompanyIntro.subtitle",
		value_mn: "Бидний тухай",
		value_en: "About Us",
	},
	{
		key: "CompanyIntro.title",
		value_mn: "Барловорлд Монголиа",
		value_en: "The Thompson Advantage — Barlo World Mongolia",
	},
	{
		key: "CompanyIntro.desc1",
		value_mn:
			"Барловорлд Монгол ХХК нь Монгол улсад Caterpillar®-ийн эрх бүхий дилер бөгөөд дэлхийн стандартын хүнд тоног төхөөрөмж, жинхэнэ сэлбэг, мэргэшсэн үйлчилгээг хүргэдэг.",
		value_en:
			"Barloworld Mongolia LLC is the authorized Caterpillar® dealer for Mongolia, delivering world-class heavy equipment, genuine parts, and expert service since our establishment.",
	},
	{
		key: "CompanyIntro.desc2",
		value_mn:
			"Экскаватор болон дугуйт ачигчаас эхлэн генератор хүртэл манай бүтээгдэхүүн нь Cat® байгуулагдсан бүрэн шугамаар дэмжигдэж, Монголын уул уурхай, барилга, эрчим хүчний салбарыг дэмждэг.",
		value_en:
			"From excavators and wheel loaders to generators and work tools, we support Mongolia's mining, construction, and energy sectors with the full force of the Cat® product line backed by our certified technician teams.",
	},
	{
		key: "CompanyIntro.desc3",
		value_mn:
			"Улсдаа тархсан салбар сүлжээ нь хурдан сэлбэг нийлүүлэлт, газар дээрх засвар үйлчилгээ, таны үйлдвэрлэлд тохирсон урьдчилан сэргийлэх засвар программуудыг хангана.",
		value_en:
			"Our nationwide branch network ensures fast parts delivery, on-site field service, and preventive maintenance programs tailored to your operation.",
	},
	{
		key: "CompanyIntro.contact_btn",
		value_mn: "Холбоо барих",
		value_en: "Contact Us",
	},
	{
		key: "CompanyIntro.equipment_btn",
		value_mn: "Тоног төхөөрөмж үзэх →",
		value_en: "View Equipment →",
	},
	{
		key: "CompanyIntro.stat1_label",
		value_mn: "Жилийн туршлага",
		value_en: "Years of Experience",
	},
	{
		key: "CompanyIntro.stat2_label",
		value_mn: "Салбар байршил",
		value_en: "Branch Locations",
	},
	{
		key: "CompanyIntro.stat3_label",
		value_mn: "Cat бүтээгдэхүүн",
		value_en: "Cat Products",
	},
	{
		key: "CompanyIntro.stat4_label",
		value_mn: "Үйлчилгээний дэмжлэг",
		value_en: "Service Support",
	},

	// ========== EquipmentSearch ==========
	{
		key: "EquipmentSearch.heading",
		value_mn: "Зөв тоног төхөөрөмжийг олох",
		value_en: "Find the Right Equipment",
	},
	{
		key: "EquipmentSearch.placeholder",
		value_mn: "Нэр, модел эсвэл түлхүүр үгээр хайх…",
		value_en: "Search by name, model, or keyword…",
	},
	{
		key: "EquipmentSearch.all_types",
		value_mn: "Бүх төрлийн тоног төхөөрөмж",
		value_en: "All Equipment Types",
	},
	{ key: "EquipmentSearch.search_btn", value_mn: "Хайх", value_en: "Search" },

	// ========== About section ==========
	{ key: "About.vision_label", value_mn: "Алсын харaa", value_en: "Vision" },
	{
		key: "About.mission_label",
		value_mn: "Эрхэм Зорилго",
		value_en: "Mission",
	},
	{ key: "About.values_label", value_mn: "Эрхэм Зүйлс", value_en: "Values" },
	{
		key: "About.vision_text",
		value_mn: "Cat-ийн шилдэг дилер болно.",
		value_en: "To be the best Cat dealer, period.",
	},
	{
		key: "About.mission_text",
		value_mn: "Дээд зэргийн үйлчилгээ. Байнгын харилцаа. Хүчирхэг нийгэм.",
		value_en: "Superior Services. Lasting Relationships. Stronger Communities.",
	},
	{
		key: "About.values_text",
		value_mn:
			"Барловорлд Монголиа нь үнэнч шударга, хүндэтгэл, аюулгүй байдал, өндөр чанартай, эерэг хандлагыг эрхэмлэдэг.",
		value_en:
			"Barloworld Mongolia is committed to honesty, integrity, respect, safety, high quality, and positive attitude.",
	},
	{
		key: "About.welcome",
		value_mn: "ТАНЫ ИТГЭЛТ ТҮНШ",
		value_en: "WELCOME TO BARLOWORLD MONGOLIA",
	},
	{
		key: "About.description",
		value_mn:
			"Бидний зорилго бол дээд зэргийн чанарыг харилцагч бүртээ хүргэж өнөөгийн эдийн засгийн эдгээр чухал салбарын өсөлт хөгжилд хувь нэмэр оруулах явдал юм. Монгол улсад хэдийгээр хүнд хэцүү цаг тулгараад байгаа боловч эдийн засгийн үндэс суурь нь бий учраас цаашдын ирээдүйд хурдацтай хөгжилд хүрэх бололцоотой юм. Барловорлд Монгол ХХК нь олон жилийн турш хүнд машин механизм, тоног төхөөрөмж, технологийг нийлүүлсээр байгаа билээ.",
		value_en:
			"Mongolia has faced some challenging times but the economy and our company's outlook are turning a corner with commodity prices on the upswing. The long-term fundamentals remain strong and serve as positive indicators that bode well for great opportunities for Barloworld Mongolia LLC and our employees in the years to come.",
	},
	{ key: "About.more_btn", value_mn: "Дэлгэрэнгүй", value_en: "Learn More" },

	// ========== DealsSection ==========
	{
		key: "DealsSection.title",
		value_mn: "ОНЦГОЙ САНАЛ",
		value_en: "DEALS & SPECIALS",
	},
	{
		key: "DealsSection.view_all",
		value_mn: "БҮГДИЙГ ҮЗЭХ",
		value_en: "VIEW ALL DEALS & SPECIALS",
	},

	// ========== TestimonialsSection ==========
	{
		key: "TestimonialsSection.title_line1",
		value_mn: "",
		value_en: "Hear From",
	},
	{
		key: "TestimonialsSection.title_line2",
		value_mn: "Харилцагчийн сэтгэгдэл",
		value_en: "Our Customers",
	},
	{
		key: "TestimonialsSection.cta",
		value_mn: "БҮХ СЭТГЭГДЛИЙГ ҮЗЭХ",
		value_en: "READ ALL TESTIMONIALS",
	},

	// ========== ContactCTA ==========
	{
		key: "ContactCTA.title",
		value_mn: "Бид танд туслахад бэлэн",
		value_en: "We are here for you",
	},
	{
		key: "ContactCTA.description",
		value_mn:
			"Та ажлын байрандаа гайхалтай гүйцэтгэлийг хангах тоног төхөөрөмж хэрэгтэй байна уу? Өнөөдөр бидэнтэй холбогдож, манай шинэ, хуучин болон түрээсийн тоног төхөөрөмж, эд анги, үйлчилгээний талаар илүү ихийг мэдэж аваарай.",
		value_en:
			"Do you need equipment that delivers outstanding performance at your job site? Contact us today to learn more about our new, used and rental equipment as well as our parts and service.",
	},
	{
		key: "ContactCTA.contact_btn",
		value_mn: "Холбоо барих",
		value_en: "Contact Us",
	},

	// ========== ContactForm ==========
	{ key: "ContactForm.name_label", value_mn: "Нэр", value_en: "Name" },
	{ key: "ContactForm.email_label", value_mn: "И-мэйл", value_en: "Email" },
	{
		key: "ContactForm.phone_label",
		value_mn: "Утасны дугаар",
		value_en: "Phone Number",
	},
	{ key: "ContactForm.subject_label", value_mn: "Сэдэв", value_en: "Subject" },
	{ key: "ContactForm.message_label", value_mn: "Мессеж", value_en: "Message" },
	{
		key: "ContactForm.submit_btn",
		value_mn: "Хүсэлт илгээх",
		value_en: "Submit Request",
	},
	{
		key: "ContactForm.submitting",
		value_mn: "Илгээж байна...",
		value_en: "Submitting...",
	},
	{
		key: "ContactForm.success",
		value_mn: "Таны хүсэлт амжилттай илгээгдлээ!",
		value_en: "Your contact request has been submitted!",
	},
	{
		key: "ContactForm.error",
		value_mn: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
		value_en: "Failed to submit. Please try again.",
	},

	// ========== QuoteForm ==========
	{ key: "QuoteForm.first_name", value_mn: "Нэр", value_en: "First Name" },
	{ key: "QuoteForm.last_name", value_mn: "Овог", value_en: "Last Name" },
	{ key: "QuoteForm.title_label", value_mn: "Цол", value_en: "Title" },
	{
		key: "QuoteForm.state_label",
		value_mn: "Муж / Аймаг",
		value_en: "State / Region",
	},
	{
		key: "QuoteForm.phone_label",
		value_mn: "Утасны дугаар",
		value_en: "Phone Number",
	},
	{ key: "QuoteForm.email_label", value_mn: "И-мэйл", value_en: "Email" },
	{
		key: "QuoteForm.product_label",
		value_mn: "Тоног төхөөрөмж / Бүтээгдэхүүний нэр",
		value_en: "Equipment / Product Name",
	},
	{ key: "QuoteForm.message_label", value_mn: "Мессеж", value_en: "Message" },
	{
		key: "QuoteForm.submit_btn",
		value_mn: "Хүсэлт илгээх",
		value_en: "Submit Request",
	},
	{
		key: "QuoteForm.submitting",
		value_mn: "Илгээж байна...",
		value_en: "Submitting...",
	},
	{
		key: "QuoteForm.success",
		value_mn: "Таны үнийн санал хүсэлт илгээгдлээ!",
		value_en: "Your quote request has been submitted!",
	},
	{
		key: "QuoteForm.error",
		value_mn: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
		value_en: "Failed to submit. Please try again.",
	},

	// ========== ContactSidebarForm ==========
	{
		key: "ContactSidebarForm.title",
		value_mn: "Бидэнтэй холбогдоорой",
		value_en: "Contact us Today",
	},
	{
		key: "ContactSidebarForm.title_accent",
		value_mn: "Үнийн санал авах",
		value_en: "to Get a Quote",
	},
	{
		key: "ContactSidebarForm.name_label",
		value_mn: "Таны нэр",
		value_en: "Your Name",
	},
	{
		key: "ContactSidebarForm.email_label",
		value_mn: "И-мэйл",
		value_en: "Email",
	},
	{
		key: "ContactSidebarForm.phone_label",
		value_mn: "Утас",
		value_en: "Phone",
	},
	{
		key: "ContactSidebarForm.message_label",
		value_mn: "Мессеж",
		value_en: "Message",
	},
	{
		key: "ContactSidebarForm.submit_btn",
		value_mn: "Илгээх",
		value_en: "Submit",
	},
	{
		key: "ContactSidebarForm.submitting",
		value_mn: "Илгээж байна...",
		value_en: "Sending...",
	},
	{
		key: "ContactSidebarForm.success",
		value_mn: "Таны хүсэлт илгээгдлээ!",
		value_en: "Your request has been sent!",
	},
	{
		key: "ContactSidebarForm.error",
		value_mn: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу.",
		value_en: "Failed to send. Please try again.",
	},
	{
		key: "ContactSidebarForm.required_error",
		value_mn: "Нэр болон утасны дугаар шаардлагатай",
		value_en: "Name and phone are required",
	},

	// ========== Support page ==========
	{ key: "Support.title", value_mn: "Холбоо барих", value_en: "Contact Us" },
	{
		key: "Support.sms_disclaimer",
		value_mn:
			"*Хэрэв та цаашид мэдэгдэл хүлээн авахыг хүсэхгүй байвал STOP, QUIT, END, REVOKE, OPT-OUT, CANCEL эсвэл UNSUBSCRIBE гэж бичиж илгээнэ үү. Мобайл оператороос мессеж болон өгөгдлийн төлбөр гарч болно.",
		value_en:
			"*If you wish to be removed from receiving future communications, you can opt-out by texting STOP, QUIT, END, REVOKE, OPT-OUT, CANCEL, or UNSUBSCRIBE. Message and data rates may apply based on your mobile carrier's plan. By opting into SMS communications from Barloworld Mongolia, you agree to receive recurring text messages regarding account updates, order notifications, delivery notifications, and general support.",
	},

	// ========== Rent page ==========
	{ key: "Rent.title", value_mn: "Түрээс", value_en: "Rent" },
	{
		key: "Rent.location_title",
		value_mn: "Түрээсийн салбарын байршил",
		value_en: "Rental Branch Locations",
	},
	{
		key: "Rent.company_subtitle",
		value_mn: "Барлоуорлд Монгол ХХК-ийн түрээсийн салбарууд",
		value_en: "Barloworld Mongolia LLC rental branches",
	},
	{
		key: "Rent.office_hours_label",
		value_mn: "Ажлын цаг",
		value_en: "Office Hours",
	},
	{
		key: "Rent.weekdays",
		value_mn: "Даваа-Баасан 09:00-18:00",
		value_en: "Mon-Fri 09:00-18:00",
	},
	{
		key: "Rent.weekend",
		value_mn: "Бямба 09:00-15:00",
		value_en: "Sat 09:00-15:00",
	},
	{ key: "Rent.holiday", value_mn: "Ням - Амарна", value_en: "Sun - Closed" },
	{
		key: "Rent.view_on_map",
		value_mn: "Google map дээр харах",
		value_en: "View on Google Maps",
	},
	{
		key: "Rent.cta_title",
		value_mn: "Түрээсийн үнийн санал авах",
		value_en: "Request a Rental Quote",
	},
	{
		key: "Rent.cta_desc",
		value_mn:
			"Манай мэргэжилтнүүд таны шаардлагад тохирсон хамгийн тохиромжтой шийдлийг санал болгоно.",
		value_en:
			"Our specialists will propose the most suitable solution for your requirements.",
	},
	{ key: "Rent.contact_btn", value_mn: "Холбоо барих", value_en: "Contact Us" },

	// ========== PageSidebar ==========
	{
		key: "PageSidebar.equipment_types",
		value_mn: "Тоног Төхөөрөмжийн Төрлүүд",
		value_en: "Equipment Types",
	},
	{
		key: "PageSidebar.categories",
		value_mn: "Ангилал",
		value_en: "Categories",
	},
	{
		key: "PageSidebar.products",
		value_mn: "Бүтээгдэхүүн",
		value_en: "Products",
	},
	{
		key: "PageSidebar.quick_links",
		value_mn: "Хурдан холбоос",
		value_en: "Quick Links",
	},
	{
		key: "PageSidebar.find_equipment",
		value_mn: "Тоног Төхөөрөмж Хайх",
		value_en: "Find equipment",
	},
	{
		key: "PageSidebar.find_location",
		value_mn: "Байршил Хайх",
		value_en: "Find location",
	},
	{
		key: "PageSidebar.find_rep",
		value_mn: "Төлөөлөгч Олох",
		value_en: "Find a rep",
	},
	{
		key: "PageSidebar.safety_training",
		value_mn: "Аюулгүй байдал & Сургалт",
		value_en: "Safety & training",
	},
	{
		key: "PageSidebar.service_maintenance",
		value_mn: "Үйлчилгээ & Техник Засвар",
		value_en: "Service & maintenance",
	},
	{ key: "PageSidebar.careers", value_mn: "Хүний нөөц", value_en: "Careers" },

	// ========== Products ==========
	{
		key: "Products.title",
		value_mn: "Бүтээгдэхүүн",
		value_en: "Cat Equipment",
	},
	{ key: "Products.breadcrumb_home", value_mn: "Нүүр", value_en: "Home" },
	{
		key: "Products.breadcrumb_products",
		value_mn: "Бүтээгдэхүүн",
		value_en: "Products",
	},

	// ========== QuotePage ==========
	{
		key: "QuotePage.title",
		value_mn: "Үнийн санал авах",
		value_en: "Request a Quote",
	},
	{
		key: "QuotePage.heading",
		value_mn: "Үнийн санал авах",
		value_en: "Get a Quote",
	},
	{
		key: "QuotePage.description",
		value_mn: "Доорх маягтыг бөглөнө үү, манай баг удахгүй тантай холбогдоно.",
		value_en: "Fill out the form below and our team will contact you shortly.",
	},

	// ========== Footer ==========
	{
		key: "Footer.copyright",
		value_mn: "Copyright © Barloworld Mongolia. Бүх эрх хамгаалагдсан",
		value_en: "Copyright © Barloworld Mongolia. All Rights Reserved",
	},
	{
		key: "Footer.phone",
		value_mn: "+976 7018-7588",
		value_en: "+976 7018-7588",
	},

	// ========== Common ==========
	{ key: "Common.home", value_mn: "Нүүр", value_en: "Home" },
	{
		key: "Common.contact_us",
		value_mn: "Холбоо барих",
		value_en: "Contact Us",
	},
	{ key: "Common.learn_more", value_mn: "Дэлгэрэнгүй", value_en: "Learn More" },
];

async function main() {
	console.log(`Seeding ${translations.length} translations…`);
	let created = 0;
	let updated = 0;

	for (const row of translations) {
		const existing = await prisma.translation.findUnique({
			where: { key: row.key },
		});
		if (existing) {
			await prisma.translation.update({
				where: { key: row.key },
				data: { value_mn: row.value_mn, value_en: row.value_en },
			});
			updated++;
		} else {
			await prisma.translation.create({ data: row });
			created++;
		}
	}

	console.log(`Done — ${created} created, ${updated} updated.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
