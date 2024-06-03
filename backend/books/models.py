from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    publication_date = models.DateField()
    cover_image = models.ImageField(upload_to='book_covers/', blank=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title


class BookReview(models.Model):
    RATING_CHOICES = [(i, str(i)) for i in range(1, 6)]
    rating = models.IntegerField(choices=RATING_CHOICES)
    review = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"