import type { MetadataRoute } from "next";
import { getPublishedRecipes } from "@/lib/recipes";

const SITE_URL = "https://gocbepmonquetrenpho.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/videos`, changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE_URL}/cong-thuc`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/san-pham`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gioi-thieu`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/dieu-khoan`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const recipeRoutes: MetadataRoute.Sitemap = getPublishedRecipes().map((recipe) => ({
    url: `${SITE_URL}/cong-thuc/${recipe.slug}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...recipeRoutes];
}
