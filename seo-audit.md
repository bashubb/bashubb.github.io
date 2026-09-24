# SEO and favicon review — 2026-09-24

Scope: Bashubb studio homepage and ten Shrink pages, including guides and privacy.

Validated locally: unique titles, descriptions, one H1 per page, canonical URLs on bashubb.com, absence of noindex, JSON-LD syntax and local asset/navigation targets. Root robots.txt allows crawling and advertises both sitemaps. Essential copy and links exist in server-delivered HTML. The studio targets brand discovery; photo-compression guides remain under /shrink/.

Changes: clarified the studio meta description; matched theme color to the redesign; removed the unverified $3.99 unlock price from Shrink structured data. Free download and one-time purchase remain correctly distinguished.

Favicons: original rectangular raster assets do not inherit the CSS rounding applied to page logos. Shrink's white corners were baked into its square WebP; Bashubb had a large internal black margin. Dedicated self-contained SVG favicons use the existing artwork, rounded clipping and transparent corners. Bashubb's artwork is enlarged within its favicon only. Original app icons, social images and Apple touch icons are preserved. Browser rendering checks confirmed transparent outer corners and opaque centers. Older browsers without SVG favicon support may retain a raster fallback or touch icon.

Limits: this is a technical audit, not proof of Google indexing, rankings, Core Web Vitals or rich-result eligibility. Search Console account data was not accessed. Valid JSON-LD does not guarantee a rich result. Google selects one favicon per hostname, so /shrink/ cannot have a separate Google Search favicon from bashubb.com. Recrawling and browser favicon caches can delay changes.

Reference: https://developers.google.com/search/docs/appearance/favicon-in-search
