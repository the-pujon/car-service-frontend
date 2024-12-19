import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
}

export function LazyImage({ src, alt, className, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const handleRetry = () => {
    if (retryCount < 3) {
      setHasError(false)
      setIsLoading(true)
      setRetryCount(prev => prev + 1)
    }
  }

  // Convert imgbb URL to a more reliable format
  const getOptimizedUrl = (url: string) => {
    if (url.includes('i.ibb.co')) {
      // Add a timestamp to prevent caching issues
      return `${url}?t=${Date.now()}`
    }
    return url
  }

  return (
    <div className={cn('relative w-full h-full', className)}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center">
          <p className="text-sm text-muted-foreground mb-2">Failed to load image</p>
          {retryCount < 3 && (
            <button
              onClick={handleRetry}
              className="text-xs text-primary hover:text-primary/80"
            >
              Retry
            </button>
          )}
        </div>
      ) : (
        <img
          src={getOptimizedUrl(src)}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-all duration-300',
            isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          )}
          onLoad={() => {
            setIsLoading(false)
            setHasError(false)
          }}
          onError={() => {
            console.error(`Failed to load image: ${src}`)
            setIsLoading(false)
            setHasError(true)
          }}
          {...props}
        />
      )}
    </div>
  )
} 