from rest_framework import serializers
from django.contrib.auth.models import User
from django.db.models import Avg
from .models import Book, BookReview

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','last_name','username','email']

    

class BookSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = '__all__'

    def get_average_rating(self, obj):
        return obj.reviews.aggregate(average=Avg('rating'))['average'] or 0
    
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = BookSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(source = 'user', queryset=User.objects.all())
    book_id = serializers.PrimaryKeyRelatedField(source = 'book', queryset=Book.objects.all())
    class Meta:
        model = BookReview
        fields = '__all__'
    
    def create(self, validated_data):
        return BookReview.objects.create( **validated_data)

