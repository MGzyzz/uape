import client from './client'

function formatCount(n) {
  if (!n) return ''
  if (n >= 1_000_000) {
    const v = n / 1_000_000
    return `${Number.isInteger(v) ? v : v.toFixed(1)}M`
  }
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}

/**
 * Normalize a playlist from API to component format.
 */
function normalizePlaylist(p) {
  return {
    id: p.id,
    title: p.title,
    author: p.channel?.name ?? '',
    followers: p.channel?.subscribers ? `${formatCount(p.channel.subscribers)} Followers` : '',
    tags: p.tags.map((t) => ({ id: t.id, name: `#${t.name}`, color: t.color })),
    badge: `${p.video_count} Videos`,
    image: p.thumbnail_url,
    url: p.url,
    channelUrl: p.channel?.url ?? '',
    favorited: false,
  }
}

/**
 * Normalize a video from API to component format.
 */
function normalizeVideo(v) {
  return {
    id: v.id,
    title: v.title,
    author: v.channel?.name ?? '',
    followers: v.channel?.subscribers ? `${formatCount(v.channel.subscribers)} Followers` : '',
    tags: v.tags.map((t) => ({ id: t.id, name: `#${t.name}`, color: t.color })),
    badge: v.duration,
    image: v.thumbnail_url,
    url: v.url,
    channelUrl: v.channel?.url ?? '',
    favorited: false,
  }
}

/**
 * Normalize a channel from API to component format.
 */
function normalizeChannel(c) {
  return {
    id: c.id,
    name: c.name,
    followers: c.subscribers ? `${formatCount(c.subscribers)} Followers` : '',
    description: c.description,
    tags: c.tags.map((t) => ({ id: t.id, name: `#${t.name}`, color: t.color })),
    avatar_url: c.avatar_url,
    url: c.url,
    favorited: false,
  }
}

/**
 * Normalize a section from API — items are already normalized.
 */
function normalizeSection(s) {
  return {
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    content_type: s.content_type,
    order: s.order,
    playlists: s.playlists.map(normalizePlaylist),
    videos: s.videos.map(normalizeVideo),
    channels: s.channels.map(normalizeChannel),
  }
}

export async function getSections() {
  const res = await client.get('/courses/sections/')
  return res.data.map(normalizeSection)
}

export async function getPlaylists() {
  const res = await client.get('/courses/playlists/')
  return res.data.map(normalizePlaylist)
}

export async function getVideos() {
  const res = await client.get('/courses/videos/')
  return res.data.map(normalizeVideo)
}

export async function getRecommended() {
  const res = await client.get('/courses/recommended/')
return normalizeSection(res.data)
}

export async function addBookmark(contentType, objectId) {
  const res = await client.post('/courses/bookmarks/', {
    content_type: contentType,
    object_id: objectId,
  })
  return res.data
}

export async function removeBookmark(contentType, objectId) {
  await client.delete('/courses/bookmarks/', {
    data: { content_type: contentType, object_id: objectId },
  })
}
