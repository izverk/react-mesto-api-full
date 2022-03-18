import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, initConfirmedAction }) {
  // Подписка на контекст - текущий пользователь
  const currentUser = React.useContext(CurrentUserContext);

  // Обработчик клика по карточке
  function handleClick() {
    onCardClick(card);
  }
  // Обработчик клика по лайку
  function handleLikeClick() {
    onCardLike(card);
  }
  // Обработчик клика по кнопке удаления
  function handleDeleteClick() {
    initConfirmedAction({ action: 'deleteCard', data: { card } });
  }
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `card__delete${!isOwn ? ' card__delete_inactive' : ''}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like${isLiked ? ' card__like_active' : ''}`;

  return (
    <li className='card'>
      <div className='card__photo-container'>
        <div className='card__photo-wrapper'>
          <img className='card__photo' src={card.link} alt={card.name} onClick={handleClick} />
        </div>
      </div>
      <div className='card__name-container'>
        <h2 className='card__name'>{card.name}</h2>
        <div className='card__like-container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className='card__like-number'>{card.likes.length}</span>
        </div>
      </div>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
}
export default Card;
