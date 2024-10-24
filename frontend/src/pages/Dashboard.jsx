// src/pages/Dashboard.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar';
import StockSearch from '../components/StockSearch';
import WatchList from '../components/WatchList';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Dashboard() {
  const { token } = useAuth();

  const handleStockAdd = async (symbol) => {
    try {
      await axios.post(
        'http://localhost:3000/api/watchlist/add',
        { symbol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // The WatchList component will update automatically via its useEffect
    } catch (error) {
      console.error('Failed to add stock:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Search Stocks</h2>
              <StockSearch onStockAdd={handleStockAdd} />
            </div>
          </div>
          <div>
            <WatchList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;