import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

const title = '@n3wth/ui'

async function fetchFont() {
  const response = await fetch(
    'https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap'
  )
  const css = await response.text()
  const urlMatch = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)
  if (!urlMatch) throw new Error('Could not find font URL')
  
  const fontResponse = await fetch(urlMatch[1])
  return fontResponse.arrayBuffer()
}

const element = {
  type: 'div',
  props: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      padding: '80px',
    },
    children: [
      {
        type: 'svg',
        props: {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 32 32',
          width: 120,
          height: 120,
          style: { marginBottom: '48px' },
          children: {
            type: 'path',
            props: {
              d: 'M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z',
              fill: '#ffffff',
            },
          },
        },
      },
      {
        type: 'div',
        props: {
          style: {
            fontSize: '72px',
            fontFamily: 'Inter',
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          },
          children: title,
        },
      },
    ],
  },
}

async function generateOGImage() {
  const fontData = await fetchFont()

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ],
  })

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  const outputPath = join(rootDir, 'public/og-image.png')
  writeFileSync(outputPath, pngBuffer)
  console.log(`Generated OG image at ${outputPath}`)
}

generateOGImage().catch(console.error)
