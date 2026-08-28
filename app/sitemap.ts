import type { MetadataRoute } from "next";
import { CATEGORIES, CATEGORY_SLUGS, getPublishedRecipes } from "@/lib/recipes";
import { filterAvailableRecipes } from "@/lib/youtube-availability";

const SITE_URL = "https://gocbep.vercel.app";

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/videos`, changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE_URL}/cong-thuc`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/san-pham`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/gioi-thieu`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/dieu-khoan`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const availableRecipes = await filterAvailableRecipes(getPublishedRecipes());
  const recipeRoutes: MetadataRoute.Sitemap = availableRecipes.map((recipe) => ({
    url: `${SITE_URL}/cong-thuc/${recipe.slug}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/danh-muc/${CATEGORY_SLUGS[c]}`,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...recipeRoutes, ...categoryRoutes];
}
