import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import VirtualTable from './components/VirtualTable';

const fetchOrders = async ({ pageParam = null }) => {
  const response = await axios.get('http://127.0.0.1:8000/api/orders', {
    params: { cursor: pageParam, limit: 50 },
  });
  return response.data;
};

const App = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });

  return (
    <div className="App">
      <h1>Virtual Scrolling Table</h1>
      <VirtualTable
        data={data}
        isLoading={isFetchingNextPage}
        onLoadMore={() => {
          if (hasNextPage) fetchNextPage();
        }}
      />
    </div>
  );
};

export default App;
