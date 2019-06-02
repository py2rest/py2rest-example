from django.db import models

# Create your models here.


class Article(models.Model):
    author = models.CharField(max_length=250)
    content = models.TextField()
    likes_count = models.IntegerField()
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)

    def to_dict(self, include_comments=False, include_tags=False):
        dct = {'id': self.pk, 'author': self.author, 'content': self.content, 'likesCount': self.likes_count,
               'title': self.title, 'createdDate': self.created_date}
        if include_comments:
            dct['comments'] = [cmt.to_dict() for cmt in self.comment_set.all()]

        if include_tags:
            dct['tags'] = [tag.tag_name for tag in self.tag_set.all()]

        return dct


class Comment(models.Model):
    author = models.CharField(max_length=250)
    content = models.CharField(max_length=250)
    likes_count = models.IntegerField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def to_dict(self):
        dct = {'id': self.pk, 'author': self.author, 'content': self.content, 'likesCount': self.likes_count,
               'createdDate': self.created_date}
        return dct


class Tag(models.Model):
    tag_name = models.CharField(max_length=250)
    articles = models.ManyToManyField(Article)
