import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </main>
  );
}

export default Main;
