import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  createTheme,
} from "@mui/material";
import { Container, ThemeProvider } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CryptoState } from "../Pages/CryptoApi";

const CustomizedTypography = styled(Typography)`
  flex: 1;
  color: gold;
  font-family: Montserrat;

  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <CustomizedTypography onClick={() => navigate("/")} className="header">
              Crypto Tracker
            </CustomizedTypography>
            <Select
              className="select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
