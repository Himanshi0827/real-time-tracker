// // src/pages/StockDetail.jsx
// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import Navbar from '../components/Navbar';
// import StockChart from '../components/StockChart';
// import PriceAlerts from '../components/PriceAlerts';

// function StockDetail() {
//   const { symbol } = useParams();
//   const { token } = useAuth();
//   const [stockData, setStockData] = useState(null);
//   const [historicalData, setHistoricalData] = useState([]);
//   const [interval, setInterval] = useState('daily');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Fetch current price
//         const priceResponse = await axios.get(
//           `http://localhost:3000/api/stock/${symbol}/price`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setStockData(priceResponse.data);

//         // Fetch historical data
//         const historyResponse = await axios.get(
//           `http://localhost:3000/api/stock/${symbol}/history?interval=${interval}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setHistoricalData(historyResponse.data);
//       } catch (err) {
//         setError('Failed to fetch stock data');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 60000); // Refresh every minute
//     return () => clearInterval(interval);
//   }, [symbol, token, interval]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="text-center">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="text-red-500 text-center">{error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-6">
//           <Link to="/" className="text-blue-500 hover:underline">
//             ← Back to Dashboard
//           </Link>
//         </div>
        
//         {/* Stock Header */}
//         <div className="bg-white rounded-lg shadow p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h1 className="text-3xl font-bold">{symbol}</h1>
//               {stockData && (
//                 <div className="mt-4">
//                   <p className="text-2xl font-semibold">
//                     ${parseFloat(stockData['05. price']).toFixed(2)}
//                   </p>
//                   <p className={`text-${parseFloat(stockData['09. change']) >= 0 ? 'green' : 'red'}-500`}>
//                     {stockData['09. change']} ({stockData['10. change percent']})
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="flex flex-col justify-center">
//               <div className="space-y-2">
//                 <p>Open: ${stockData && stockData['02. open']}</p>
//                 <p>High: ${stockData && stockData['03. high']}</p>
//                 <p>Low: ${stockData && stockData['04. low']}</p>
//                 <p>Volume: {stockData && parseInt(stockData['06. volume']).toLocaleString()}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Chart Controls */}
//         <div className="bg-white rounded-lg shadow p-6 mb-8">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold">Price History</h2>
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setInterval('daily')}
//                 className={`px-4 py-2 rounded ${
//                   interval === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 Daily
//               </button>
//               <button
//                 onClick={() => setInterval('weekly')}
//                 className={`px-4 py-2 rounded ${
//                   interval === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 Weekly
//               </button>
//               <button
//                 onClick={() => setInterval('monthly')}
//                 className={`px-4 py-2 rounded ${
//                   interval === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
//                 }`}
//               >
//                 Monthly
//               </button>
//             </div>
//           </div>
//           <StockChart data={historicalData} />
//         </div>

//         {/* Price Alerts */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <PriceAlerts symbol={symbol} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StockDetail;



import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import StockChart from '../components/StockChart';
import PriceAlerts from '../components/PriceAlerts';

function StockDetail() {
  const { symbol } = useParams();
  const { token } = useAuth();
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [interval, setInterval] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch current price
        const priceResponse = await axios.get(
          `http://localhost:3000/api/stock/${symbol}/price`,
          // { headers: { Authorization: `Bearer ${token}` } }
        );
        setStockData(priceResponse.data);
        console.log(priceResponse.data)

        // Fetch historical data
        const historyResponse = await axios.get(
          `http://localhost:3000/api/stock/${symbol}/history?interval=${interval}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHistoricalData(historyResponse.data);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const refreshInterval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(refreshInterval);
  }, [symbol, token, interval]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-red-500 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-500 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
        
        {/* Stock Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h1 className="text-3xl font-bold">{symbol}</h1>
              {stockData && (
                <div className="mt-4">
                  <p className="text-2xl font-semibold">
                    ${parseFloat(stockData['05. price']).toFixed(2)}
                  </p>
                  <p className={`text-${parseFloat(stockData['09. change']) >= 0 ? 'green' : 'red'}-500`}>
                    {stockData['09. change']} ({stockData['10. change percent']})
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-2">
                <p>Open: ${stockData && stockData['02. open']}</p>
                <p>High: ${stockData && stockData['03. high']}</p>
                <p>Low: ${stockData && stockData['04. low']}</p>
                <p>Volume: {stockData && parseInt(stockData['06. volume']).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Price History</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setInterval('daily')}
                className={`px-4 py-2 rounded ${
                  interval === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setInterval('weekly')}
                className={`px-4 py-2 rounded ${
                  interval === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setInterval('monthly')}
                className={`px-4 py-2 rounded ${
                  interval === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          <StockChart data={historicalData} />
        </div>

        {/* Price Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <PriceAlerts symbol={symbol} />
        </div>
      </div>
    </div>
  );
}

export default StockDetail;
