import { useState } from 'react'

export default function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <div className="uape-skeleton absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </>
  )
}
