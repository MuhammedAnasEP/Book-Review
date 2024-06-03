from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('books', views.BookListAndCreateView.as_view(), name='books-list'),
    path('books/<int:id>', views.BookDetailsView.as_view(), name='book_details'),
    path('review/<int:id>', views.CreateAndListReviewView.as_view(), name='review'),

]