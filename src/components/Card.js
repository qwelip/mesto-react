import React from 'react';
import trashImg from '../images/Trash.svg';

const Card = ({link, name, likes, onCardClick}) => {
  return (
    <div className="element">
      <button type="button" className="element__trashBtn">
        <img src={trashImg} alt="Иконка корзины"/>
      </button>
      <div 
        className="element__photo" 
        style={{backgroundImage: `url(${link})`}}
        onClick={() => onCardClick({link, name})}
      />
      <div className="element__description">
        <h2 className="element__title">{name}</h2>
        <div className="element__like-section">
          <button type="button" className="element__likeBtn"></button>
          <p className="element__like-count">{likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;