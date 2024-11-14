import React, { useState } from 'react';
import Header from '../Header/Header';
import './Styles/Compare.css';
import Graph from '../Graph/Graph';
import axios from 'axios';

interface ComparisonData {
  cryptoData?: number[];
  stockData?: number[];
  ratioData?: number[];
  labels: string[];
}

export default function Compare() {
  const cryptoOptions = ['bitcoin', 'ethereum', 'litecoin', 'ripple'];
  const stockOptions = ['AAPL', 'GOOGL', 'AMZN', 'MSFT'];
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [comparisonData, setComparisonData] = useState<Record<string, ComparisonData> | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);

  const handleCompare = () => {
    if (selectedCrypto && selectedStock) {
      axios.post(`http://localhost:3001/v1/compare`, null, {
        params: {
          stockSymbol: selectedStock,
          coinId: selectedCrypto
        }
      })
      .then((response) => {
        const data = response.data;
        const comparisonData: Record<string, ComparisonData> = {
          '1W': {
            cryptoData: [data.coinPrice],
            stockData: [data.stockPrice],
            ratioData: [data.stockToCoinRatio],
            labels: ['Comparison']
          }
        };
        setComparisonData(comparisonData);
        setShowChart(true);
      })
      .catch((error) => {
        console.error('Error fetching comparison data:', error);
      });
    }
  };

  return (
    <div className="certer-warpper">
      <Header />
      <div className="comparison-tool">
        <h1 className="page-header">Stock vs Crypto Comparison</h1>
        <form>
          <div>
            <label>Select Cryptocurrency</label>
            <select className="dropdown" value={selectedCrypto} onChange={(e) => setSelectedCrypto(e.target.value)}>
              <option value="">Select Crypto</option>
              {cryptoOptions.map((crypto) => (
                <option key={crypto} value={crypto}>{crypto}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Stock</label>
            <select className="dropdown" value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
              <option value="">Select Stock</option>
              {stockOptions.map((stock) => (
                <option key={stock} value={stock}>{stock}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleCompare}>Compare</button>
        </form>
        {showChart && comparisonData && (
          <Graph
            mockData={comparisonData}
            isComparisonDone={true}
            isCrypto={false}
            ratioData={comparisonData['1W'].ratioData || []}
          />
        )}
      </div>
    </div>
  );
}