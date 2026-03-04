"""
YouTube Data API v3 service.
Fetches playlist, video and channel data by YouTube ID.
"""
import re
from urllib.parse import parse_qs, urlparse

from django.conf import settings
from googleapiclient.discovery import build


def _build_client():
    return build('youtube', 'v3', developerKey=settings.YOUTUBE_API_KEY)


# ---------------------------------------------------------------------------
# URL → ID helpers
# ---------------------------------------------------------------------------

def extract_playlist_id(url_or_id: str) -> str | None:
    """Return playlist ID from a YouTube URL or a raw ID."""
    parsed = urlparse(url_or_id)
    if parsed.scheme:  # it's a URL
        qs = parse_qs(parsed.query)
        return qs.get('list', [None])[0]
    # assume it's already an ID
    if re.match(r'^[A-Za-z0-9_-]+$', url_or_id):
        return url_or_id
    return None


def extract_video_id(url_or_id: str) -> str | None:
    """Return video ID from a YouTube URL or a raw ID."""
    parsed = urlparse(url_or_id)
    if parsed.scheme:
        qs = parse_qs(parsed.query)
        if 'v' in qs:
            return qs['v'][0]
        # youtu.be/VIDEO_ID
        if parsed.netloc == 'youtu.be':
            return parsed.path.lstrip('/')
    if re.match(r'^[A-Za-z0-9_-]{11}$', url_or_id):
        return url_or_id
    return None


def extract_channel_id(url_or_id: str) -> str | None:
    """Return channel ID from a YouTube URL or a raw ID."""
    parsed = urlparse(url_or_id)
    if parsed.scheme:
        path = parsed.path
        # /channel/UC...
        m = re.search(r'/channel/([A-Za-z0-9_-]+)', path)
        if m:
            return m.group(1)
        # @handle — need to resolve via API (returned as None here)
        return None
    if re.match(r'^UC[A-Za-z0-9_-]+$', url_or_id):
        return url_or_id
    return None


# ---------------------------------------------------------------------------
# Data fetchers
# ---------------------------------------------------------------------------

def fetch_playlist(playlist_id: str) -> dict:
    """
    Returns dict:
        title, thumbnail_url, video_count, channel_id
    """
    yt = _build_client()
    resp = yt.playlists().list(
        part='snippet,contentDetails',
        id=playlist_id,
    ).execute()

    items = resp.get('items', [])
    if not items:
        raise ValueError(f'Playlist not found: {playlist_id}')

    item = items[0]
    snippet = item['snippet']
    thumbnails = snippet.get('thumbnails', {})
    thumbnail = (
        thumbnails.get('maxres')
        or thumbnails.get('high')
        or thumbnails.get('default')
        or {}
    )
    return {
        'title': snippet['title'],
        'thumbnail_url': thumbnail.get('url', ''),
        'video_count': item['contentDetails']['itemCount'],
        'channel_id': snippet['channelId'],
    }


def fetch_video(video_id: str) -> dict:
    """
    Returns dict:
        title, thumbnail_url, duration (HH:MM:SS), channel_id
    """
    yt = _build_client()
    resp = yt.videos().list(
        part='snippet,contentDetails',
        id=video_id,
    ).execute()

    items = resp.get('items', [])
    if not items:
        raise ValueError(f'Video not found: {video_id}')

    item = items[0]
    snippet = item['snippet']
    thumbnails = snippet.get('thumbnails', {})
    thumbnail = (
        thumbnails.get('maxres')
        or thumbnails.get('high')
        or thumbnails.get('default')
        or {}
    )
    return {
        'title': snippet['title'],
        'thumbnail_url': thumbnail.get('url', ''),
        'duration': _parse_duration(item['contentDetails']['duration']),
        'channel_id': snippet['channelId'],
    }


def fetch_channel(channel_id: str) -> dict:
    """
    Returns dict:
        name, subscribers (formatted), avatar_url, description, url
    """
    yt = _build_client()
    resp = yt.channels().list(
        part='snippet,statistics',
        id=channel_id,
    ).execute()

    items = resp.get('items', [])
    if not items:
        raise ValueError(f'Channel not found: {channel_id}')

    item = items[0]
    snippet = item['snippet']
    stats = item.get('statistics', {})
    thumbnails = snippet.get('thumbnails', {})
    avatar = (thumbnails.get('high') or thumbnails.get('default') or {})

    sub_count = int(stats.get('subscriberCount', 0))
    return {
        'name': snippet['title'],
        'subscribers': _format_subscribers(sub_count),
        'avatar_url': avatar.get('url', ''),
        'description': snippet.get('description', ''),
        'url': f'https://www.youtube.com/channel/{channel_id}',
    }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _parse_duration(iso: str) -> str:
    """Convert ISO 8601 duration (PT1H2M3S) → HH:MM:SS or MM:SS."""
    match = re.match(
        r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?', iso
    )
    if not match:
        return ''
    h, m, s = (int(x or 0) for x in match.groups())
    if h:
        return f'{h}:{m:02d}:{s:02d}'
    return f'{m}:{s:02d}'


def _format_subscribers(count: int) -> str:
    """Format subscriber count: 298000 → '298K'."""
    if count >= 1_000_000:
        return f'{count / 1_000_000:.1f}M'.rstrip('0').rstrip('.')
    if count >= 1_000:
        return f'{count / 1_000:.1f}K'.rstrip('0').rstrip('.')
    return str(count)
