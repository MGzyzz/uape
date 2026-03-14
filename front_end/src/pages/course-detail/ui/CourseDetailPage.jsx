import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import LazyImage from '../../../shared/ui/LazyImage.jsx'
import SiteHeader from '../../../shared/ui/SiteHeader.jsx'
import SiteFooter from '../../../shared/ui/SiteFooter.jsx'
import { getPlaylist, getRecommended, addBookmark, removeBookmark } from '../../../api/courses.js'
import arrowLeftIcon from '../../../shared/assets/icons/arrow-left.svg'
import arrowRightIcon from '../../../shared/assets/icons/arrow-right.svg'
import FavoriteIcon from '../../../shared/ui/FavoriteIcon.jsx'
import ContentTags from '../../../shared/ui/ContentTags.jsx'
import { useAuth } from '../../../app/AuthContext.jsx'

// ─── "About This Course" template ─────────────────────────────────────────────

const ABOUT_TEMPLATE =
  `This {language} beginner course is a comprehensive, free video tutorial designed to take you from absolute beginner to confident coder. You'll learn {language} — one of the most popular and versatile programming languages — with clear, step-by-step explanations and real coding examples. The course starts with basic setup and syntax, then moves through essential concepts like variables, control flow, data structures, functions, and object-oriented programming. It's perfect for students, self-taught learners, and anyone who wants to jump into coding the right way.`

function buildAbout(language) {
  const lang = language || 'programming'
  return ABOUT_TEMPLATE.replaceAll('{language}', lang)
}

// ─── Small helpers ─────────────────────────────────────────────────────────────

function Tags({ tags }) {
  return <ContentTags tags={tags} />
}

// ─── Rich-text блоки (HTML из CKEditor5) ──────────────────────────────────────

function RichTextSection({ title, html }) {
  if (!html) return null
  return (
    <div className="uape-detail-content-section">
      <h2 className="uape-detail-section-title">{title}</h2>
      <div
        className="uape-detail-rich-text"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      />
    </div>
  )
}

// ─── Recommended carousel ─────────────────────────────────────────────────────

function RecommendedCard({ item, onToggle }) {
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  return (
    <div
      className="uape-learn-content-card uape-learn-content-card-clickable"
      onClick={() => navigate(`/playlist/${item.id}`)}
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
          {isAuth && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(item.id) }}
              className="uape-icon-button-reset"
              aria-label="Favourite"
            >
              <FavoriteIcon active={item.favorited} />
            </button>
          )}
        </div>

        <p className="uape-learn-meta">{item.author} • {item.followers}</p>

        <Tags tags={item.tags} />

        <div className="uape-learn-actions flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="uape-orange-btn uape-learn-primary-btn">
            View playlist
          </a>
          <a href={item.channelUrl} target="_blank" rel="noopener noreferrer" className="uape-learn-link-btn">
            Visit channel
          </a>
        </div>
      </div>
    </div>
  )
}

