import { useState } from 'react'

export default function LazyImage({ src, alt, className, eager = false }) {
  const [loadedSrc, setLoadedSrc] = useState(null)
  const loaded = loadedSrc === src
  return (
    <>
      {!loaded && <div className="uape-skeleton absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoadedSrc(src)}
        onError={() => setLoadedSrc(src)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </>
  )
}
