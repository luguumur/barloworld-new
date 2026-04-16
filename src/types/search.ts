/** Shape aligned with Algolia hits used by GlobalSearch / CustomHits */
export type SiteSearchHit = {
	objectID: string;
	title: string;
	url: string;
	type: string;
	imageURL?: string;
};
