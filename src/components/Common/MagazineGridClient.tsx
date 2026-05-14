"use client";
import { useState } from "react";

type Item = {
	id: string;
	title: string;
	number: string | null;
	date: string | null;
	url: string | null;
	image: string | null;
};

function MagazineCard({ item }: { item: Item }) {
	const [hovered, setHovered] = useState(false);

	return (
		<a
			href={item.url ?? "#"}
			target='_blank'
			rel='noopener noreferrer'
			style={{ textDecoration: "none", color: "inherit", display: "block" }}
		>
			<div
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					position: "relative",
					width: "100%",
					aspectRatio: "3/4",
					background: "#f3f3f3",
					overflow: "hidden",
					marginBottom: "10px",
					boxShadow: hovered
						? "3px 8px 20px rgba(0,0,0,0.22)"
						: "3px 4px 12px rgba(0,0,0,0.15)",
					transform: hovered ? "translateY(-4px)" : "translateY(0)",
					transition: "transform 0.2s, box-shadow 0.2s",
				}}
			>
				{item.image ? (
					<img
						src={item.image}
						alt={item.title}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
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
							background: "#222",
						}}
					>
						<span
							style={{
								color: "#FFBE00",
								fontWeight: 900,
								fontSize: "18px",
								opacity: 0.6,
							}}
						>
							CAT
						</span>
					</div>
				)}

				{item.number && (
					<div
						style={{
							position: "absolute",
							top: "8px",
							right: "8px",
							background: "#FFBE00",
							color: "#000",
							fontWeight: 700,
							fontSize: "11px",
							padding: "2px 7px",
							lineHeight: 1.6,
						}}
					>
						#{item.number}
					</div>
				)}
			</div>

			<p
				style={{
					fontWeight: 700,
					fontSize: "13px",
					color: "#1a1a1a",
					marginBottom: "2px",
				}}
			>
				{item.title}
			</p>
			{item.date && (
				<p style={{ fontSize: "12px", color: "#888" }}>{item.date}</p>
			)}
		</a>
	);
}

export default function MagazineGridClient({ items }: { items: Item[] }) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
				gap: "28px",
				paddingTop: "8px",
				paddingBottom: "40px",
			}}
		>
			{items.map((item) => (
				<MagazineCard key={item.id} item={item} />
			))}
		</div>
	);
}
