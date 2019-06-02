from django.urls import path

from . import views

urlpatterns = [
    path('articles/', views.get_articles),
    path('articles/<int:id>', views.get_article),
    path('articles/<int:article_id>/comments/new', views.create_comment),
    path('articles/new', views.create_article),
    path('articles/<int:id>/like', views.like_article),
    path('comments/<int:id>/like', views.like_comment),
    path('tags/<str:tag_name>', views.get_articles_by_tag)
]