from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serialisers import NoteSerialiser, StoreItemsSerialiser, CartSerialiser
from base.models import Note, Store_Items, Cart

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/notes',
    ]
    return Response(routes)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    # notes = Note.objects.all()
    notes = user.note_set.all()
    return Response(NoteSerialiser(notes, many=True).data)

@api_view(["GET"])
def getStoreItems(request):
    items = Store_Items.objects.all()
    return Response(StoreItemsSerialiser(items, many=True).data)