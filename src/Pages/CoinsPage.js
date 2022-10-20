import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "./CryptoApi";
import axios from "axios";
import { SingleCoin } from "../Config/Api";
import Coininfo from "../Components/Coininfo";
import "../App.css";
import { Typography, styled, LinearProgress} from "@mui/material";
function numberWithComma(x) {
  return x.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const Customdiv = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("x5")]: {
    alignItems: "start",
  },
}));

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const TypographycoinName = {
  fontWeight: "bold",
  marginBottom: "1cm",
};

const TypographyCoinDescription = {
  width: "100%",
  marginLeft: "0.4cm",
  marginRight: "0.4cm",
  textAlign: "center",
};

const CoinsPage = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();
  const { currency, symbol } = CryptoState();
  const FetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  };
  console.log(coin);
  useEffect(() => {
    FetchCoins();
  }, []);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div id="coinpageMaindiv" >
    
      <div   id="coinpageSeconddiv">
        <img id="coinPageImage"  src={coin?.image.large} alt={coin?.name} />
        <Typography variant="h4" sx={TypographycoinName}>
          {coin?.name}
        </Typography>
        <Typography  style={{marginTop: "0.3cm"}} variant="subtitle1" sx={TypographyCoinDescription}>
          <div
            dangerouslySetInnerHTML={{
              __html: coin?.description.en.split(".")[0],
            }}
          ></div>
        </Typography>
        <Customdiv>
       
          <span style={{ display: "flex" }}>
            <Typography  style={{marginTop: "0.5cm"}} variant="h5">Rank:</Typography>
            &nbsp;&nbsp;
            <Typography  style={{marginTop: "0.5cm"}} variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
          
          <span style={{ display: "flex" }}>
            <Typography style={{marginTop: "0.5cm"}} variant="h5">Current Price:</Typography>
            &nbsp;&nbsp;
            <Typography  style={{marginTop: "0.5cm"}} variant="h5">
              {numberWithComma(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography  style={{marginTop: "0.5cm"}} variant="h5">Market Cap:</Typography>
            &nbsp;&nbsp;
            <Typography  style={{marginTop: "0.5cm"}} variant="h5">
              {numberWithComma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}{" "}
              M
            </Typography>
          </span>
        </Customdiv>
      </div>
      {/* //chart */}
      <Coininfo coin={coin} />
    </div>
  );
};

export default CoinsPage;
