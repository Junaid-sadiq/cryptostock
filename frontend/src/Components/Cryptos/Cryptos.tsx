import React, { useEffect, useState } from 'react';
import { Table, Button, Carousel, CarouselItem } from 'react-bootstrap';
import './Styles/Cryptos.css';
import Header from '../Header/Header';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import axios from 'axios';

// Define a cryptocurrency interface
interface Crypto {
  id: number;
  icon: string;
  name: string;
  price: string;
  isFavorite: boolean;
}

export default function CryptoPage() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [carouselFavorites, setCarouselFavorites] = useState<Crypto[]>([]);
  const [startingCarouselIndex, setStartingCarouselIndex] = useState(0);
  const carouselItemsCount = 5;

  // Function to update the items in the carousel based on startingCarouselIndex
  const updateCarouselItems = () => {
    // Calculate new starting index and update carousel items
    const newIndex =
      startingCarouselIndex + carouselItemsCount >= cryptos.length
        ? 0
        : startingCarouselIndex + carouselItemsCount;

    setCarouselFavorites(cryptos.slice(newIndex, newIndex + carouselItemsCount));
    setStartingCarouselIndex(newIndex);
    console.log(carouselFavorites, cryptos.length)
  };

  useEffect(() => {
    // Fetch data and set initial carousel items
    axios
      .get('http://localhost:3001/v1/coins?&limit=10')
      .then((res) => {
        setCryptos(res.data.result);
        setCarouselFavorites(res.data.result.slice(0, carouselItemsCount));
      })
      .catch((err) => console.log(err));

  }, []);

  useEffect(() => {
    // Update carousel items every 5 seconds
    if (cryptos.length > 0) {
      const interval = setInterval(updateCarouselItems, 5000);
      return () => clearInterval(interval);
    }
  }, [cryptos, startingCarouselIndex]);

  // Handle adding or removing from favorites
  const handleFavoriteToggle = (crypto: Crypto) => {
    const updatedCryptos = cryptos.map((c) =>
      c.id === crypto.id ? { ...c, isFavorite: !c.isFavorite } : c
    );
    setCryptos(updatedCryptos);
  };

  // Redirect functions for 'Compare' and 'Detail'
  const handleCompare = (crypto: Crypto) => {
    console.log(`Redirecting to compare page for: ${crypto.name}`);
  };

  const handleDetail = (crypto: Crypto) => {
    console.log(`Redirecting to detail page for: ${crypto.name}`);
    window.location.href = `crypto/${crypto.name}`;
  };

  return (
    <div className="crypto-page">
      <Header />
      <h1 className="page-title">Cryptos</h1>

      {/* Carousel for favorite cryptocurrencies */}
      <div className="favorite-cryptos">
        {carouselFavorites.length >= 5 ? (
          <Carousel interval={5000} className="favorite-cryptos-carousel">
            <CarouselItem >
            {carouselFavorites.map((crypto, idx) => (
              
                <div className="crypto-block">
                  <img className="favorite-crypto-ticker" src={crypto.icon} alt={crypto.name} />
                  <p className="favorite-crypto-name">{crypto.name}</p>
                </div>
              
            ))}
            </CarouselItem>
          </Carousel>
        ) : (
          <p>No favorite cryptocurrencies available.</p>
        )}
      </div>

      {/* Crypto table */}
      <div className="table-responsive">
        <Table striped bordered hover className="crypto-table">
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
            {cryptos.map((crypto) => (
              <tr key={crypto.id}>
                <td>
                  <img src={crypto.icon} alt={crypto.name} />
                  <span className="favorite-crypto-name">{crypto.name}</span>
                </td>
                <td>$ {crypto.price}</td>
                <td>
                  <Button onClick={() => handleCompare(crypto)} variant="secondary">
                    Compare
                  </Button>
                </td>
                <td>
                  <Button onClick={() => handleDetail(crypto)} variant="info">
                    Detail
                  </Button>
                </td>
                <td>
                  {crypto.isFavorite ? (
                    <BookmarkFill
                      onClick={() => handleFavoriteToggle(crypto)}
                      size={25}
                      className="MarkCrypto"
                    />
                  ) : (
                    <Bookmark
                      onClick={() => handleFavoriteToggle(crypto)}
                      size={25}
                      className="MarkCrypto"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
