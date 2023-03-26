from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters, generics, viewsets
from rest_framework import status

from .serialisers import NoteSerialiser, StoreItemsSerialiser, CartSerialiser
from base.models import Note, Store_Items, Cart

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

import socket

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

    # base = f'http://{socket.gethostbyname(socket.gethostname())}:8000'
    base = f'http://192.168.1.81:8000'

    routes = [
        base +'/api/token',
        base +'/api/token/refresh',
        base +'/api/notes',
        base +'/api/store_items',
        base +'/api/store_items/search',
        base +'/api/store_items/<int:id>',
        base +'/api/cart',
        base +'/api/cartUD/<int:pk>',
        # base +'/api/cart/<int:id>',
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

@api_view(["GET"])
def getStoreItemById(request, id):
    item = Store_Items.objects.get(id=id)
    return Response(StoreItemsSerialiser(item).data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserCartItems(request):
    user = request.user
    cart = user.cart_set.all()
    return Response(CartSerialiser(cart, many=True).data)

@api_view(["POST", "PUT", "PATCH", "DELETE"])
@permission_classes([IsAuthenticated])
def changeUserCartItems(request, pk):
    # Source: https://www.youtube.com/watch?v=0jR5UFsAHkU
    try:
        user = request.user
        user_id = request._auth['user_id']
        # print("\n\n\n\n\n\n\n\n")
        # print(request.data)
        # for i in dir(request.data):
        #     try:
        #         print(i, ' ==== ', getattr(request.data, i)(), "\n")
        #     except:
        #         pass
        # print("\n\n\n\n\n\n")
    except:
        return Response({"FAIL !!!"}, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'PATCH':
        # Source: https://youtu.be/s7aINQPGNDM?t=2539
        obj = user.cart_set.get(id=pk)
        serialiser = CartSerialiser(obj, data=request.data, partial=True)
    
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        serialiser = CartSerialiser(data=request.data)
    
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            obj = user.cart_set.get(id=pk)
            obj.delete()

            return Response({"Deleted"}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'Entry ' + str(pk) + ' not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
    elif request.method == 'POST':

        # item_name = Store_Items.objects.get(id=pk)
        # item = StoreItemsSerialiser(item_name).data
        # a1 = request.data
        # a1['item'] = item
        # serialiser = CartSerialiser(data=a1)

        serialiser = CartSerialiser(data=request.data)

        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    else:
        print("No request type was chosen")

    


# @api_view(["POST", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
# def changeUserCartItems(request, pk):
# # query for the UserSettings object
#     instance = get_object_or_404(UserSettingsHolder.objects.all(), pk=pk)

#     if request.method == 'PUT':
#         # request.data['user'] = user.id

#         # pass in the instance we want to update
#         serializer = CartSerialiser(instance, data=request.data)

#         # validate and update
#         if serializer.is_valid():
#             serializer.save()
#             serializer_dict = serializer.data
#             serializer_dict["message"] = "Settings updated successfully."
#             return Response(serializer_dict, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["POST", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
# def changeUserCartItems(request, pk):
#     user = request.user
#     cart = user.cart_set.all()
#     changeSerialiser = CartSerialiser(data=request.data)
#     if changeSerialiser.is_valid():
#         print("YAY")
#         changeSerialiser.save()
#     else:
#         print("FUCKIN FAIL")
#     return Response(changeSerialiser.data)

# print(request.auth['user_id'], end="\n\n\n\n\n")

# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def setCartItemAndQuantity(request, id, qty):
#     item = Store_Items.objects.get(id=id)
#     return Response(StoreItemsSerialiser(item).data)

class StoreSearch(generics.ListAPIView):
    queryset = Store_Items.objects.all()
    serializer_class = StoreItemsSerialiser
    filter_backends = [filters.SearchFilter]
    search_fields = ['$title', '$category', '$description', '$price']
