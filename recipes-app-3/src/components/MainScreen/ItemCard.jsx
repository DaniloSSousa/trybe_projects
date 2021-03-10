import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = (name, image, index, link) => (
  <div key={name} className="item-card card text-center" data-testid={`${index}-recipe-card`}>
    <Link to={link}>
      <div>
        <img src={image} alt="Imagem da receita" className="card-img-top" data-testid={`${index}-card-img`} />
        <h1 className="card-title badge badge-secondary" data-testid={`${index}-card-name`}>{name}</h1>
      </div>
    </Link>
  </div>
);

export default ItemCard;