function RecommendedSection({ items, onToggle }) {
  const [idx, setIdx] = useState(0)
  const perPage = 3
  const canPrev = idx > 0
  const canNext = idx + perPage < items.length
  const visible = items.slice(idx, idx + perPage)
  const rowClassName = `uape-learn-cards-row${visible.length === perPage ? ' uape-learn-cards-row-full' : ''}`

  return (
    <div className="uape-learn-section">
      <div className="uape-learn-section-header flex items-start justify-between">
        <h2 className="uape-learn-section-title">Recommended playlists for you</h2>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={canPrev ? () => setIdx((i) => Math.max(0, i - 1)) : undefined}
            aria-disabled={!canPrev}
            className={`uape-learn-nav-arrow-btn${canPrev ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
            aria-label="Previous"
          >
            <img src={arrowLeftIcon} alt="" width={11} height={17} />
          </button>
          <button
            onClick={canNext ? () => setIdx((i) => Math.min(items.length - perPage, i + 1)) : undefined}
            aria-disabled={!canNext}
            className={`uape-learn-nav-arrow-btn${canNext ? '' : ' uape-learn-nav-arrow-btn-disabled'}`}
            aria-label="Next"
          >
            <img src={arrowRightIcon} alt="" width={11} height={17} />
          </button>
        </div>
      </div>
      <div className={rowClassName}>
        {visible.map((item) => (
          <div key={item.id} style={{ flex: '0 0 auto', minWidth: 0 }}>
            <RecommendedCard item={item} onToggle={onToggle} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const { id } = useParams()
  const [playlist, setPlaylist] = useState(null)
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [recommended, setRecommended] = useState([])
  const { isAuth } = useAuth()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    setError(false)
    const fetches = [getPlaylist(id)]
    if (isAuth) fetches.push(getRecommended().catch(() => null))

    Promise.all(fetches)
      .then(([pl, rec]) => {
        setPlaylist(pl)
        setFavorited(pl.favorited)
        if (rec?.playlists?.length) {
          setRecommended(rec.playlists.filter((p) => p.id !== Number(id)))
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id, isAuth])

  function toggleMain() {
    if (!isAuth) return
    setFavorited((prev) => {
      if (prev) {
        removeBookmark('playlist', Number(id)).catch(() => {})
      } else {
        addBookmark('playlist', Number(id)).catch(() => {})
      }
      return !prev
    })
  }

  function toggleRecommended(itemId) {
    setRecommended((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, favorited: !item.favorited } : item
      )
    )
    if (!isAuth) return
    const item = recommended.find((i) => i.id === itemId)
    if (!item) return
    if (item.favorited) {
      removeBookmark('playlist', itemId).catch(() => {})
    } else {
      addBookmark('playlist', itemId).catch(() => {})
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-uape-bg text-uape-white">
      <SiteHeader />
      <main className="flex-1">
        {loading ? (
          <DetailSkeleton />
        ) : error ? (
          <div className="uape-detail-outer">
            <p className="uape-detail-description">Failed to load course. Please try refreshing the page.</p>
          </div>
        ) : playlist ? (
          <DetailContent
            playlist={playlist}
            favorited={favorited}
            onToggleMain={isAuth ? toggleMain : null}
            recommended={recommended}
            onToggleRecommended={toggleRecommended}
          />
        ) : (
          <div className="uape-detail-outer">
            <p className="uape-detail-description">Course not found.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

// ─── Detail content ───────────────────────────────────────────────────────────

function DetailContent({ playlist, favorited, onToggleMain, recommended, onToggleRecommended }) {
  const metaParts = []
  if (playlist.videoCount) metaParts.push(`${playlist.videoCount} Videos`)
  if (playlist.duration) metaParts.push(playlist.duration)

  const hasAbout = Boolean(playlist.language || playlist.whyThisCourse || playlist.whatYouWillLearn)

  return (
    <>
      <div className="uape-detail-outer">
        <div className="uape-detail-layout">

          {/* Left — sticky thumbnail */}
          <div className="uape-detail-left">
            <div className="uape-detail-thumb-wrapper">
              <LazyImage
                src={playlist.image}
                alt={playlist.title}
                className="uape-detail-thumb-img"
              />
              {onToggleMain && (
                <button
                  onClick={onToggleMain}
                  className="uape-detail-fav-btn"
                  aria-label="Favourite"
                >
                  <FavoriteIcon active={favorited} />
                </button>
              )}
            </div>
          </div>

          {/* Right — course info */}
          <div className="uape-detail-right">

            {/* Frame 399 — header block */}
            <div className="uape-detail-header-block">

              {/* Frame 396 — channel + title + description */}
              <div className="uape-detail-info-group">

                {/* Frame 393 — channel row */}
                <div className="uape-detail-channel-row">
                  {playlist.authorAvatar ? (
                    <img
                      src={playlist.authorAvatar}
                      alt={playlist.author}
                      className="uape-detail-channel-avatar"
                    />
                  ) : (
                    <div className="uape-detail-channel-avatar uape-detail-channel-avatar-fallback">
                      {playlist.author[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="uape-detail-channel-text">
                    <p className="uape-detail-channel-name">{playlist.author}</p>
                    <p className="uape-detail-channel-followers">{playlist.followers}</p>
                  </div>
                </div>

                {/* Frame 395 — title + description */}
                <div className="uape-detail-title-group">
                  <h1 className="uape-detail-course-title">{playlist.title}</h1>
                  {playlist.description && (
                    <p className="uape-detail-description">{playlist.description}</p>
                  )}
                </div>
              </div>

              {/* Frame 367 — tags */}
              {playlist.tags.length > 0 && <Tags tags={playlist.tags} />}

              {/* Frame 398 — metadata + buttons */}
              <div className="uape-detail-meta-block">
                <div className="uape-detail-meta-row">
                  {metaParts.length > 0 && (
                    <span className="uape-detail-meta">{metaParts.join(' • ')}</span>
                  )}
                  {playlist.lang && (
                    <span className="uape-detail-meta">Lang: {playlist.lang}</span>
                  )}
                </div>

                <div className="uape-detail-actions">
                  <a
                    href={playlist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uape-orange-btn uape-learn-primary-btn"
                  >
                    View playlist
                  </a>
                  <a
                    href={playlist.authorChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uape-learn-link-btn"
                  >
                    Visit channel
                  </a>
                </div>
              </div>
            </div>

            {/* Frame 404 — text content */}
            {hasAbout && (
              <div className="uape-detail-content-block">

                {/* About This Course */}
                <div className="uape-detail-content-section">
                  <h2 className="uape-detail-section-title">About This Course</h2>
                  <p className="uape-detail-body-text">{buildAbout(playlist.language)}</p>
                </div>

                {/* Why This Course? */}
                <RichTextSection title="Why This Course?" html={playlist.whyThisCourse} />

                {/* What You Will Learn */}
                <RichTextSection title="What You Will Learn" html={playlist.whatYouWillLearn} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended playlists */}
      {recommended.length > 0 && (
        <div className="uape-detail-recommended">
          <div className="uape-page-gutter uape-page-container">
            <RecommendedSection items={recommended} onToggle={onToggleRecommended} />
          </div>
        </div>
      )}
    </>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="uape-detail-outer">
      <div className="uape-detail-layout">
        <div className="uape-detail-left">
          <div className="uape-detail-thumb-wrapper">
            <div className="uape-skeleton" style={{ width: '100%', aspectRatio: '16/9', borderRadius: 12 }} />
          </div>
        </div>
        <div className="uape-detail-right">
          <div className="uape-detail-header-block">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="uape-skeleton" style={{ height: 44, width: 175 }} />
              <div className="uape-skeleton" style={{ height: 52, width: '100%' }} />
              <div className="uape-skeleton" style={{ height: 72, width: '85%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
