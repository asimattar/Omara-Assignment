from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order

class OrdersView(APIView):
    def get(self, request):
        limit = int(request.GET.get('limit', 50))
        cursor = request.GET.get('cursor')

        # Base query
        query = Order.objects.all()

        # If a cursor is provided, filter results
        if cursor:
            query = query.filter(id__gt=cursor)

        # Get the next cursor before slicing
        next_cursor = query.order_by('id').last().id if query.exists() else None

        # Apply slicing
        query = query[:limit]

        # Serialize and return the response
        data = [
            {
                'id': order.id,
                'customerName': order.customer_name,
                'orderAmount': float(order.order_amount),
                'status': order.status,
                'createdAt': order.created_at.isoformat(),
            }
            for order in query
        ]

        return Response({
            'data': data,
            'nextCursor': next_cursor,
        })
