import { useState } from 'react'
import testImg from '../../../shared/assets/solution/test-python-review.png'
import arrowLeftIcon from '../../../shared/assets/icons/arrow-left.svg'
import arrowRightIcon from '../../../shared/assets/icons/arrow-right.svg'
import favoriteActiveIcon from '../../../shared/assets/icons/favorite-icon.svg'
import favoriteInactiveIcon from '../../../shared/assets/icons/nonactive-favorite-icon.svg'

// ─── Mock data ────────────────────────────────────────────────────────────────

const RECOMMENDED_PLAYLISTS = [
  {
    id: 1,
    title: 'Python Ultimate Course',
    author: 'Data with Baraa',
    followers: '298K Followers',
    tags: ['#beginner', '#networking', '#python'],
    badge: '46 Videos',
    image: testImg,
    favorited: false,
  },
  {
    id: 2,
    title: 'Python Full Course for Beginners',
    author: 'Programming with Mosh',
    followers: '4.97M Followers',
    tags: ['#beginner', '#coding', '#python'],
    badge: '23 Videos',
    image: testImg,
    favorited: true,
  },
  {
    id: 3,
    title: 'Python Tutorials',
    author: 'Corey Schafer',
    followers: '1.51M Followers',
    tags: ['#beginner', '#variables', '#python'],
    badge: '157 Videos',
    image: testImg,
    favorited: false,
  },
]

const POPULAR_PLAYLISTS = [
  {
    id: 1,
    title: 'MIT 6.100L Introduction to CS and...',
    author: 'MIT OpenCourseWare',
    followers: '6.16M Followers',
    tags: ['#loops', '#functions', '#python'],
    badge: '26 Videos',
    image: testImg,
    favorited: true,
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms...',
    author: 'Code and Debug',
    followers: '25.4K Followers',
    tags: ['#lists', '#datatype', '#python'],
    badge: '230 Videos',
    image: testImg,
    favorited: false,
  },
  {
    id: 3,
    title: 'NLP Tutorial Python',
    author: 'codebasics',
    followers: '1.47M Followers',
    tags: ['#beginner', '#algorithms', '#python'],
    badge: '28 Videos',
    image: testImg,
    favorited: false,
  },
]

const VIDEOS = [
  {
    id: 1,
    title: 'Data Structures and Algorithms i...',
    author: 'freeCodeCamp.org',
    followers: '11.5M Followers',
    tags: ['#algorithms', '#datatype', '#python'],
    badge: '12:20:50',
    image: testImg,
    favorited: true,
  },
  {
    id: 2,
    title: 'Python for Data Analytics - Full...',
    author: 'Luke Barousse',
    followers: '609K Followers',
    tags: ['#beginner', '#datatype', '#python'],
    badge: '11:09:41',
    image: testImg,
    favorited: false,
  },
  {
    id: 3,
    title: 'Python for Data Science - Cours...',
    author: 'freeCodeCamp.org',
    followers: '11.5M Followers',
    tags: ['#algorithms', '#datatypes', '#python'],
    badge: '12:19:52',
    image: testImg,
    favorited: false,
  },
]

const CHANNELS = [
  {
    id: 1,
    name: 'Data with Baraa',
    followers: '298K Followers',
    description:
      'Beginner-friendly tutorials covering networking, Linux, Python programming, and cybersecurity fundamentals. Perfect for newcomers to IT and security.',
    tags: ['#beginner', '#networking', '#python'],
    favorited: false,
  },
  {
    id: 2,
    name: 'freeCodeCamp.org',
    followers: '11.5M Followers',
    description:
      'Learn math, programming, and computer science for free. A 501(c)(3) tax-exempt charity. We also run a free learning interactive platform at freeCodeCamp.org',
    tags: ['#beginner', '#webdevelopment', '#python'],
    favorited: false,
  },
  {
    id: 3,
    name: 'Real Python',
    followers: '206K Followers',
    description:
      "On this channel you'll get new Python videos and screencasts every week. They're bite-sized and to the point so you can fit them in with your day and pick up new Python skills on the side",
    tags: ['#functions', '#coding', '#python'],
    favorited: false,
  },
  {
    id: 4,
    name: 'Programiz',
    followers: '214K Followers',
    description:
      'Video Tutorials for Programming Beginners. Learn to code by watching! At Programiz, we teach programming the way beginners learn best: with clear, step-by-step video tutorials.',
    tags: ['#beginner', '#variables', '#python'],
    favorited: false,
  },
  {
    id: 5,
    name: 'Corey Schafer',
    followers: '1.51M Followers',
    description:
      'This channel is focused on creating tutorials and walkthroughs for software developers, programmers, and engineers. We cover topics for all different skill levels.',
    tags: ['#datatypes', '#functions', '#python'],
    favorited: false,
  },
  {
    id: 6,
    name: 'Programming in Python',
    followers: '18.7K Followers',
    description:
      'Official channel for the introductory course "Programming in Python" offered as a part of the BS degree at IIT Madras.',
    tags: ['#beginner', '#loops', '#python'],
    favorited: false,
  },
]

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
        <span key={tag} className="uape-learn-tag">
          {tag}
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

// ─── Playlist / Video card ────────────────────────────────────────────────────

