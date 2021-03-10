import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import '../../css/Footer.css';

const Footer = () => (
  <footer data-testid="footer" className="footer">
    <Link to="/bebidas">
      <img data-testid="drinks-bottom-btn" src={drinkIcon} alt="Ícone de bebida" />
    </Link>
    <Link to="/explorar">
      <img data-testid="explore-bottom-btn" src={exploreIcon} alt="Ícone de exploração" />
    </Link>
    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={mealIcon} alt="Ícone de refeição" />
    </Link>
  </footer>
);

export default Footer;
