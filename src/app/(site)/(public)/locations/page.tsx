import { Metadata } from "next";
import { cookies } from "next/headers";
import ProductPageHeader from "@/components/Products/ProductPageHeader";
import PageSidebar from "@/components/Common/PageSidebar";
import { getLocationSetting } from "@/actions/locationSetting";
import { DEFAULT_LOCATION } from "@/actions/locationSettingDefaults";

export const revalidate = 0;

export const metadata: Metadata = {
	title: `Locations — ${process.env.SITE_NAME}`,
	description: "Find Barloworld Mongolia office and service locations.",
};

function resolveImg(src: string): string {
	if (!src) return DEFAULT_LOCATION.image;
	if (src.startsWith("http") || src.startsWith("/")) return src;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${src}` : DEFAULT_LOCATION.image;
}

export default async function LocationsPage() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const isMn = lang === "mn";

	const row = await getLocationSetting();
	const loc = row ?? { ...DEFAULT_LOCATION, id: "" };

	const imgSrc = resolveImg(loc.image);
	const address = isMn ? loc.address : loc.address_en;

	return (
		<>
			<ProductPageHeader
				title={isMn ? "Байршил" : "Locations"}
				breadcrumbs={[
					{ label: "Home", href: "/" },
					{ label: isMn ? "Байршил" : "Locations" },
				]}
			/>

			<article className='page-body container'>
				<div className='row'>
					<PageSidebar />

					<main className='page-content col-md-9'>

						{/* Photo + info side by side */}
						<div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "40px" }}>
							{/* Photo */}
							<div style={{ flex: "1 1 280px", minWidth: "0" }}>
								<img
									src={imgSrc}
									alt={isMn ? "Байршил" : "Location"}
									style={{ width: "100%", height: "auto", display: "block", borderRadius: "4px" }}
								/>
							</div>

							{/* Contact info */}
							<div style={{ flex: "1 1 240px", minWidth: "0" }}>
								<h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px", color: "#1a1a1a", borderBottom: "3px solid #FFBE00", paddingBottom: "10px", display: "inline-block" }}>
									{isMn ? "Холбоо барих" : "Contact Information"}
								</h2>

								<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
									{/* Address */}
									<div style={{ display: "flex", gap: "12px" }}>
										<span style={{ fontSize: "20px", flexShrink: 0 }}>📍</span>
										<div>
											<p style={{ fontWeight: 700, fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
												{isMn ? "Хаяг" : "Address"}
											</p>
											<p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6 }}>{address}</p>
										</div>
									</div>

									{/* Phone */}
									<div style={{ display: "flex", gap: "12px" }}>
										<span style={{ fontSize: "20px", flexShrink: 0 }}>📞</span>
										<div>
											<p style={{ fontWeight: 700, fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
												{isMn ? "Утас" : "Phone"}
											</p>
											<a href={`tel:${loc.phone.replace(/\s/g, "")}`} style={{ fontSize: "14px", color: "#FFBE00", fontWeight: 700, textDecoration: "none" }}>
												{loc.phone}
											</a>
										</div>
									</div>

									{/* Email */}
									<div style={{ display: "flex", gap: "12px" }}>
										<span style={{ fontSize: "20px", flexShrink: 0 }}>✉️</span>
										<div>
											<p style={{ fontWeight: 700, fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
												{isMn ? "И-мэйл" : "Email"}
											</p>
											<a href={`mailto:${loc.email}`} style={{ fontSize: "14px", color: "#FFBE00", fontWeight: 700, textDecoration: "none" }}>
												{loc.email}
											</a>
										</div>
									</div>

									{/* Hours */}
									<div style={{ display: "flex", gap: "12px" }}>
										<span style={{ fontSize: "20px", flexShrink: 0 }}>🕐</span>
										<div>
											<p style={{ fontWeight: 700, fontSize: "13px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
												{isMn ? "Ажлын цаг" : "Working Hours"}
											</p>
											<p style={{ fontSize: "14px", color: "#333", lineHeight: 1.7 }}>
												{isMn ? "Даваа — Баасан: 09:00–18:00" : "Mon – Fri: 09:00–18:00"}<br />
												{isMn ? "Бямба: 09:00–15:00" : "Sat: 09:00–15:00"}<br />
												<span style={{ color: "#999" }}>{isMn ? "Ням — Амарна" : "Sun: Closed"}</span>
											</p>
										</div>
									</div>
								</div>

								<div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
									<a href='/quote' className='btn btn-primary' style={{ minWidth: "140px" }}>
										{isMn ? "Үнийн санал" : "Get a Quote"}
									</a>
									<a href='/support' className='btn btn-secondary' style={{ minWidth: "140px" }}>
										{isMn ? "Холбоо барих" : "Contact Us"}
									</a>
								</div>
							</div>
						</div>

						{/* Map */}
						<div style={{ marginBottom: "40px" }}>
							<h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", color: "#1a1a1a" }}>
								{isMn ? "Газрын зураг" : "Map"}
							</h3>
							<div style={{ width: "100%", height: "400px", borderRadius: "4px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
								<iframe
									src={loc.mapEmbedUrl}
									width='100%'
									height='100%'
									style={{ border: 0 }}
									allowFullScreen
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									title='Barloworld Mongolia Location'
								/>
							</div>
							<div style={{ marginTop: "10px", textAlign: "right" }}>
								<a
									href='https://www.google.com/maps/search/Barloworld+Mongolia'
									target='_blank'
									rel='noopener noreferrer'
									style={{ fontSize: "13px", color: "#FFBE00", fontWeight: 600 }}
								>
									{isMn ? "Google Maps дээр нээх ↗" : "Open in Google Maps ↗"}
								</a>
							</div>
						</div>

					</main>
				</div>
			</article>
		</>
	);
}
