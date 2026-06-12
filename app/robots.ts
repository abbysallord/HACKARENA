import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hackarena.dev'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Add any private routes you don't want indexed here
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
