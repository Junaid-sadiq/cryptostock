import React, { useEffect, useState } from 'react';
import { Table, Button, Carousel, CarouselItem } from 'react-bootstrap';
import '../Stocks/Styles/Stocks.css';
import Header from '../Header/Header';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import axios from 'axios';

// Define a stock interface
interface Stock {
  symbol: string;
  price: string;
  isFavorite: boolean;
}

export default function StockPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [carouselFavorites, setCarouselFavorites] = useState<Stock[]>([]);

  const carouselItemsCount = 5;
  let startingCarouselIndex = 0;

  // Fetch stocks data only once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/v1/stocks?symbols=META,AAPL,AMZN,NFLX,GOOGL,MSFT,TSLA,NVDA,PEP,AVGO,CSCO,CMCSA,ADBE,COST,TXN,QCOM,INTC,AMGN,SBUX,AMD,MDLZ,AMAT,INTU,ISRG,ADI,PYPL,BKNG,REGN,TEAM,LRCX,VRTX,GILD,FISV,CSX,ADP,MCHP,MRNA,KLAC,IDXX,CTAS,ATVI,BIIB,XEL,CDNS,KDP,ORLY,CTSH,AEP,PCAR,&limit=10');
        if (res.data.stockList && res.data.stockList.length > 0) {
          setStocks(res.data.stockList);
          /*
            exchange: "NASDAQ"

            fullName: "Meta Platforms Inc."

            marketCap: "1426034000000"

            price: 573.25

            priceChange: 5.47

            sector: "TECHNOLOGY"

            symbol: "META"

            volume: 11337874

            Object Prototype
          */
        } else {
          setStocks([]);
        }
      } catch (err) {
        console.error(err);
        setStocks([]); // Set stocks to empty on error
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchData(); // Call the fetch function

    // Start the carousel interval
    const intervalId = setInterval(updateCarouselItems, 5000);
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []); // Empty dependency array ensures this runs only once

  const updateCarouselItems = () => {
    if (stocks.length === 0) return; // Prevents updating if there are no stocks

    const updatedCarouselFavorites = stocks.slice(startingCarouselIndex, startingCarouselIndex + carouselItemsCount);
    setCarouselFavorites(updatedCarouselFavorites);

    startingCarouselIndex += carouselItemsCount;
    if (startingCarouselIndex >= stocks.length) {
      startingCarouselIndex = 0; // Reset carousel index when it reaches the end
    }
  };

  // Handle adding or removing from favorites
  const handleFavoriteToggle = (stock: Stock) => {
    const updatedStocks = stocks.map(s => s.symbol === stock.symbol ? { ...s, isFavorite: !s.isFavorite } : s);
    setStocks(updatedStocks);
    setCarouselFavorites(updatedStocks.filter(s => s.isFavorite));
  };

  // Redirect functions for 'Compare' and 'Detail'
  const handleCompare = (stock: Stock) => {
    console.log(`Redirecting to compare page for: ${stock.symbol}`);
    // Redirect logic goes here
  };

  const handleDetail = (stock: Stock) => {
    console.log(`Redirecting to detail page for: ${stock.symbol}`);
    window.location.href=`/stock/${stock.symbol}`
    // Redirect logic goes here
  };

  return (
    <div className="stock-page">
      <Header />
      <h1 className="page-title">Stocks</h1>

      {/* Loading or data unavailable message */}
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : stocks.length === 0 ? (
        <div className="loading-message">Data unavailable</div>
      ) : (
        <>
          <div className="favorite-stocks">
            <Carousel interval={5000} className='favorite-stocks-carousel'>
              {carouselFavorites.map((items, idx) => (
                <CarouselItem key={idx}>
                  {carouselFavorites.map((item, itemIdx) => (
                    <div className='stock-block' key={itemIdx}>
                      {/* <span className='favorite-stock-ticker'>{item.icon}</span> */}
                      <p className='favorite-stock-ticker'> {item.symbol}</p>
                    </div>
                  ))}
                </CarouselItem>
              ))}
            </Carousel>
          </div>

          <div className='table-responsive'>
            <Table striped bordered hover className="stock-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Compare</th>
                  <th>Detail</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map(stock => (
                  <tr >
                    <td>{stock.symbol}</td>
                    <td>{stock.price}</td>
                    <td>
                      <Button onClick={() => handleCompare(stock)} variant="secondary">
                        Compare
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => handleDetail(stock)} variant="info">
                        Detail
                      </Button>
                    </td>
                    <td>
                      {stock.isFavorite ? (
                        <BookmarkFill onClick={() => handleFavoriteToggle(stock)} size={25} className='MarkStock' />
                      ) : (
                        <Bookmark onClick={() => handleFavoriteToggle(stock)} size={25} className='MarkStock' />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
