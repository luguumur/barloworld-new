import { getTeamsPublic, TeamRow } from "@/actions/team";
import { cookies } from "next/headers";

function resolveImage(image: string | null): string | null {
	if (!image?.trim()) return null;
	if (image.startsWith("http")) return image;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL;
	return base ? `${base.replace(/\/$/, "")}/${image}` : null;
}

function MemberCard({ member, lang }: { member: TeamRow; lang: "mn" | "en" }) {
	const name = lang === "mn" ? member.name : member.name_en;
	const pos = lang === "mn" ? member.pos : member.pos_en;
	const src = resolveImage(member.image);

	return (
		<div
			style={{
				width: "calc(25% - 20px)",
				minWidth: "160px",
				flex: "0 0 auto",
				marginBottom: "40px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				textAlign: "center",
			}}
		>
			{/* photo */}
			<div
				style={{
					width: "180px",
					height: "180px",
					// borderRadius: "50%",
					overflow: "hidden",
					border: "5px solid #FFBE00",
					marginBottom: "16px",
					flexShrink: 0,
					background: "#f0f0f0",
				}}
			>
				{src ? (
					<img
						src={src}
						alt={name}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "top center",
							display: "block",
						}}
					/>
				) : (
					<div
						style={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							color: "#aaa",
						}}
					>
						<svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
							<path
								d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				)}
			</div>

			{/* name */}
			<p
				style={{
					fontWeight: 700,
					fontSize: "15px",
					color: "#1a1a1a",
					marginBottom: "6px",
					lineHeight: 1.3,
					textTransform: "uppercase",
					letterSpacing: "0.03em",
				}}
			>
				{name}
			</p>

			{/* position */}
			<p
				style={{
					fontSize: "13px",
					color: "#555",
					lineHeight: 1.5,
					maxWidth: "160px",
					margin: "0 auto",
				}}
			>
				{pos}
			</p>
		</div>
	);
}

export default async function LeadershipSection() {
	const cookieStore = await cookies();
	const lang = cookieStore.get("lang")?.value === "mn" ? "mn" : "en";
	const members = await getTeamsPublic();

	if (!members.length) return null;

	return (
		<section style={{ paddingTop: "32px", paddingBottom: "32px" }}>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "20px",
				}}
			>
				{members.map((member) => (
					<MemberCard key={member.id} member={member} lang={lang} />
				))}
			</div>
		</section>
	);
}
