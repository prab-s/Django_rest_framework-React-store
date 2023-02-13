from rest_framework import serializers
from base.models import Note, Store_Items, Cart

class NoteSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

class StoreItemsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Store_Items
        fields = "__all__"

class CartSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"