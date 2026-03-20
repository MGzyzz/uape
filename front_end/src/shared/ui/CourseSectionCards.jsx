import { useNavigate } from 'react-router-dom'
import LazyImage from './LazyImage.jsx'
import FavoriteIcon from './FavoriteIcon.jsx'
import ContentTags from './ContentTags.jsx'

// ─── Skeletons ────────────────────────────────────────────────────────────────

export function SkeletonContentCard() {
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

export function SkeletonSection() {
  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header">
        <div className="uape-skeleton" style={{ height: 32, width: 240 }} />
      </div>
      <div className="uape-learn-cards-row uape-learn-cards-row-full">
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: '0 0 auto', minWidth: 0 }}>
            <SkeletonContentCard />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Content card (playlist / video) ─────────────────────────────────────────

export function ContentCard({ item, buttonLabel, onToggle, contentType }) {
  const navigate = useNavigate()
  const isClickable = contentType === 'playlist'

  function handleCardClick() {
    if (isClickable) navigate(`/playlist/${item.id}`)
  }

  function handleKeyDown(e) {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      handleCardClick()
    }
  }

  return (
    <div
      className={`uape-learn-content-card${isClickable ? ' uape-learn-content-card-clickable' : ''}`}
      onClick={handleCardClick}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'link' : undefined}
      onKeyDown={handleKeyDown}
    >
      <div className="uape-learn-thumb-wrap">
        <div className="relative uape-learn-thumb-frame">
          <LazyImage src={item.image} alt={item.title} className="uape-learn-thumb-image" />
          <div className="uape-learn-badge">{item.badge}</div>
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

        <p className="uape-learn-meta">{item.author} • {item.followers}</p>

        <ContentTags tags={item.tags} />

        <div className="uape-learn-actions flex items-center gap-4">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn" onClick={(e) => e.stopPropagation()}>
            {buttonLabel}
          </a>
          <a href={item.channelUrl} target="_blank" rel="noopener noreferrer" className="uape-learn-link-btn" onClick={(e) => e.stopPropagation()}>
            Visit channel
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Channel card ─────────────────────────────────────────────────────────────

export function ChannelCard({ item, onToggle }) {
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

export function ChannelsSection({ title, items, onToggle }) {
  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header">
        <h2 className="uape-learn-section-title">{title}</h2>
      </div>
      <div className="uape-learn-channels-grid">
        {items.map((channel) => (
          <ChannelCard key={channel.id} item={channel} onToggle={onToggle} />
        ))}
      </div>
    </div>
  )
}
