from django.urls import path
from .views import (
    PlaylistListView,
    PlaylistDetailView,
    VideoListView,
    VideoDetailView,
    ChannelDetailView,
    SectionListView,
    BookmarkView,
    RecommendedPlaylistsView,
)

urlpatterns = [
    path('playlists/', PlaylistListView.as_view(), name='playlist-list'),
    path('playlists/<int:pk>/', PlaylistDetailView.as_view(), name='playlist-detail'),
    path('videos/', VideoListView.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video-detail'),
    path('channels/<int:pk>/', ChannelDetailView.as_view(), name='channel-detail'),
    path('sections/', SectionListView.as_view(), name='section-list'),
    path('bookmarks/', BookmarkView.as_view(), name='bookmarks'),
    path('recommended/', RecommendedPlaylistsView.as_view(), name='recommended'),
]