function ContentCard({ item, buttonLabel, onToggle }) {
  return (
    <div className="uape-learn-content-card">
      {/* Thumbnail with inset padding */}
      <div className="uape-learn-thumb-wrap">
        <div className="relative uape-learn-thumb-frame">
          <img
            src={item.image}
            alt={item.title}
            className="uape-learn-thumb-image"
          />
          {/* Badge (video count / duration) */}
          <div className="uape-learn-badge">
            {item.badge}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="uape-learn-card-body">
        {/* Title + favorite */}
        <div className="uape-learn-title-row flex items-start gap-3">
          <h3 className="uape-learn-card-title">
            {item.title}
          </h3>
          <button
            onClick={() => onToggle(item.id)}
            className="uape-icon-button-reset"
            aria-label="Favourite"
          >
            <FavoriteIcon active={item.favorited} />
          </button>
        </div>

        {/* Author */}
        <p className="uape-learn-meta">
          {item.author} • {item.followers}
        </p>

        {/* Tags */}
        <Tags tags={item.tags} />

        {/* Buttons — pushed to bottom so they align across cards */}
        <div className="uape-learn-actions flex items-center gap-4">
          <button className="uape-learn-primary-btn">
            {buttonLabel}
          </button>
          <button className="uape-learn-link-btn">
            Visit channel
          </button>
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
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar placeholder */}
        <div className="uape-learn-channel-avatar">
          {initials}
        </div>

        {/* Name + followers */}
        <div className="uape-flex-1-min-w-0">
          <p className="uape-learn-channel-name">
            {item.name}
          </p>
          <p className="uape-learn-channel-followers">
            {item.followers}
          </p>
        </div>

        {/* Favorite */}
        <button
          onClick={() => onToggle(item.id)}
          className="uape-icon-button-reset"
          aria-label="Favourite"
        >
          <FavoriteIcon active={item.favorited} />
        </button>
      </div>

      {/* Description */}
      <p className="uape-learn-channel-description">
        {item.description}
      </p>

      {/* Tags */}
      <Tags tags={item.tags} />

      {/* Button — pushed to bottom so it aligns across channel cards */}
      <div className="uape-learn-channel-footer">
        <button className="uape-learn-primary-btn">
          Visit channel
        </button>
      </div>
    </div>
  )
}

// ─── Carousel section (3 visible at a time) ───────────────────────────────────

function CarouselSection({ title, subtitle, items, renderCard }) {
  const [idx, setIdx] = useState(0)
  const perPage = 3
  const canPrev = idx > 0
  const canNext = idx + perPage < items.length

  const visible = items.slice(idx, idx + perPage)

  return (
    <div className="uape-learn-section">
      {/* Header */}
      <div className="uape-learn-section-header flex items-start justify-between">
        <div>
          <h2 className="uape-learn-section-title">
            {title}
          </h2>
          {subtitle && (
            <p className="uape-learn-section-subtitle">
              {subtitle}
            </p>
          )}
        </div>
        <NavArrows
          onPrev={() => setIdx((i) => Math.max(0, i - 1))}
          onNext={() => setIdx((i) => Math.min(items.length - perPage, i + 1))}
          canPrev={canPrev}
          canNext={canNext}
        />
      </div>

      {/* Cards row */}
      <div className="uape-learn-cards-row">
        {visible.map((item) => renderCard(item))}
      </div>
    </div>
  )
}

// ─── Channels section (3-col grid, paginated by 3) ───────────────────────────

function ChannelsSection({ items, onToggle }) {
  const [idx, setIdx] = useState(0)
  const perPage = 6
  const canPrev = idx > 0
  const canNext = idx + perPage < items.length

  const visible = items.slice(idx, idx + perPage)

  return (
    <div>
      {/* Header */}
      <div className="uape-learn-section-header flex items-start justify-between">
        <h2 className="uape-learn-section-title">
          Top channels to learn Python
        </h2>
        <NavArrows
          onPrev={() => setIdx((i) => Math.max(0, i - perPage))}
          onNext={() => setIdx((i) => Math.min(items.length - perPage, i + perPage))}
          canPrev={canPrev}
          canNext={canNext}
        />
      </div>

      {/* 3-column grid */}
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
  const [recPlaylists, setRecPlaylists] = useState(RECOMMENDED_PLAYLISTS)
  const [popPlaylists, setPopPlaylists] = useState(POPULAR_PLAYLISTS)
  const [videos, setVideos] = useState(VIDEOS)
  const [channels, setChannels] = useState(CHANNELS)

  const toggle = (setter) => (id) =>
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, favorited: !item.favorited } : item)))

  return (
    <section className="uape-learn-root">
      <div className="uape-learn-root-inner mx-auto max-w-6xl">
        {/* Page title */}
        <h1 className="uape-learn-page-title">
          What to learn next
        </h1>

        {/* Recommended playlists */}
        <CarouselSection
          title="Recommended playlists for you"
          items={recPlaylists}
          renderCard={(item) => (
            <ContentCard
              key={item.id}
              item={item}
              buttonLabel="View playlist"
              onToggle={toggle(setRecPlaylists)}
            />
          )}
        />

        {/* Popular playlists */}
        <CarouselSection
          title="Popular playlists for Python developers"
          subtitle="Curated tutorials and tracks to boost your Python skills"
          items={popPlaylists}
          renderCard={(item) => (
            <ContentCard
              key={item.id}
              item={item}
              buttonLabel="View playlist"
              onToggle={toggle(setPopPlaylists)}
            />
          )}
        />

        {/* Videos */}
        <CarouselSection
          title="Popular Algorithm and Data Structures Videos"
          subtitle="Top tutorials to master algorithms and data structures"
          items={videos}
          renderCard={(item) => (
            <ContentCard
              key={item.id}
              item={item}
              buttonLabel="View video"
              onToggle={toggle(setVideos)}
            />
          )}
        />

        {/* Channels */}
        <ChannelsSection items={channels} onToggle={toggle(setChannels)} />
      </div>
    </section>
  )
}
