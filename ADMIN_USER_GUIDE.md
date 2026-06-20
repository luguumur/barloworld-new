# Barloworld Mongolia — Admin User Guide

**Website:** barloworld-new.vercel.app  
**Admin URL:** `/admin`  
**Access:** ADMIN role required. Log in at `/auth/signin` with your admin credentials.

---

## Table of Contents

1. [Overview](#overview)
2. [Admin Sections](#admin-sections)
3. [Image Asset Requirements](#image-asset-requirements)
4. [Bilingual Content Rules](#bilingual-content-rules)

---

## Overview

The admin panel manages all public website content — banners, products, news, deals, people, and more. Every section follows the same pattern:

- **List page** — view, search, and delete existing records
- **New page** — create a new record (`+ New` button, top right)
- **Edit page** — click the edit icon on any row

Changes are **live immediately** after saving — there is no draft/publish step (except Products, which have a Status field).

---

## Admin Sections

### Dashboard `/admin`

Overview of site statistics: product count, news count, contact/quote request counts, and a recent-requests table.

---

### Mastheads `/admin/mastheads`

Homepage hero slider banners. Each masthead is one slide in the top banner carousel.

| Field | Required | Notes |
|---|---|---|
| Title (MN) | Yes | Mongolian headline text |
| Title (EN) | Yes | English headline text |
| Subtitle (MN) | No | Smaller text below the title |
| Subtitle (EN) | No | |
| Description (MN) | Yes | Body text shown on the slide |
| Description (EN) | Yes | |
| Link URL | No | Button/link destination (e.g. `/products`) |
| Image | No | Full-width banner photo |

---

### Home Main `/admin/home-main`

Controls the homepage "Main" section content and its feature cards.

**Content form** — edits the heading, body text, and button labels for the main section.

**Cards** `/admin/home-main/cards` — individual feature cards displayed in the Main section grid.

| Field | Required | Notes |
|---|---|---|
| Title (MN / EN) | Yes | Card headline |
| Description (MN / EN) | Yes | Card body |
| Link URL | No | Card click destination |
| Image | No | Card illustration/photo |

---

### News `/admin/news`

News and press release articles shown on the News page.

| Field | Required | Notes |
|---|---|---|
| Title (MN) | Yes | |
| Title (EN) | Yes | |
| Subtitle (MN / EN) | No | Short teaser line |
| Category | Yes | Must select from existing News Categories |
| Thumbnail | No | Cover image for list cards and article header |
| Content (MN) | Yes | Full article body (HTML supported) |
| Content (EN) | Yes | |

### News Categories `/admin/news-category`

Tag labels used to filter news (e.g. "Press Release", "Events"). Create categories here before adding news articles that need them.

| Field | Required |
|---|---|
| Name (MN) | Yes |
| Name (EN) | Yes |

---

### Deals & Specials `/admin/deals`

Promotional offers shown in the Deals slider and grid on the homepage.

| Field | Required | Notes |
|---|---|---|
| Title (MN) | Yes | |
| Title (EN) | Yes | |
| Subtitle (MN / EN) | No | |
| Description (MN) | Yes | Deal details |
| Description (EN) | Yes | |
| Status | No | `active` shows the deal publicly; any other value hides it |
| Image | No | Promotional photo |

---

### Magazines `/admin/magazines`

Company magazine issue listings (each links to a PDF).

| Field | Required | Notes |
|---|---|---|
| Title (MN) | Yes | Magazine issue name |
| Title (EN) | Yes | |
| Issue Number | No | e.g. `12` |
| Date | No | Publication date |
| URL | No | Link to the PDF file |
| Cover Image | No | Magazine cover photo |

---

### Pages `/admin/pages`

Custom static pages accessible via their slug (e.g. `/about`).

| Field | Required | Notes |
|---|---|---|
| Title (MN / EN) | Yes | Page heading |
| Slug | Yes | URL path segment — no spaces, lowercase (e.g. `about-us`) |
| Content (MN) | Yes | Page body (HTML supported) |
| Content (EN) | Yes | |

---

### Translations `/admin/translations`

UI string overrides for the website's Mongolian and English interface labels (button text, section headings, etc.). Only edit entries that exist — do not delete.

---

### Products `/admin/products`

The product catalog. Products appear on the Products page and in the Equipment Search widget.

| Field | Required | Notes |
|---|---|---|
| Name (MN) | Yes | |
| Name (EN) | Yes | |
| Description (MN) | Yes | Full description (HTML supported) |
| Description (EN) | Yes | |
| Category | Yes | Must exist in Product Categories |
| Product Type | No | Filter tag |
| Price | No | Display price (text, not enforced format) |
| Status | No | `active` = visible; anything else = hidden |
| Sort Order | No | Integer — lower numbers appear first |
| Main Image | No | Primary product photo |
| Brochure (PDF) | No | Downloadable spec sheet |
| 3D Model URL | No | Link to external 3D viewer |
| Video Link | No | YouTube or external video URL |
| Attributes | No | Technical specs (add rows via the Attributes tab) |

Additional images can be added via the **"+ Add image"** button within the product form.

### Product Categories `/admin/product-categories`

Top-level groupings of products (e.g. "Excavators", "Wheel Loaders").

| Field | Required |
|---|---|
| Name (MN) | Yes |
| Name (EN) | Yes |
| Image | No |

### Product Types `/admin/product-types`

Sub-type filter tags used on the Products listing page.

| Field | Required |
|---|---|
| Name (MN) | Yes |
| Name (EN) | Yes |
| Image | No |

### Attributes `/admin/attributes`

Specification attribute names (e.g. "Operating Weight", "Engine Power"). Assigned per product.

### Attribute Value Groups `/admin/attribute-value-groups`

Groups of values for a given attribute (e.g. the "Engine Power" attribute might have a group "Tier 4 Final").

---

### Management `/admin/management`

Company leadership profiles shown on the About / Management page.

| Field | Required | Notes |
|---|---|---|
| Name | Yes | Full name |
| Position | Yes | Job title |
| Photo | No | Headshot |
| Sort Order | No | Integer — lower numbers appear first |

---

### Team `/admin/team`

Staff directory entries.

| Field | Required | Notes |
|---|---|---|
| Name (MN) | Yes | |
| Name (EN) | Yes | |
| Position (MN) | Yes | |
| Position (EN) | Yes | |
| Photo | No | |
| Sort Order | No | |

---

### Testimonials `/admin/testimonials`

Customer testimonial cards shown in the homepage carousel.

| Field | Required | Notes |
|---|---|---|
| Customer Name (MN) | Yes | Displayed as card title |
| Customer Name (EN) | Yes | |
| Company / Role (MN) | No | Subtitle line |
| Company / Role (EN) | No | |
| Quote (MN) | Yes | Testimonial body text |
| Quote (EN) | Yes | |
| Photo / Avatar | No | Customer photo |
| Video URL | No | Optional video testimonial link |

---

### Menu `/admin/menu`

Navigation menu structure. Each item can have a parent (for dropdowns).

| Field | Required | Notes |
|---|---|---|
| Label (MN) | Yes | |
| Label (EN) | Yes | |
| URL | Yes | Path or full URL |
| Parent | No | Set to create a dropdown child item |
| Sort Order | No | |

---

### Location `/admin/location`

Dealership address, phone, and map details shown in the Contact / Footer sections.

---

### Contact Requests `/admin/contact-requests`

Read-only inbox of contact form submissions from the website. Cannot be created from the admin panel — these come from site visitors.

### Quote Requests `/admin/quote-requests`

Read-only inbox of product quote requests submitted via product pages.

---

### Manage Users `/admin/manage-users`

Create, view, and manage user accounts. Two roles exist:

| Role | Access |
|---|---|
| `ADMIN` | Full admin panel access |
| `USER` | User dashboard only (`/user/*`), no admin access |

---

### Send Newsletter `/admin/send-newsletter`

Compose and send an email broadcast to all subscribed users.

### Send Notification `/admin/send-notification`

Send a push notification to all registered users.

---

## Image Asset Requirements

All images are uploaded directly to S3. The system enforces the following global limits:

| Constraint | Value |
|---|---|
| **Max file size** | 2 MB |
| **Accepted formats** | PNG, JPEG (Mastheads also accept WebP) |

### Recommended Dimensions by Content Type

| Section | Recommended Size | Aspect Ratio | Notes |
|---|---|---|---|
| **Masthead** (hero slider) | 1920 × 600 px | 16:5 | Full-width banner; keep important content centered. PNG, JPEG, or WebP. |
| **Deals & Specials** | 900 × 560 px | 16:10 | Slider card image; use 1800×1120 for retina displays. |
| **News** (thumbnail) | 800 × 500 px | 16:10 | Cover shown on news list cards and article header. |
| **Product** (main image) | 1200 × 900 px | 4:3 | Displayed in product grid cards and the detail page gallery. |
| **Product** (additional images) | 1200 × 900 px | 4:3 | Same slot as main image; keep consistent. |
| **Product Category** | 600 × 400 px | 3:2 | Category tile image. |
| **Product Type** | 600 × 400 px | 3:2 | Type filter tile image. |
| **Home Cards** | 600 × 400 px | 3:2 | Feature card images in the homepage Main section. |
| **Magazine** (cover) | 600 × 800 px | 3:4 | Portrait — matches a standard magazine cover layout. |
| **Management** (headshot) | 400 × 500 px | 4:5 | Portrait crop; ensure face is centered in the upper half. |
| **Team** (headshot) | 400 × 500 px | 4:5 | Same as Management. |
| **Testimonials** (avatar) | 400 × 400 px | 1:1 | Square crop; displayed at 60×60 px but upload larger for quality. |

### General Photography Guidelines (for the marketing team)

- Shoot or export at the recommended size or larger — the site scales down automatically, never up.
- Keep file size under 2 MB. For large photos, compress with tools like [Squoosh](https://squoosh.app) or [TinyPNG](https://tinypng.com) before uploading.
- Hero/masthead images: ensure the main subject (equipment, headline text area) is in the **center** of the frame, as the image is cropped on smaller screens.
- People photos (Management, Team): use a **plain or blurred background**; consistent lighting across all headshots looks best in the grid layout.
- Product images: **white or neutral grey background** is preferred for consistency across the product catalog.
- Avoid embedding text into images — all text is managed separately in the admin fields so it renders in both languages.

---

## Bilingual Content Rules

Every content item has a Mongolian (primary) and English (`_en`) version of all text fields. **Both are required** unless the field is explicitly optional.

- The website displays the correct language based on the visitor's language preference cookie.
- If an English field is left blank, that content may appear empty or fall back to Mongolian on the English version of the site.
- Always fill in both `(MN)` and `(EN)` fields before saving.
