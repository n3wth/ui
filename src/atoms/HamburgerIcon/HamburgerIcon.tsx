import { type SVGProps } from 'react'
import { cn } from '../../utils/cn'

export interface HamburgerIconProps extends SVGProps<SVGSVGElement> {
  /** Whether the menu is open (shows X) or closed (shows hamburger) */
  isOpen: boolean
  /** Size of the icon */
  size?: number
}

export function HamburgerIcon({
  isOpen,
  size = 24,
  className,
  ...props
}: HamburgerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('transition-transform duration-300', className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d={isOpen ? 'M18 6L6 18' : 'M4 6h16'}
        className="origin-center transition-all duration-300"
      />
      <path
        d={isOpen ? 'M6 6l12 12' : 'M4 12h16'}
        className={cn(
          'origin-center transition-all duration-300',
          isOpen && 'opacity-0'
        )}
      />
      {!isOpen && <path d="M4 18h16" />}
    </svg>
  )
}
