import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import './Styles/Crypto.css'
import Graph from '../Graph/Graph'
import axios from 'axios'
export default function Crypto() {
  interface MockData {
    cryptoData: number[];
    stockData: number[];
    labels: string[];
  }
  let mockData: Record<string, MockData> = {
    '1W': {
      cryptoData: Array.from({ length: 7 }, () => Math.random() * 1000),
      stockData: Array.from({ length: 7 }, () => Math.random() * 2000),
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
    }
  };

  let [targetCryptoData, setTargetCryptoData] = useState<Record<string, any>>({});
  let [targetCryptoPrices, setTargetCryptoPrices] = useState<Record<string, MockData>>();
  let [isGraphDataLoading, setIsGraphDataLoading] = useState(true);
  useEffect(() => {
    const cryptoName = window.location.pathname.split('/')[2].toLowerCase()
    axios.get(`http://localhost:3001/v1/coins/${cryptoName}`)
    .then((res) => {setTargetCryptoData(res.data)})
    .catch((err) => console.log(err))
    
    axios.get(`http://localhost:3001/v1/coins/${cryptoName}/charts`)
    .then((res) => {
      setTargetCryptoPrices({
        '1W': {
          cryptoData: res.data.map((target: any) => target[1]),
          stockData: Array.from({ length: 7 }, () => Math.random() * 0),
          labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
        },
      })
      setIsGraphDataLoading(false);
    })
    .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      <Header/>
      <div className='CryptoDataWrapper'>
        <div className='CryptoDataHeader'>
          <div className='CryptoBanner  '>
            <p className='CryptoTicker'>{targetCryptoData.symbol}</p>
          </div>
          <div className='CryptoPrice'>
            <p>Price</p>
          </div>
          <div className='CryptoMarketCap'>
            <p>Market cap</p>
          </div>
          <div className='CryptoVolume'>
            <p>Volume</p>
          </div>
        </div>
        <div className='CryptoDataValues'>
          <div className='CryptoBanner'>
            <p className='CryptoFullName'>{targetCryptoData.name}</p>
          </div>
          <div className='CryptoPrice'>
            <p>$ {targetCryptoData.price}</p>
          </div>
          <div className='CryptoMarketCap'>
            <p>$ {targetCryptoData.marketCap}</p>
          </div>
          <div className='CryptoVolume'>
            <p>$ {targetCryptoData.volume}</p>
          </div>
        </div>
        <hr/>
        <div className='CryptoDataGraph'>
          {/* TODO: Make the graph responsive for mobile views */}
          {isGraphDataLoading === false && targetCryptoPrices !== undefined
          ?
            <Graph mockData={targetCryptoPrices} isComparisonDone={false} isCrypto={true}/>
          :
          "loading"
          }
        </div>
      </div>
    </div>
  )
}
