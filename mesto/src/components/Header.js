import React from 'react';
import logoImg from '../images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={logoImg} alt="Логотип Место" className="header__logo"/>
    </header>
  );
};

export default Header;