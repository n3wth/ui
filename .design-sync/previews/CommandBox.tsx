import { CommandBox } from '@n3wth/ui'

const stack = { display: 'flex', flexDirection: 'column' as const, gap: 12, maxWidth: 420 }

export function Variants() {
  return (
    <div style={stack}>
      <CommandBox command="npm install @n3wth/ui" />
      <CommandBox command="npm install @n3wth/ui" variant="primary" />
    </div>
  )
}

export function NoCopyButton() {
  return (
    <div style={stack}>
      <CommandBox command="git clone https://github.com/n3wth/ui.git" showCopyButton={false} />
    </div>
  )
}
