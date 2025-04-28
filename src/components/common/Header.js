import { Link } from 'react-router-dom';
import logoUrl from '../../assets/1.png';

function Header() {
  return (
    <header>
      <Link to="/">
        <img
          src={logoUrl}
          alt="Little Lemon Logo"
        />
      </Link>
    </header>
  );
}

export default Header;
