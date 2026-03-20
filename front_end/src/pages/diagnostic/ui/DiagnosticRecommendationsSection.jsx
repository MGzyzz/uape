import './DiagnosticRecommendationsSection.css'
import { useState, useEffect } from 'react'
import { getSectionsByTag, addBookmark, removeBookmark } from '../../../api/courses.js'
import CarouselSection from '../../../shared/ui/CarouselSection.jsx'
import { SkeletonSection, ContentCard, ChannelsSection } from '../../../shared/ui/CourseSectionCards.jsx'

// ─── Root export ──────────────────────────────────────────────────────────────

export default function DiagnosticRecommendationsSection({ language }) {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tagMatch = `#${language.toLowerCase()}`
    getSectionsByTag(language)
      .then((raw) => {
        const filtered = raw
          .map((section) => ({
            ...section,
            playlists: section.playlists.filter((p) => p.tags.some((t) => t.name.toLowerCase() === tagMatch)),
            videos: section.videos.filter((v) => v.tags.some((t) => t.name.toLowerCase() === tagMatch)),
            channels: section.channels.filter((c) => c.tags.some((t) => t.name.toLowerCase() === tagMatch)),
          }))
          .filter((s) => s.playlists.length > 0 || s.videos.length > 0 || s.channels.length > 0)
        setSections(filtered)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [language])

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
      <section className="uape-diagnostic-rec-root">
        <div className="uape-page-gutter uape-page-container">
          <h1 className="uape-learn-page-title">Recommended playlists and videos for you</h1>
          <SkeletonSection />
          <SkeletonSection />
        </div>
      </section>
    )
  }

  if (sections.length === 0) return null

  return (
    <section className="uape-diagnostic-rec-root">
      <div className="uape-page-gutter uape-page-container">
        <h1 className="uape-learn-page-title">Recommended playlists and videos for you</h1>

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
