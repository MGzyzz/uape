import { useState, useEffect } from 'react'
import arrowLeftIcon from '../../../shared/assets/icons/arrow-left.svg'
import arrowRightIcon from '../../../shared/assets/icons/arrow-right.svg'
import favoriteActiveIcon from '../../../shared/assets/icons/favorite-icon.svg'
import favoriteInactiveIcon from '../../../shared/assets/icons/nonactive-favorite-icon.svg'
import { getSections, getRecommended, addBookmark, removeBookmark } from '../../../api/courses.js'

// ─── Small UI pieces ──────────────────────────────────────────────────────────

function FavoriteIcon({ active }) {
  return (
    <img
      src={active ? favoriteActiveIcon : favoriteInactiveIcon}
      width={22}
      height={28}
      alt=""
    />
  )
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span key={tag.id ?? tag.name} className="uape-learn-tag" style={{ color: tag.color }}>
          {tag.name}
        </span>
      ))}
    </div>
  )
}

function NavArrows({ onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={canPrev ? onPrev : undefined}
        aria-disabled={!canPrev}
        className={`uape-learn-nav-arrow-btn${canPrev ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
        aria-label="Previous"
      >
        <img src={arrowLeftIcon} alt="" width={11} height={17} />
      </button>
      <button
        onClick={canNext ? onNext : undefined}
        aria-disabled={!canNext}
        className={`uape-learn-nav-arrow-btn${canNext ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
        aria-label="Next"
      >
        <img src={arrowRightIcon} alt="" width={11} height={17} />
      </button>
    </div>
  )
}

// ─── Lazy image with shimmer placeholder ──────────────────────────────────────

function LazyImage({ src, alt, className }) {
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

// ─── Skeleton cards ────────────────────────────────────────────────────────────

function SkeletonContentCard() {
  return (
    <div className="uape-learn-content-card">
      <div className="uape-learn-thumb-wrap">
        <div className="uape-learn-thumb-frame" style={{ aspectRatio: '16/9' }}>
          <div className="uape-skeleton" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
        </div>
      </div>
      <div className="uape-learn-card-body" style={{ gap: 12 }}>
        <div className="uape-skeleton" style={{ height: 28, width: '80%' }} />
        <div className="uape-skeleton" style={{ height: 20, width: '50%' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="uape-skeleton" style={{ height: 20, width: 70, borderRadius: 10 }} />
          <div className="uape-skeleton" style={{ height: 20, width: 70, borderRadius: 10 }} />
        </div>
        <div className="uape-skeleton" style={{ height: 44, width: 140, marginTop: 'auto' }} />
      </div>
    </div>
  )
}

function SkeletonSection() {
  const skeletonItems = [0, 1, 2]
  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header">
        <div className="uape-skeleton" style={{ height: 32, width: 240 }} />
      </div>
      <div className={`uape-learn-cards-row${skeletonItems.length === 3 ? ' uape-learn-cards-row-full' : ''}`}>
        {skeletonItems.map((i) => (
          <div key={i} style={{ flex: '0 0 auto', minWidth: 0 }}>
            <SkeletonContentCard />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Playlist / Video card ────────────────────────────────────────────────────

function ContentCard({ item, buttonLabel, onToggle }) {
  return (
    <div className="uape-learn-content-card">
      <div className="uape-learn-thumb-wrap">
        <div className="relative uape-learn-thumb-frame">
          <LazyImage
            src={item.image}
            alt={item.title}
            className="uape-learn-thumb-image"
          />
          <div className="uape-learn-badge">
            {item.badge}
          </div>
        </div>
      </div>

      <div className="uape-learn-card-body">
        <div className="uape-learn-title-row flex items-start gap-3">
          <h3 className="uape-learn-card-title">{item.title}</h3>
          <button
            onClick={() => onToggle(item.id)}
            className="uape-icon-button-reset"
            aria-label="Favourite"
          >
            <FavoriteIcon active={item.favorited} />
          </button>
        </div>

        <p className="uape-learn-meta">
          {item.author} • {item.followers}
        </p>

        <Tags tags={item.tags} />

        <div className="uape-learn-actions flex items-center gap-4">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
            {buttonLabel}
          </a>
          <a href={item.channelUrl} target="_blank" rel="noopener noreferrer" className="uape-learn-link-btn">
            Visit channel
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Channel card ─────────────────────────────────────────────────────────────

function ChannelCard({ item, onToggle }) {
  const initials = item.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="uape-learn-channel-card">
      <div className="flex items-start gap-3">
        <div className="uape-learn-channel-avatar">
          {item.avatar_url
            ? <img src={item.avatar_url} alt={item.name} className="h-full w-full object-cover rounded-full" />
            : initials
          }
        </div>

        <div className="uape-flex-1-min-w-0">
          <p className="uape-learn-channel-name">{item.name}</p>
          <p className="uape-learn-channel-followers">{item.followers}</p>
        </div>

        <button
          onClick={() => onToggle(item.id)}
          className="uape-icon-button-reset"
          aria-label="Favourite"
        >
          <FavoriteIcon active={item.favorited} />
        </button>
      </div>

      <p className="uape-learn-channel-description">{item.description}</p>

      <Tags tags={item.tags} />

      <div className="uape-learn-channel-footer">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
          Visit channel
        </a>
      </div>
    </div>
  )
}

// ─── Carousel section ─────────────────────────────────────────────────────────

function CarouselSection({ title, subtitle, items, renderCard }) {
  const [idx, setIdx] = useState(0)
  const perPage = 3
  const canPrev = idx > 0
  const canNext = idx + perPage < items.length
  const visible = items.slice(idx, idx + perPage)
  const rowClassName = `uape-learn-cards-row${visible.length === perPage ? ' uape-learn-cards-row-full' : ''}`

  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header flex items-start justify-between">
        <div>
          <h2 className="uape-learn-section-title">{title}</h2>
          {subtitle && <p className="uape-learn-section-subtitle">{subtitle}</p>}
        </div>
        <NavArrows
          onPrev={() => setIdx((i) => Math.max(0, i - 1))}
          onNext={() => setIdx((i) => Math.min(items.length - perPage, i + 1))}
          canPrev={canPrev}
          canNext={canNext}
        />
      </div>
      <div className={rowClassName}>
        {visible.map((item) => (
          <div key={item.id} style={{ flex: '0 0 auto', minWidth: 0 }}>
            {renderCard(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Channels section ─────────────────────────────────────────────────────────

function ChannelsSection({ title, items, onToggle }) {
  const [idx, setIdx] = useState(0)
  const perPage = 6
  const canPrev = idx > 0
  const canNext = idx + perPage < items.length
  const visible = items.slice(idx, idx + perPage)

  return (
    <div>
      <div className="uape-learn-section-header flex items-start justify-between">
        <h2 className="uape-learn-section-title">{title}</h2>
        <NavArrows
          onPrev={() => setIdx((i) => Math.max(0, i - perPage))}
          onNext={() => setIdx((i) => Math.min(items.length - perPage, i + perPage))}
          canPrev={canPrev}
          canNext={canNext}
        />
      </div>
      <div className="uape-learn-channels-grid">
        {visible.map((channel) => (
          <ChannelCard key={channel.id} item={channel} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function WhatToLearnNextSection() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const isAuth = Boolean(localStorage.getItem('access'))

  useEffect(() => {
    const fetches = [getSections()]
    if (isAuth) fetches.push(getRecommended().catch(() => null))

    Promise.all(fetches).then(([sections, recommended]) => {
      if (recommended && (recommended.playlists?.length > 0 || recommended.videos?.length > 0 || recommended.channels?.length > 0)) {
        setSections([recommended, ...sections])
      } else {
        setSections(sections)
      }
    }).catch(() => {}).finally(() => setLoading(false))
  }, [isAuth])

  function toggleFavorite(sectionId, contentType, itemId) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section
        const key = contentType === 'playlist' ? 'playlists' : contentType === 'video' ? 'videos' : 'channels'
        return {
          ...section,
          [key]: section[key].map((item) =>
            item.id === itemId ? { ...item, favorited: !item.favorited } : item
          ),
        }
      })
    )

    if (!isAuth) return
    const section = sections.find((s) => s.id === sectionId)
    const key = contentType === 'playlist' ? 'playlists' : contentType === 'video' ? 'videos' : 'channels'
    const item = section?.[key]?.find((i) => i.id === itemId)
    if (!item) return

    if (item.favorited) {
      removeBookmark(contentType, itemId).catch(() => {})
    } else {
      addBookmark(contentType, itemId).catch(() => {})
    }
  }

  if (loading) {
    return (
      <section className="uape-learn-root">
        <div className="uape-learn-root-inner uape-page-container">
          <h1 className="uape-learn-page-title">What to learn next</h1>
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </section>
    )
  }

  if (sections.length === 0) return null

  return (
    <section className="uape-learn-root">
      <div className="uape-learn-root-inner uape-page-container">
        <h1 className="uape-learn-page-title">What to learn next</h1>

        {sections.map((section) => {
          if (section.content_type === 'playlist' && section.playlists.length > 0) {
            return (
              <CarouselSection
                key={section.id}
                title={section.title}
                subtitle={section.subtitle}
                items={section.playlists}
                renderCard={(item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    buttonLabel="View playlist"
                    onToggle={(id) => toggleFavorite(section.id, 'playlist', id)}
                  />
                )}
              />
            )
          }

          if (section.content_type === 'video' && section.videos.length > 0) {
            return (
              <CarouselSection
                key={section.id}
                title={section.title}
                subtitle={section.subtitle}
                items={section.videos}
                renderCard={(item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    buttonLabel="View video"
                    onToggle={(id) => toggleFavorite(section.id, 'video', id)}
                  />
                )}
              />
            )
          }

          if (section.content_type === 'channel' && section.channels.length > 0) {
            return (
              <ChannelsSection
                key={section.id}
                title={section.title}
                items={section.channels}
                onToggle={(id) => toggleFavorite(section.id, 'channel', id)}
              />
            )
          }

          return null
        })}
      </div>
    </section>
  )
}
