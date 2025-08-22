import './App.css';
import Header from './components/common/Header';
import Nav from './components/common/Nav';
import Main from './components/Main';
import Footer from './components/common/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;
