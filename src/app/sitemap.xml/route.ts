export async function GET() {
  const pages = [
    "/", 
    "/privacy-policy",
    "/contact",
    "/about",
    "/terms-and-conditions",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>https://www.compressclick.com${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
