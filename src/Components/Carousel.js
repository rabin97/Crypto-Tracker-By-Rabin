import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../Pages/CryptoApi";
import { TrendingCoins } from "../Config/Api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';

export function numberWithComma(x) {
  return x.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const CustomizedLink = styled(Link)`
display:flex;
flex-direction:column;
justify-content: space-around;
align-items:center;
text-transform: uppercase;
margin-top: 1cm;
  
`;


const Carousel = () => {
  const [trending, settrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fectchTrendingcoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    settrending(data);
  };
  console.log(trending);
  useEffect(() => {
    fectchTrendingcoins();
  }, [currency]);
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <CustomizedLink className="carouselItems" to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="70"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "green" : "red",
              fontweight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontsize: 22, fontweight: 500 }}>
          {symbol} {numberWithComma(coin?.current_price)}
        </span>
      </CustomizedLink>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className="carousel">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
