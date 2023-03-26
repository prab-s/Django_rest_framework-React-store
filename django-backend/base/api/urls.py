from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('list-all/', views.getData),
    # path('api-token-auth/', v.obtain_auth_token, name='api-token-auth'),
    # path('add/', views.addItem),

    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('notes/', views.getNotes),
    path('store_items/', views.getStoreItems),
    path('store_items/<int:id>', views.getStoreItemById),
    path('store_items/search/', views.StoreSearch.as_view(), name='store_search_query'),
    path('cart/', views.getUserCartItems),
    path('cartUD/<int:pk>', views.changeUserCartItems),
    # path('cart/<int:id>', views.setCartItemAndQuantity), # need to add id AND quantity
]
