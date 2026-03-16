from django.urls import path

from ai.views import AIRecommendView, AILearningPathView, AIAdviceView

urlpatterns = [
    path('recommend/', AIRecommendView.as_view(), name='ai_recommend'),
    path('learning-path/', AILearningPathView.as_view(), name='ai_learning_path'),
    path('advice/', AIAdviceView.as_view(), name='ai_advice'),
]
