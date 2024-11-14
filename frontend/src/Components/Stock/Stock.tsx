import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Styles/Stock.css'
import Graph from '../Graph/Graph'
import axios from 'axios'

export default function Stock() {
  interface MockData {
    cryptoData: number[];
    stockData: number[];
    labels: string[];
  }
  const mockData: Record<string, MockData> = {
    '1W': {
      cryptoData: Array.from({ length: 7 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 7 }, () => Math.random() * 2000),
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
    },
    '1M': {
      cryptoData: Array.from({ length: 30 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 30 }, () => Math.random() * 2000),
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    '5M': {
      cryptoData: Array.from({ length: 150 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 150 }, () => Math.random() * 2000),
      labels: Array.from({ length: 150 }, (_, i) => `Day ${i + 1}`),
    },
    '1Y': {
      cryptoData: Array.from({ length: 365 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 365 }, () => Math.random() * 2000),
      labels: Array.from({ length: 365 }, (_, i) => `Day ${i + 1}`),
    },
    '5Y': {
      cryptoData: Array.from({ length: 1825 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 1825 }, () => Math.random() * 2000),
      labels: Array.from({ length: 1825 }, (_, i) => `Day ${i + 1}`),
    },
    'MAX': {
      cryptoData: Array.from({ length: 1825 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 1825 }, () => Math.random() * 2000),
      labels: Array.from({ length: 1825 }, (_, i) => `Day ${i + 1}`),
    },
  };
  let [targetStockData, setTargetStockData] = useState<Record<string, any>>({});
  let [targetCompanyPrices, setTargetCompanyPrices] = useState<Record<string, MockData>>({});
  let [isGraphDataLoading, setIsGraphDataLoading] = useState(true);

  useEffect(() => {
    const companyName = window.location.pathname.split('/')[2]
    axios.get(`http://localhost:3001/v1/stocks/${companyName}`)
    .then((res) => {setTargetStockData(res.data)})
    .catch((err) => console.log(err))
    
    axios.get(`http://localhost:3001/v1/stocks/${companyName}/history`)
     .then((res) => {
       setTargetCompanyPrices({
         '1W': {
           cryptoData: Array.from({ length: 7 }, () => Math.random() * 0),
           stockData: res.data.map((target: any) => target[1]),
           labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
         },
       })
       setIsGraphDataLoading(false);
    })
    .catch((err) => console.log(err))
  }, [])
  console.log(targetCompanyPrices)
  return (
    <div>
      <Header/>
      <div className='StockDataWrapper'>
        <div className='StockDataHeader'>
          <div className='StockBanner'>
            <p className='StockTicker'>{targetStockData.symbol}</p> {/* Example ticker for stock */}
          </div>
          <div className='StockPrice'>
            <p>Price</p>
          </div>
          <div className='StockMarketCap'>
            <p>Market cap</p>
          </div>
          <div className='StockVolume'>
            <p>Volume</p>
          </div>
        </div>
        <div className='StockDataValues'>
          <div className='StockBanner'>
            <p className='StockFullName'>{targetStockData.exchange}</p> {/* Example full name */}
          </div>
          <div className='StockPrice'>
            <p>${targetStockData.price}</p> {/* Example price */}
          </div>
          <div className='StockMarketCap'>
            <p>${targetStockData.marketCap}</p> {/* Example market cap */}
          </div>
          <div className='StockVolume'>
            <p>{targetStockData.volume}</p> {/* Example volume */}
          </div>
        </div>
        <hr/>
        <div className='StockDataGraph'>
          {/* TODO: Make the graph responsive for mobile views */}
          {isGraphDataLoading === false && targetCompanyPrices !== undefined
          ?
            <Graph mockData={targetCompanyPrices} isComparisonDone={false} isCrypto={false}/>
          :
          "loading"
          }
        </div>
      </div>

    </div>
  )
}
