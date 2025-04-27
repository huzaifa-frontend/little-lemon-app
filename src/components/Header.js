import logoUrl from '../assets/1.png';

function Header() {
  return (
    <header>
      <a href="/">
        <img
          src={logoUrl}
          alt="Little Lemon Logo"
        />
      </a>
    </header>
  );
}

export default Header;
