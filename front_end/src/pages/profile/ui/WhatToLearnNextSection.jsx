import './WhatToLearnNextSection.css'
import { useState, useEffect } from 'react'
import { getSections, getPlaylists, getRecommended, addBookmark, removeBookmark } from '../../../api/courses.js'
import { getAssessmentResults } from '../../../api/assessment.js'
import CarouselSection from '../../../shared/ui/CarouselSection.jsx'
import { SkeletonSection, ContentCard, ChannelsSection } from '../../../shared/ui/CourseSectionCards.jsx'
import { useAuth } from '../../../app/AuthContext.jsx'

const LANG_DISPLAY = { python: 'Python', javascript: 'JavaScript', java: 'Java', csharp: 'C#', cpp: 'C++' }

// ─── Root export ──────────────────────────────────────────────────────────────

export default function WhatToLearnNextSection() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isAuth } = useAuth()

  useEffect(() => {
    const fetches = [getSections()]
    if (isAuth) {
      fetches.push(getRecommended().catch(() => null))
      fetches.push(getAssessmentResults().catch(() => []))
      fetches.push(getPlaylists().catch(() => []))
    }

    Promise.all(fetches)
      .then((results) => {
        const allSections = results[0]
        const recommended = isAuth ? (results[1] ?? null) : null
        const assessmentResults = isAuth ? (results[2] ?? []) : []
        const allPlaylists = isAuth ? (results[3] ?? []) : []

        const recentLang = assessmentResults[0]?.language
        const langDisplay = recentLang ? (LANG_DISPLAY[recentLang] ?? recentLang) : null

        const recommendedIds = new Set((recommended?.playlists ?? []).map((p) => p.id))
        const popularPlaylists = allPlaylists.filter((p) => !recommendedIds.has(p.id))

        const popularSection = isAuth && popularPlaylists.length > 0 ? {
          id: 'popular',
          title: langDisplay ? `Popular playlists for ${langDisplay}` : 'Popular playlists',
          subtitle: langDisplay
            ? `Curated tutorials and playlists to boost your ${langDisplay} skills`
            : 'Curated tutorials and playlists to boost your skills',
          content_type: 'playlist',
          is_featured: false,
          displayLimit: 6,
          playlists: popularPlaylists,
          videos: [],
          channels: [],
        } : null

        const channelSections = allSections.filter((s) => s.content_type === 'channel')

        const finalSections = []
        if (recommended && (recommended.playlists?.length > 0 || recommended.videos?.length > 0 || recommended.channels?.length > 0)) {
          finalSections.push(recommended)
        }
        if (popularSection) finalSections.push(popularSection)
        finalSections.push(...channelSections)

        setSections(finalSections)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
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
                items={section.playlists.slice(0, section.displayLimit ?? 3)}
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
                items={section.videos.slice(0, 3)}
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
                items={section.channels.slice(0, 6)}
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
