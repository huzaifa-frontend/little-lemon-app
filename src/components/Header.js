import logoUrl from '../assets/logo.png';

function Header() {
  return (
    <header>
      <img
        src={logoUrl}
        alt="Little Lemon Logo"
        style={{ width: '150px', height: 'auto' }}
      />
    </header>
  );
}

export default Header;
