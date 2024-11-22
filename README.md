![Screenshot (642)](https://github.com/user-attachments/assets/d7a832b8-ebb2-4721-ab8c-a03d7b19a589)




API Documentation: Virtual Scrolling Table Backend
Base URL
http://127.0.0.1:8000/api/orders/

1. GET /api/orders/
Description
Fetch a paginated list of orders with sorting and cursor-based pagination.

Query Parameters
    limit: (optional) Number of records to fetch. Default: 50.
    cursor: (optional) Pagination cursor to determine the starting point. Default: 0.
    sortBy: (optional) The field to sort the results by. Allowed values:
        id (default)
        customer_name
        order_amount
        status
        created_at
    sortOrder: (optional) The direction of sorting. Allowed values:
    asc (default)
    desc


Request Example
GET /api/orders?limit=50&cursor=100&sortBy=created_at&sortOrder=desc


Response
Status Code: 200 OK
{
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "order_amount": 123.45,
      "status": "Shipped",
      "created_at": "2024-01-01T12:34:56Z"
    },
    {
      "id": 2,
      "customer_name": "Jane Smith",
      "order_amount": 678.90,
      "status": "Delivered",
      "created_at": "2024-01-02T08:30:00Z"
    },
    ...
  ],
  "nextCursor": 150
}


Response Fields
  data: Array of order objects.
      id: Order ID.
      customer_name: Name of the customer.
      order_amount: Total amount of the order.
      status: Current status of the order. Values: Pending, Shipped, Delivered, Cancelled.
      created_at: ISO timestamp of when the order was created.
  nextCursor: The cursor value for fetching the next set of records. If null, there are no more records.


Error Responses
1. 400 Bad Request
  If query parameters are invalid.
  Example Response:
  
  {
    "error": "Invalid query parameters."
  }
  
2. 500 Internal Server Error
  
  If an error occurs on the server.
  Example Response:
  
  {
    "error": "An unexpected error occurred. Please try again later."
  }
