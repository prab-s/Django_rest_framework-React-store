from django.contrib import admin

# Register your models here.
from .models import Note, Store_Items, Cart

admin.site.register(Note)
admin.site.register(Store_Items)
admin.site.register(Cart)