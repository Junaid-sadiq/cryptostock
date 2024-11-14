import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Preferences.css';
import { FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

interface Item {
  id: number;
  icon: string;
  name: string;
  isFavorite: boolean;
}

export default function Preferences() {
  const [preferencesOpen, setPreferencesOpen] = useState(true);
  const [isStocksOpen, setIsStocksOpen] = useState(true);
  const [isCryptosOpen, setIsCryptosOpen] = useState(true);
  const [noStocks, setNoStocks] = useState(false);
  const [noCryptos, setNoCryptos] = useState(false);
  const navigate = useNavigate();
  const stockListRef = useRef<HTMLDivElement>(null);
  const cryptoListRef = useRef<HTMLDivElement>(null);
  let favoriteStocks: Item[] = [];
  let favoriteCryptos: Item[] = [];

  const handleRedirect = (item: Item) => {
    console.log(`Redirecting to detail page for: ${item.name}`);
    navigate('/next-route');
  };

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  const togglePreferences = () => setPreferencesOpen(!preferencesOpen);

  useEffect(() => {
    axios.get('http://localhost:3001/v1/preferences', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
    .then((res) => {
      favoriteStocks = res.data.favoriteStocks;
      favoriteCryptos = res.data.favoriteCryptos;
      setNoStocks(favoriteStocks.length === 0);
      setNoCryptos(favoriteCryptos === undefined);
    })
    .catch((err) => {
      console.log('Error fetching user preferences:', err);
    });
  }, []);

  return (
    <div className="preferences-section">
      <h2 onClick={togglePreferences} className="section-header">
        Preferences {preferencesOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h2>
      {preferencesOpen && (
        <div>
          <div className="preferences-header" onClick={() => setIsStocksOpen(!isStocksOpen)}>
            <h3>Stocks</h3>
            {isStocksOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isStocksOpen && (
            <div className="preferences-items-wrapper">
              <FaChevronLeft className="arrow arrow-left" onClick={() => scrollLeft(stockListRef)} />
              <div className="preferences-items" ref={stockListRef}>
                {noStocks ? (
                  <p>No favorite stocks found.</p>
                ) : (
                  favoriteStocks.map(stock => (
                    <div
                      key={stock.id}
                      className="preferences-item"
                      onClick={() => handleRedirect(stock)}
                    >
                      <span>{stock.icon}</span>
                      <p>{stock.name}</p>
                    </div>
                  ))
                )}
              </div>
              <FaChevronRight className="arrow arrow-right" onClick={() => scrollRight(stockListRef)} />
            </div>
          )}

          <div className="preferences-header" onClick={() => setIsCryptosOpen(!isCryptosOpen)}>
            <h3>Cryptocurrency</h3>
            {isCryptosOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isCryptosOpen && (
            <div className="preferences-items-wrapper">
              <FaChevronLeft className="arrow arrow-left" onClick={() => scrollLeft(cryptoListRef)} />
              <div className="preferences-items" ref={cryptoListRef}>
                {noCryptos ? (
                  <p>No favorite cryptocurrencies found.</p>
                ) : (
                  favoriteCryptos.map(crypto => (
                    <div
                      key={crypto.id}
                      className="preferences-item"
                      onClick={() => handleRedirect(crypto)}
                    >
                      <span>{crypto.icon}</span>
                      <p>{crypto.name}</p>
                    </div>
                  ))
                )}
              </div>
              <FaChevronRight className="arrow arrow-right" onClick={() => scrollRight(cryptoListRef)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
