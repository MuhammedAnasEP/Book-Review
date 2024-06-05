from django.urls import path
from . import views

urlpatterns = [
    path('books', views.BookListAndCreateView.as_view(), name='books-list'),
    path('book/<int:id>', views.BookDetailsView.as_view(), name='book-details'),
    path('review/<int:id>', views.CreateAndListReviewView.as_view(), name='review'),
]