import { forwardRef, useState, type ImgHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden',
          !showImage && 'bg-[var(--glass-bg)] border border-[var(--glass-border)]',
          sizes[size],
          className
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover rounded-full"
            {...props}
          />
        ) : (
          <span
            className="font-medium text-[var(--color-grey-400)] select-none"
            aria-hidden={!!alt}
          >
            {fallback || ''}
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
