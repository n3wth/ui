import { cn } from '../../src/utils/cn'

export interface PropDefinition {
  name: string
  type: string
  required?: boolean
  defaultValue?: string
  description?: string
}

interface PropsTableProps {
  props: PropDefinition[]
  className?: string
}

export function PropsTable({ props, className }: PropsTableProps) {
  if (!props || props.length === 0) {
    return null
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--glass-border)]">
            <th className="text-left py-3 px-4 font-medium text-[var(--color-grey-400)] text-xs uppercase tracking-wider">
              Prop
            </th>
            <th className="text-left py-3 px-4 font-medium text-[var(--color-grey-400)] text-xs uppercase tracking-wider">
              Type
            </th>
            <th className="text-left py-3 px-4 font-medium text-[var(--color-grey-400)] text-xs uppercase tracking-wider">
              Default
            </th>
            <th className="text-left py-3 px-4 font-medium text-[var(--color-grey-400)] text-xs uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-[var(--glass-border)] last:border-b-0"
            >
              <td className="py-3 px-4">
                <code className="text-[var(--color-mint)] font-mono text-xs">
                  {prop.name}
                  {prop.required && (
                    <span className="text-[var(--color-coral)] ml-1">*</span>
                  )}
                </code>
              </td>
              <td className="py-3 px-4">
                <code className="text-[var(--color-sage)] font-mono text-xs">
                  {prop.type}
                </code>
              </td>
              <td className="py-3 px-4">
                {prop.defaultValue ? (
                  <code className="text-[var(--color-gold)] font-mono text-xs">
                    {prop.defaultValue}
                  </code>
                ) : (
                  <span className="text-[var(--color-grey-400)] text-xs">—</span>
                )}
              </td>
              <td className="py-3 px-4 text-[var(--color-grey-400)]">
                {prop.description || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
