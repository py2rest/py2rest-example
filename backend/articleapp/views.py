import json

from django.core.paginator import Paginator
from django.http import JsonResponse, HttpResponse
from django.shortcuts import get_object_or_404

# Create your views here.
from py2rest import http_method
from py2rest.api.fields import JSONObject, CharField, IntegerField, ListField, DateTimeField
from py2rest.api.parameter import Parameter
from py2rest.api_endpoint import api_endpoint
from .models import Article, Comment, Tag


class CommentJSON(JSONObject):
    id = IntegerField()
    author = CharField(required=True)
    content = CharField(required=True)
    likesCount = IntegerField()
    createdDate = DateTimeField()


class ArticleJSON(JSONObject):
    id = IntegerField()
    title = CharField(required=True)
    author = CharField(required=True)
    content = CharField(required=True)
    createdDate = DateTimeField()
    likesCount = IntegerField()
    comments = ListField(CommentJSON())
    tags = ListField(CharField())


class ArticlesListJSON(JSONObject):
    articles = ListField(ArticleJSON(), required=True)
    pagesCount = IntegerField()


@api_endpoint(method=http_method.GET, name='getArticles', return_type=ArticlesListJSON(), query_params=[Parameter('page', int)])
def get_articles(request):
    articles = Article.objects.all().order_by('-id')
    paginator = Paginator(articles, 10)

    page = request.GET.get('page')
    articles_this_page = paginator.get_page(page)

    return JsonResponse({'articles': [article.to_dict(include_tags=True) for article in articles_this_page.object_list],
                         'pagesCount': paginator.num_pages})


@api_endpoint(method=http_method.GET, name='getArticle', return_type=ArticleJSON())
def get_article(request, id):
    article = get_object_or_404(Article, pk=id)

    return JsonResponse(article.to_dict(include_comments=True, include_tags=True))


@api_endpoint(method=http_method.POST, name='createArticle', body=ArticleJSON(), return_type=ArticleJSON())
def create_article(request):
    article_dict = json.loads(request.body)
    article = Article(author=article_dict.get('author'), content=article_dict.get('content'), likes_count=0, title=article_dict.get('title'))

    article.save()

    for tag_name in article_dict.get('tags'):
        tag, _ = Tag.objects.get_or_create(tag_name=tag_name)
        tag.articles.add(article)
        tag.save()

    return JsonResponse(article.to_dict())


@api_endpoint(method=http_method.PUT, name='likeArticle')
def like_article(request, id):
    article = get_object_or_404(Article, pk=id)
    article.likes_count += 1
    article.save()

    return HttpResponse()


@api_endpoint(method=http_method.PUT, name='likeComment')
def like_comment(request, id):
    comment = get_object_or_404(Comment, pk=id)

    comment.likes_count += 1
    comment.save()

    return HttpResponse()


@api_endpoint(method=http_method.POST, name='createComment', body=CommentJSON(), return_type=CommentJSON())
def create_comment(request, article_id):
    cmt_dict = json.loads(request.body)
    article = get_object_or_404(Article, pk=article_id)
    comment = Comment(author=cmt_dict.get('author'), content=cmt_dict.get('content'),
                      likes_count=0, article=article)

    comment.save()

    return JsonResponse(comment.to_dict())


@api_endpoint(method=http_method.GET, name='getArticlesByTag', return_type=ArticlesListJSON())
def get_articles_by_tag(request, tag_name):
    tag = get_object_or_404(Tag, tag_name=tag_name)

    paginator = Paginator(tag.articles.all(), 10)

    page = request.GET.get('page')
    articles_this_page = paginator.get_page(page)

    return JsonResponse({'articles': [article.to_dict(include_tags=True) for article in articles_this_page.object_list],
                         'pagesCount': paginator.num_pages})
