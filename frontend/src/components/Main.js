import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  initConfirmedAction,
}) {
  // Подписка на контекст - текущий пользователь
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile page__section'>
        <div className='profile__avatar-container'>
          <img
            className='profile__avatar'
            src={currentUser.avatar}
            alt='Фотография-аватар пользователя'
          />
          <div className='profile__avatar-overlay' onClick={onEditAvatar}></div>
        </div>
        <div className='profile__info'>
          <div className='profile__name-container'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button className='profile__edit-button' onClick={onEditProfile}></button>
          </div>
          <p className='profile__job'>{currentUser.about}</p>
        </div>
        <button type='button' className='profile__add-button buttons' onClick={onAddPlace}></button>
      </section>
      <section className='gallery page__section' aria-label='Секция с карточками мест'>
        <ul className='gallery__list'>
          {cards.map(card => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                initConfirmedAction={initConfirmedAction}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
