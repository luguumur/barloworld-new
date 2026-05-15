export const PRODUCT_PAGE_SIZE = 20;

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50] as const;
export type PageSizeOption = (typeof PAGE_SIZE_OPTIONS)[number];
export const ADMIN_PAGE_SIZE_COOKIE = "admin_page_size";
export const DEFAULT_PAGE_SIZE: PageSizeOption = 10;
