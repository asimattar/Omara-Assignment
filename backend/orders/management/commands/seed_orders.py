from django.core.management.base import BaseCommand
from orders.models import Order
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Seed the database with 10,000 orders'

    def handle(self, *args, **kwargs):
        fake = Faker()
        Order.objects.all().delete()

        for _ in range(10000):
            items = [
                {
                    'name': fake.word(),
                    'quantity': random.randint(1, 5),
                    'price': round(random.uniform(5, 100), 2)
                }
                for _ in range(random.randint(1, 5))
            ]
            Order.objects.create(
                customer_name=fake.name(),
                order_amount=sum(item['price'] * item['quantity'] for item in items),
                status=random.choice(['pending', 'processing', 'completed', 'cancelled']),
                items=items,
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded 10,000 orders!'))
