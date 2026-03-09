import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import LazyImage from '../../../shared/ui/LazyImage.jsx'
import favoriteActiveIcon from '../../../shared/assets/icons/favorite-icon.svg'
import { getFavorites, removeBookmark } from '../../../api/courses.js'

function FavoriteIcon() {
  return <img src={favoriteActiveIcon} width={22} height={28} alt="" />
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

function SkeletonCard() {
  return (
    <div className="uape-learn-content-card">
      <div className="uape-learn-thumb-wrap">
        <div className="uape-learn-thumb-frame">
          <div className="uape-skeleton h-full w-full" />
        </div>
      </div>
      <div className="uape-learn-card-body">
        <div className="uape-skeleton h-7 w-4/5" />
        <div className="uape-skeleton h-5 w-1/2" />
        <div className="flex gap-3">
          <div className="uape-skeleton h-5 w-20 rounded-full" />
          <div className="uape-skeleton h-5 w-24 rounded-full" />
        </div>
        <div className="uape-skeleton mt-auto h-11 w-36" />
      </div>
    </div>
  )
}

function FavoritesSkeleton() {
  return (
    <div className="uape-favorites-sections">
      {[0, 1].map((section) => (
        <section key={section} className="uape-favorites-section">
          <div className="uape-learn-section-header">
            <div className="uape-skeleton h-8 w-56" />
          </div>
          <div className="uape-favorites-grid">
            {[0, 1, 2].map((item) => (
              <SkeletonCard key={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function ContentCard({ item, buttonLabel, contentType, onToggle }) {
  const navigate = useNavigate()

  function handleCardClick() {
    if (contentType === 'playlist') {
      navigate(`/playlist/${item.id}`)
    }
  }

  return (
    <article
      className={`uape-learn-content-card${contentType === 'playlist' ? ' uape-learn-content-card-clickable' : ''}`}
      onClick={handleCardClick}
    >
      <div className="uape-learn-thumb-wrap">
        <div className="relative uape-learn-thumb-frame">
          <LazyImage src={item.image} alt={item.title} className="uape-learn-thumb-image" />
          <div className="uape-learn-badge">{item.badge}</div>
        </div>
      </div>

      <div className="uape-learn-card-body">
        <div className="uape-learn-title-row flex items-start gap-3">
          <div className="uape-flex-1-min-w-0">
            <h3 className="uape-learn-card-title uape-favorites-card-title">{item.title}</h3>
            <p className="uape-learn-meta">
              {item.author} • {item.followers}
            </p>
          </div>

          <button
            type="button"
            className="uape-icon-button-reset"
            onClick={(event) => {
              event.stopPropagation()
              onToggle(item.id)
            }}
            aria-label="Remove from favorites"
          >
            <FavoriteIcon />
          </button>
        </div>

        {item.description ? (
          <p className="uape-favorites-card-description">{item.description}</p>
        ) : null}

        <Tags tags={item.tags} />

        <div className="uape-favorites-card-actions" onClick={(event) => event.stopPropagation()}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
            {buttonLabel}
          </a>
          <a href={item.channelUrl} target="_blank" rel="noopener noreferrer" className="uape-favorites-secondary-link">
            Visit channel
          </a>
        </div>
      </div>
    </article>
  )
}

function ChannelCard({ item, onToggle }) {
  const initials = item.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <article className="uape-learn-channel-card">
      <div className="flex items-start gap-3">
        <div className="uape-learn-channel-avatar">
          {item.avatar_url ? (
            <img src={item.avatar_url} alt={item.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>

        <div className="uape-flex-1-min-w-0">
          <p className="uape-learn-channel-name">{item.name}</p>
          <p className="uape-learn-channel-followers">{item.followers}</p>
        </div>

        <button
          type="button"
          className="uape-icon-button-reset"
          onClick={() => onToggle(item.id)}
          aria-label="Remove from favorites"
        >
          <FavoriteIcon />
        </button>
      </div>

      {item.description ? <p className="uape-learn-channel-description">{item.description}</p> : null}

      <Tags tags={item.tags} />

      <div className="uape-learn-channel-footer">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
          Visit channel
        </a>
      </div>
    </article>
  )
}

function FavoritesEmptyState() {
  const navigate = useNavigate()

  return (
    <section className="uape-favorites-empty">
      <h2 className="uape-favorites-empty-title">Start learning today.</h2>
      <p className="uape-favorites-empty-text">
        Saved courses will appear here. Browse recommendations and add the playlists
        you want to return to.
      </p>
      <div className="uape-favorites-empty-actions">
        <button
          type="button"
          className="uape-orange-btn uape-learn-primary-btn"
          onClick={() => navigate('/profile')}
        >
          Explore courses
        </button>
      </div>
    </section>
  )
}

function FavoritesContent({ sections, onRemove }) {
  return (
    <div className="uape-favorites-sections">
      {sections.map((section) => {
        if (section.content_type === 'playlist' && section.playlists.length > 0) {
          return (
            <section key={section.id} className="uape-favorites-section">
              <div className="uape-learn-section-header">
                <h2 className="uape-learn-section-title">{section.title}</h2>
                {section.subtitle ? <p className="uape-learn-section-subtitle">{section.subtitle}</p> : null}
              </div>
              <div className="uape-favorites-grid">
                {section.playlists.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    buttonLabel="View playlist"
                    contentType="playlist"
                    onToggle={(id) => onRemove('playlist', id)}
                  />
                ))}
              </div>
            </section>
          )
        }

        if (section.content_type === 'video' && section.videos.length > 0) {
          return (
            <section key={section.id} className="uape-favorites-section">
              <div className="uape-learn-section-header">
                <h2 className="uape-learn-section-title">{section.title}</h2>
                {section.subtitle ? <p className="uape-learn-section-subtitle">{section.subtitle}</p> : null}
              </div>
              <div className="uape-favorites-grid">
                {section.videos.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    buttonLabel="View video"
                    contentType="video"
                    onToggle={(id) => onRemove('video', id)}
                  />
                ))}
              </div>
            </section>
          )
        }

        if (section.content_type === 'channel' && section.channels.length > 0) {
          return (
            <section key={section.id} className="uape-favorites-section">
              <div className="uape-learn-section-header">
                <h2 className="uape-learn-section-title">{section.title}</h2>
                {section.subtitle ? <p className="uape-learn-section-subtitle">{section.subtitle}</p> : null}
              </div>
              <div className="uape-learn-channels-grid">
                {section.channels.map((item) => (
                  <ChannelCard key={item.id} item={item} onToggle={(id) => onRemove('channel', id)} />
                ))}
              </div>
            </section>
          )
        }

        return null
      })}
    </div>
  )
}

export default function FavoritesPage() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let ignore = false

    getFavorites()
      .then((data) => {
        if (!ignore) {
          setSections(data)
          setError(false)
        }
      })
      .catch(() => {
        if (!ignore) setError(true)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  function handleRemove(contentType, itemId) {
    setSections((prev) => (
      prev
        .map((section) => {
          if (section.content_type !== contentType) return section

          const key = contentType === 'playlist' ? 'playlists' : contentType === 'video' ? 'videos' : 'channels'
          return {
            ...section,
            [key]: section[key].filter((item) => item.id !== itemId),
          }
        })
        .filter((section) => {
          if (section.content_type === 'playlist') return section.playlists.length > 0
          if (section.content_type === 'video') return section.videos.length > 0
          return section.channels.length > 0
        })
    ))

    removeBookmark(contentType, itemId).catch(() => {
      getFavorites().then(setSections).catch(() => setError(true))
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="uape-favorites-content">
          <div className="uape-page-container uape-page-gutter">
            <h1 className="uape-favorites-page-title">My learning</h1>

            {loading ? <FavoritesSkeleton /> : null}
            {!loading && error ? (
              <p className="uape-learn-error">Failed to load favorites. Please try refreshing the page.</p>
            ) : null}
            {!loading && !error && sections.length === 0 ? <FavoritesEmptyState /> : null}
            {!loading && !error && sections.length > 0 ? (
              <FavoritesContent sections={sections} onRemove={handleRemove} />
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
