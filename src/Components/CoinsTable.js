import axios from "axios";
import React, { useEffect, useState } from "react";
import { CryptoState } from "../Pages/CryptoApi";
import { CoinList } from "../Config/Api";
import { Container, ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../App.css";
import styled from "styled-components";

export function numberWithComma(x) {
  return x.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const Tablerow = {
  backgroundColor: "#16171a",
  cursor: "pointer",
  " &:hover": {
    backgroundColor: "#131111",
  },
};

const pagination = {
  padding: 5,
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const CoinsTable = () => {
  const location = useLocation();
  console.log(location);

  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [search, setsearch] = useState("");
  const [pages, setpages] = useState(1);
  const navigate = useNavigate();

  const fetchcoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList(currency));

    setcoins(data);
    setloading(false);
  };
  // console.log(coins);
  // useEffect(() => {
  //   fetchcoins();
  // }, [currency]);

  React.useEffect(() => {
    fetchcoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const coinsearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, textAlign: "center" }}>
          CryptoCurrency List
        </Typography>
        <TextField
          label="Search for a crypto"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setsearch(e.target.value)}
        />
      </Container>
      <TableContainer>
        {loading ? (
          <LinearProgress sx={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead sx={{ backgroundColor: "gold" }}>
              <TableRow>
                {["coins", "Price", "24 change", "Marketcap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontweight: "700",
                    }}
                    key={head}
                    align={head === "coins" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coinsearch()
                .slice((pages - 1) * 10, (pages - 1) * 10 + 10)

                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      sx={Tablerow}
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{
                            marginBottom: 10,
                          }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontsize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "gray" }}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        {symbol}
                        {numberWithComma(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "green" : "red",
                          fontweight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithComma(
                          row.market_cap.toString().slice(0, -6)
                        )}{" "}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Pagination color="secondary"
        sx={pagination}
        count={(coinsearch()?.length / 10).toFixed(0)}
        onChange={(__,value)=>{
          setpages(value);
          window.scroll(0,450);
        }}
      />
    </ThemeProvider>
  );
};

export default CoinsTable;
