// src/components/WatchList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function WatchList() {
  const [stocks, setStocks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/watchlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      await axios.delete(`http://localhost:3000/api/watchlist/remove/${symbol}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchWatchlist();
    } catch (error) {
      console.error('Failed to remove stock:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
        {stocks.length === 0 ? (
          <p className="text-gray-500">No stocks in your watchlist</p>
        ) : (
          <div className="space-y-4">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-4 border rounded"
              >
                <Link
                  to={`/stock/${stock.symbol}`}
                  className="flex-1 hover:text-blue-500"
                >
                  {stock.symbol}
                </Link>
                <button
                  onClick={() => removeFromWatchlist(stock.symbol)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;