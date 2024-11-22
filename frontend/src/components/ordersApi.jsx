import axios from 'axios';

export const fetchOrders = async ({ pageParam = 0 }) => {
  const response = await axios.get('http://127.0.0.1:8000/api/orders', {
    params: {
      cursor: pageParam,
      limit: 50,
      sort: 'createdAt',
      sortDirection: 'asc',
    },
  });
  return response.data;
};
