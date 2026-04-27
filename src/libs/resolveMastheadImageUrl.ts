/**
 * Mastheads store `imageurl` as either an absolute URL, a site path (`/…`), or a storage key (`masthead/…`).
 * `next/image` requires http(s) or a path starting with `/`.
 */
export function resolveMastheadImageUrl(
	imageurl: string | null | undefined
): string | null {
	const raw = imageurl?.trim();
	if (!raw) return null;
	if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
	if (raw.startsWith("/")) return raw;
	const base = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");
	if (base) return `${base}/${raw}`;
	/* Storage key without CDN base — omit image (same as admin preview). */
	return null;
}
