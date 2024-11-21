from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Order
from .serializers import OrderSerializer

class OrdersView(APIView):
    def get(self, request):
        cursor = request.query_params.get('cursor')
        limit = int(request.query_params.get('limit', 50))
        sort = request.query_params.get('sort', 'created_at')
        sort_direction = request.query_params.get('sortDirection', 'asc')

        query = Order.objects.all()
        if cursor:
            query = query.filter(id__gt=cursor)

        if sort_direction == 'desc':
            sort = f"-{sort}"

        query = query.order_by(sort)[:limit]

        orders = OrderSerializer(query, many=True).data
        next_cursor = query.last().id if query.exists() else None

        total_count = Order.objects.count()

        return Response({
            'data': orders,
            'nextCursor': next_cursor,
            'totalCount': total_count,
        })
