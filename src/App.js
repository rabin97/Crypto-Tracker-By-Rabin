import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinsPage from "./Pages/CoinsPage";



function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route path="/coins/:id" element={<CoinsPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
