export function resolveImageUrl(
	path: string | null | undefined,
	fallback: string
): string;
export function resolveImageUrl(
	path: string | null | undefined,
	fallback?: string | null
): string | null;
export function resolveImageUrl(
	path: string | null | undefined,
	fallback?: string | null
): string | null {
	const raw = path?.trim();

	if (!raw) return fallback ?? null;
	if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
	if (raw.startsWith("//")) return `https:${raw}`;
	if (raw.startsWith("/")) return raw;

	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	return base ? `${base}/${raw}` : raw;
}
