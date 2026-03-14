import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSections, getRecommended, addBookmark, removeBookmark } from '../../../api/courses.js'
import LazyImage from '../../../shared/ui/LazyImage.jsx'
import CarouselSection from '../../../shared/ui/CarouselSection.jsx'
import FavoriteIcon from '../../../shared/ui/FavoriteIcon.jsx'
import ContentTags from '../../../shared/ui/ContentTags.jsx'
import { useAuth } from '../../../app/AuthContext.jsx'

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

function ContentCard({ item, buttonLabel, onToggle, contentType }) {
  const navigate = useNavigate()

  function handleCardClick() {
    if (contentType === 'playlist') {
      navigate(`/playlist/${item.id}`)
    }
  }

  return (
    <div
      className={`uape-learn-content-card${contentType === 'playlist' ? ' uape-learn-content-card-clickable' : ''}`}
      onClick={handleCardClick}
    >
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
            onClick={(e) => { e.stopPropagation(); onToggle(item.id) }}
            className="uape-icon-button-reset"
            aria-label="Favourite"
          >
            <FavoriteIcon active={item.favorited} />
          </button>
        </div>

        <p className="uape-learn-meta">
          {item.author} • {item.followers}
        </p>

        <ContentTags tags={item.tags} />

        <div className="uape-learn-actions flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
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

      <ContentTags tags={item.tags} />

      <div className="uape-learn-channel-footer">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
          Visit channel
        </a>
      </div>
    </div>
  )
}

// ─── Channels section ─────────────────────────────────────────────────────────

function ChannelsSection({ title, items, onToggle }) {
  const visible = items

  return (
    <div>
      <div className="uape-learn-section-header">
        <h2 className="uape-learn-section-title">{title}</h2>
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
  const [error, setError] = useState(false)
  const { isAuth } = useAuth()

  useEffect(() => {
    const fetches = [getSections()]
    if (isAuth) fetches.push(getRecommended().catch(() => null))

    Promise.all(fetches).then(([sections, recommended]) => {
      if (recommended && (recommended.playlists?.length > 0 || recommended.videos?.length > 0 || recommended.channels?.length > 0)) {
        setSections([recommended, ...sections])
      } else {
        setSections(sections)
      }
    }).catch(() => setError(true)).finally(() => setLoading(false))
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
        <div className="uape-page-gutter uape-page-container">
          <h1 className="uape-learn-page-title">What to learn next</h1>
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="uape-learn-root">
        <div className="uape-page-gutter uape-page-container">
          <h1 className="uape-learn-page-title">What to learn next</h1>
          <p className="uape-learn-error">Failed to load content. Please try refreshing the page.</p>
        </div>
      </section>
    )
  }

  if (sections.length === 0) return null

  return (
    <section className="uape-learn-root">
      <div className="uape-page-gutter uape-page-container">
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
                    contentType="playlist"
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
                    contentType="video"
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
