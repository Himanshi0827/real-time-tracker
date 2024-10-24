// src/components/PriceAlerts.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function PriceAlerts({ symbol }) {
  const { token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({ threshold: '', type: 'above' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAlerts();
  }, [symbol]);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/watchlist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const stockData = response.data.find(item => item.symbol === symbol);
      setAlerts(stockData?.alerts || []);
    } catch (err) {
      setError('Failed to fetch alerts');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/alerts/${symbol}`,
        newAlert,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAlert({ threshold: '', type: 'above' });
      fetchAlerts();
    } catch (err) {
      setError('Failed to create alert');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Price Alerts</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="number"
              step="0.01"
              value={newAlert.threshold}
              onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
              placeholder="Price threshold"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="w-32">
            <select
              value={newAlert.type}
              onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Alert
          </button>
        </div>
      </form>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts set</p>
      ) : (
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div>
                Alert when price goes {alert.type}{' '}
                ${parseFloat(alert.threshold).toFixed(2)}
              </div>
              <button
                // onClick={() => removeAlert(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PriceAlerts;