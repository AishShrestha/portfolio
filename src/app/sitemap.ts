import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = ['', '#about', '#skills', '#projects', '#experience', '#blog', '#contact'];
  return sections.map((section) => ({
    url: `${siteConfig.url}/${section}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: section === '' ? 1 : 0.8,
  }));
}