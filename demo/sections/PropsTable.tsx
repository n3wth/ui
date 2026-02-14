import { type ReactNode } from 'react'

interface PropsTableProps {
  props: Array<{
    name: string
    type: string
    defaultValue?: string
    description: string
  }>
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="mt-6 mb-10 overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)]">
              <th className="px-4 py-3 font-medium text-[var(--color-grey-400)]">Prop</th>
              <th className="px-4 py-3 font-medium text-[var(--color-grey-400)]">Type</th>
              <th className="px-4 py-3 font-medium text-[var(--color-grey-400)]">Default</th>
              <th className="px-4 py-3 font-medium text-[var(--color-grey-400)]">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--glass-border)]">
            {props.map((prop) => (
              <tr key={prop.name} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[var(--color-white)]">{prop.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--color-sage)]">{prop.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--color-grey-400)]">
                  {prop.defaultValue || '-'}
                </td>
                <td className="px-4 py-3 text-[var(--color-grey-400)] leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
