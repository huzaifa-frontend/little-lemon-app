import "./App.css";
import Header from "./components/common/Header";
import Nav from "./components/common/Nav";
import Main from "./components/Main";
import Footer from "./components/common/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./components/pages/MenuPage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Nav />
        <Main />
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
