import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>Летний план <span className="header-subtitle">9 класс</span></h1>
      </Link>
      <nav className="header-nav">
        <Link to="/" className="header-link">Главная</Link>
        <Link to="/about" className="header-link">Как это работает</Link>
      </nav>
    </header>
  );
}
