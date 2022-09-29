import logo from "../images/logo.svg";
import "../index.css";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Место. Россия" src={logo} />
    </header>
  );
}

export default Header;