import { Helmet } from 'react-helmet-async'

export interface SEOProps {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

const BASE_URL = 'https://ui.n3wth.com'
const SITE_NAME = '@n3wth/ui'
const TWITTER_HANDLE = '@olivernewth'

export function SEO({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = `${BASE_URL}${path}`
  const imageUrl = ogImage ? `${BASE_URL}${ogImage}` : `${BASE_URL}/og/home.png`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} — ${SITE_NAME}`} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
    </Helmet>
  )
}

export interface JsonLdWebSiteProps {
  name?: string
  url?: string
  description?: string
}

export function JsonLdWebSite({
  name = SITE_NAME,
  url = BASE_URL,
  description = 'Atomic design system for React applications. Flat, minimal, iOS-inspired components built on Tailwind CSS 4.',
}: JsonLdWebSiteProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: 'Oliver Newth',
      url: 'https://n3wth.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'n3wth',
      url: 'https://n3wth.com',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export interface JsonLdSoftwareApplicationProps {
  name?: string
  description?: string
  url?: string
  version?: string
}

export function JsonLdSoftwareApplication({
  name = SITE_NAME,
  description = 'Atomic design system for React applications. Flat, minimal, iOS-inspired components built on Tailwind CSS 4 and Astryx primitives.',
  url = BASE_URL,
  version,
}: JsonLdSoftwareApplicationProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    ...(version && { softwareVersion: version }),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'Oliver Newth',
      url: 'https://n3wth.com',
    },
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: 'https://github.com/n3wth/ui',
    programmingLanguage: ['TypeScript', 'React', 'CSS'],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export interface JsonLdWebPageProps {
  title: string
  description: string
  url: string
}

export function JsonLdWebPage({ title, description, url }: JsonLdWebPageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: BASE_URL,
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export interface JsonLdBreadcrumbProps {
  items: Array<{ name: string; url: string }>
}

export function JsonLdBreadcrumb({ items }: JsonLdBreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
