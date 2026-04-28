import './WhatToLearnNextSection.css'
import { useState, useEffect } from 'react'
import { getSections, getSectionsByTag, getRecommended, addBookmark, removeBookmark } from '../../../api/courses.js'
import { getCachedResults } from '../../../api/assessment.js'
import CarouselSection from '../../../shared/ui/CarouselSection.jsx'
import { SkeletonSection, ContentCard, ChannelsSection } from '../../../shared/ui/CourseSectionCards.jsx'
import { useAuth } from '../../../app/AuthContext.jsx'

const LANG_TO_TAG = { csharp: 'c#', cpp: 'c++' }
const LANG_DISPLAY = { python: 'Python', javascript: 'JavaScript', java: 'Java', csharp: 'C#', cpp: 'C++' }

// ─── Root export ──────────────────────────────────────────────────────────────

export default function WhatToLearnNextSection() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isAuth } = useAuth()

  useEffect(() => {
    const assessedLangs = Object.keys(getCachedResults())

    const mainFetches = [getSections()]
    if (isAuth) mainFetches.push(getRecommended().catch(() => null))

    const tagFetches = assessedLangs.map((lang) =>
      getSectionsByTag(LANG_TO_TAG[lang] ?? lang).catch(() => [])
    )

    Promise.all([Promise.all(mainFetches), Promise.all(tagFetches)])
      .then(([mainResults, langSectionsList]) => {
        const allSections = mainResults[0]
        const recommended = isAuth ? mainResults[1] : null

        const popularSections = assessedLangs
          .map((lang, i) => {
            const tagName = `#${(LANG_TO_TAG[lang] ?? lang)}`
            const seen = new Set()
            const playlists = (langSectionsList[i] ?? [])
              .flatMap((s) => s.playlists)
              .filter((p) => {
                if (seen.has(p.id)) return false
                if (!p.tags.some((t) => t.name.toLowerCase() === tagName)) return false
                seen.add(p.id)
                return true
              })
            if (playlists.length === 0) return null
            const displayName = LANG_DISPLAY[lang] ?? lang
            return {
              id: `popular-${lang}`,
              title: `Popular playlists for ${displayName}`,
              subtitle: `Curated tutorials and playlists to boost your ${displayName} skills`,
              content_type: 'playlist',
              is_featured: false,
              playlists,
              videos: [],
              channels: [],
            }
          })
          .filter(Boolean)

        const filtered = allSections.filter((s) => s.is_featured || s.content_type === 'channel')

        const finalSections = []
        if (recommended && (recommended.playlists?.length > 0 || recommended.videos?.length > 0 || recommended.channels?.length > 0)) {
          finalSections.push(recommended)
        }
        finalSections.push(...popularSections)
        finalSections.push(...filtered)

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
                items={section.playlists.slice(0, 3)}
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
