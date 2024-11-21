from django.urls import path
from orders.views import OrdersView

urlpatterns = [
    path('api/orders', OrdersView.as_view(), name='orders'),
]
