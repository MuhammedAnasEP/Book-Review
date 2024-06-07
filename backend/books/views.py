from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework import status
from django.db.models import Avg
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Book, BookReview
from .serializers import BookSerializer, ReviewSerializer
from .pagination import BooksPagination, ReviewsPagination


class BookListAndCreateView(ListCreateAPIView):
    """
    View for listing and creating books.

    This view handles the HTTP GET and POST requests for the '/books' endpoint.
    It provides pagination, filtering, and ordering capabilities for the book data.
    It also calculates the average rating of each book based on its reviews.
    """
    queryset = Book.objects.all()
    # permission_classes = [IsAuthenticated]
    pagination_class = BooksPagination
    serializer_class = BookSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'author']
    ordering_fields = ['title', 'author','average_rating', 'id']

    def get_queryset(self):
        """
        Retrieves the queryset of Book objects annotated with the average rating of their reviews.
        """
        return Book.objects.annotate(average_rating=Avg('reviews__rating'))


class BookDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        """
        Retrieves the details of a book with the specified ID. If not found, it returns a 404 error.
        If found, it returns the details of the book.        
        """
        try:
            book = Book.objects.get(id=id)
        except Book.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = BookSerializer(book, many=False)
        return Response(serializer.data)


class CreateAndListReviewView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request, id):
        """
        Retrieves a list of reviews for a specific book using book id. If no reviews are found, it returns a 404 error.
        If reviews are found, it returns a paginated list of reviews.
        """
        try:
            reviews = BookReview.objects.filter(book = id)
        except:
            return Response({'error':'No review are avilable for this book'},status=status.HTTP_404_NOT_FOUND)
        
        paginator = ReviewsPagination()
        paginated_reviews = paginator.paginate_queryset(reviews, request)
        serializer = ReviewSerializer(paginated_reviews, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request, id):
        """
        Create a new review for a book with the Book ID and User ID.
        """
        data = request.data
        data['book_id'] = id
        data['user_id'] = request.user.id or data.get('user_id')
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)