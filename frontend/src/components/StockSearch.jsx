// src/components/StockSearch.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function StockSearch({ onStockAdd }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { token } = useAuth();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 1) {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${
            value
          }&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`,
        );
        console.log(response.data)
        setResults(response.data.bestMatches || []);
      } catch (error) {
        console.error('Search failed:', error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search stocks..."
        className="w-full p-2 border rounded"
      />
      {results.length > 0 && (
        <div className="absolute z-10 w-full bg-white mt-1 border rounded shadow-lg">
          {results.map((result) => (
            <div
              key={result['1. symbol']}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onStockAdd(result['1. symbol']);
                setSearch('');
                setResults([]);
              }}
            >
              <div className="font-bold">{result['1. symbol']}</div>
              <div className="text-sm text-gray-600">
                {result['2. name']}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StockSearch;