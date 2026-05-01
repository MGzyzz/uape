import './DiagnosticRecommendationsSection.css'
import { useState, useEffect } from 'react'
import { getSectionsByTag, getSections, getPlaylists, addBookmark, removeBookmark } from '../../../api/courses.js'
import CarouselSection from '../../../shared/ui/CarouselSection.jsx'
import { SkeletonSection, ContentCard, ChannelsSection } from '../../../shared/ui/CourseSectionCards.jsx'

const LANG_DISPLAY = { python: 'Python', javascript: 'JavaScript', java: 'Java', csharp: 'C#', cpp: 'C++' }

function getGrowthAreas(level, language) {
  const lang = LANG_DISPLAY[language] ?? language
  const config = {
    beginner: [
      'Writing functions independently',
      'Working with common data structures in practical tasks',
      'Understanding how to structure larger programs',
      'Debugging and error handling',
      'Applying concepts to real-world problems',
    ],
    intermediate: [
      'Writing more complex functions and reusable code',
      'Working with data structures in more advanced tasks',
      'Structuring larger programs and organizing code efficiently',
      'Improving debugging skills and handling errors effectively',
      'Applying concepts to more complex real-world problems',
    ],
    advanced: [
      'Designing larger and more scalable programs',
      'Writing more optimized and efficient code',
      `Exploring advanced ${lang} tools and libraries`,
    ],
  }
  return config[level] ?? config.beginner
}

function growthAreaToTitle(area) {
  return `To improve your ${area.charAt(0).toLowerCase() + area.slice(1)}`
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function DiagnosticRecommendationsSection({ language, level = 'beginner' }) {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const tagMatch = `#${language.toLowerCase()}`
    const langDisplay = LANG_DISPLAY[language.toLowerCase()] ?? language
    const growthAreas = getGrowthAreas(level, language.toLowerCase())

    Promise.all([getSectionsByTag(language), getPlaylists(), getSections()])
      .then(([tagged, allPlaylists, allSections]) => {
        // Section 1: playlists filtered by test language
        const seenPl = new Set()
        const langPlaylists = []
        tagged
          .filter((s) => s.content_type !== 'channel')
          .forEach((section) => {
            section.playlists
              .filter((p) => p.tags.some((t) => t.name.toLowerCase() === tagMatch))
              .forEach((p) => {
                if (!seenPl.has(p.id)) {
                  seenPl.add(p.id)
                  langPlaylists.push(p)
                }
              })
          })

        const result = []

        if (langPlaylists.length > 0) {
          result.push({
            id: 'growth-0',
            title: growthAreaToTitle(growthAreas[0]),
            subtitle: null,
            content_type: 'playlist',
            displayLimit: langPlaylists.length,
            playlists: langPlaylists,
            videos: [],
            channels: [],
          })
        }

        // Section 2: all playlists excluding duplicates from section 1
        const section1Ids = new Set(langPlaylists.map((p) => p.id))
        const popularPlaylists = allPlaylists.filter((p) => !section1Ids.has(p.id))

        if (popularPlaylists.length > 0) {
          result.push({
            id: 'growth-1',
            title: growthAreaToTitle(growthAreas[1] ?? growthAreas[0]),
            subtitle: null,
            content_type: 'playlist',
            displayLimit: 6,
            playlists: popularPlaylists,
            videos: [],
            channels: [],
          })
        }

        // Section 3: all channels merged into one
        const seenCh = new Set()
        const allChannels = allSections
          .filter((s) => s.content_type === 'channel')
          .flatMap((s) => s.channels)
          .filter((c) => {
            if (seenCh.has(c.id)) return false
            seenCh.add(c.id)
            return true
          })

        if (allChannels.length > 0) {
          result.push({
            id: `channels-${language}`,
            title: `Recommended channels to learn ${langDisplay}`,
            subtitle: null,
            content_type: 'channel',
            playlists: [],
            videos: [],
            channels: allChannels,
          })
        }

        setSections(result)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [language, level])

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
          <h1 className="uape-learn-page-title">Recommended courses based on your level</h1>
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
        <h1 className="uape-learn-page-title">Recommended courses based on your level</h1>

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
                items={section.videos.slice(0, section.displayLimit ?? 3)}
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
