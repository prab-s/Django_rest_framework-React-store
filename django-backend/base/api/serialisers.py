from rest_framework import serializers
from base.models import Note, Store_Items, Cart
from drf_writable_nested import WritableNestedModelSerializer

class NoteSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"

class StoreItemsSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Store_Items
        fields = "__all__"

class CartSerialiser(WritableNestedModelSerializer, serializers.ModelSerializer):
    # Source: https://stackoverflow.com/questions/41394761/the-create-method-does-not-support-writable-nested-fields-by-default
    # Source: https://www.youtube.com/watch?v=xsQRMZxpg9I
    item = StoreItemsSerialiser()
    class Meta:
        model = Cart
        fields = "__all__"