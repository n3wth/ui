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
  backgroundColor: '#08090b',
}

const logoStyle: CSSProperties = {
  width: '80px',
  height: '80px',
  marginBottom: '40px',
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
        viewBox="0 0 32 32"
        style={logoStyle}
      >
        <path
          d="M9.4 6.6 25.2 14a1.5 1.5 0 0 1-.15 2.78l-6.1 1.78a2 2 0 0 0-1.32 1.24l-2.2 6.1c-.5 1.36-2.42 1.27-2.78-.15L8.0 8.2A1.6 1.6 0 0 1 9.4 6.6Z"
          fill="#ffffff"
        />
      </svg>
      <div style={titleStyle}>{title}</div>
    </div>
  )
}
