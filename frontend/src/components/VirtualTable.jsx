import React from 'react';
import { FixedSizeList as List } from 'react-window';
import '../styles/TableStyles.css';

const VirtualTable = ({ data = {}, height = 400, width = 800, rowHeight = 50 }) => {
  // Accessing the orders from the correct data structure
  const orders = data.pages ? data.pages[0].data : [];

  console.log('VirtualTable data:', orders); // Log the actual data

  const Row = ({ index, style }) => {
    const order = orders[index]; // Use the orders array
    if (!order) {
      return (
        <div className="row" style={style}>
          No Data
        </div>
      );
    }

    return (
      <div className="row" style={style}>
        <div className="cell">{order.id}</div>
        <div className="cell">{order.customerName}</div>
        <div className="cell">${order.orderAmount ? order.orderAmount.toFixed(2) : 'N/A'}</div>
        <div className="cell">{order.status}</div>
        <div className="cell">{new Date(order.createdAt).toLocaleDateString()}</div>
      </div>
    );
  };

  return (
    <div className="table">
      {/* Table Header */}
      <div className="header">
        <div className="cell">ID</div>
        <div className="cell">Customer Name</div>
        <div className="cell">Amount</div>
        <div className="cell">Status</div>
        <div className="cell">Created At</div>
      </div>

      {/* Display a message if no data */}
      {orders.length === 0 && <div>No data available</div>}

      {/* Virtualized List */}
      <List
        className="list"
        height={height}
        itemCount={orders.length || 0}
        itemSize={rowHeight}
        width= "100%"
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualTable;
