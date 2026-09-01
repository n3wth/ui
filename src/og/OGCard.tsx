import type { CSSProperties, ReactElement } from 'react'

export interface OGCardProps {
  title: string
}

const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  padding: '80px',
}

const logoStyle: CSSProperties = {
  width: '120px',
  height: '120px',
  marginBottom: '48px',
}

const titleStyle: CSSProperties = {
  fontSize: '72px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
}

export function OGCard({ title }: OGCardProps): ReactElement {
  return (
    <div style={containerStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        style={logoStyle}
      >
        <path
          d="M36 24 L36 68 L47 57 L54 74 L61 71 L54 54 L70 54 Z"
          fill="#ffffff"
        />
      </svg>
      <div style={titleStyle}>{title}</div>
    </div>
  )
}
