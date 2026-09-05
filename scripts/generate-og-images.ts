import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pages = [
  { slug: 'home', title: '@n3wth/ui', subtitle: 'Flat, Minimal Design System' },
  { slug: 'getting-started', title: 'Getting Started', subtitle: '@n3wth/ui Documentation' },
  { slug: 'theming', title: 'Theming', subtitle: '@n3wth/ui Documentation' },
  { slug: 'components', title: 'Components', subtitle: '@n3wth/ui Documentation' },
  { slug: 'hooks', title: 'Hooks', subtitle: '@n3wth/ui Documentation' },
  { slug: 'css-utilities', title: 'CSS Utilities', subtitle: '@n3wth/ui Documentation' },
]

const satoshiBold = readFileSync(resolve(__dirname, '../public/fonts/Satoshi-Bold.ttf'))
const satoshiMedium = readFileSync(resolve(__dirname, '../public/fonts/Satoshi-Medium.ttf'))

const width = 1200
const height = 630

async function generateOGImage(title: string, subtitle: string): Promise<Buffer> {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#08090b',
          padding: '60px',
        },
        children: [
          {
            type: 'svg',
            props: {
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 32 32',
              width: 72,
              height: 72,
              style: { marginBottom: '32px' },
              children: [
                {
                  type: 'path',
                  props: {
                    d: "M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z",
                    fill: '#ffffff',
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '64px',
                fontWeight: 700,
                fontFamily: 'Satoshi',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: '28px',
                fontWeight: 500,
                fontFamily: 'Satoshi',
                color: '#86868b',
                textAlign: 'center',
                letterSpacing: '-0.01em',
              },
              children: subtitle,
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshiBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: satoshiMedium,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  })
  return resvg.render().asPng()
}

async function main() {
  const outDir = resolve(__dirname, '../public/og')
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
  }

  for (const page of pages) {
    console.log(`Generating OG image for: ${page.slug}`)
    const png = await generateOGImage(page.title, page.subtitle)
    const outPath = resolve(outDir, `${page.slug}.png`)
    writeFileSync(outPath, png)
    console.log(`  -> ${outPath}`)
  }

  console.log('\nDone! Generated OG images in public/og/')
}

main().catch(console.error)
