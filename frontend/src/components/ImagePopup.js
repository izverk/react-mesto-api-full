// import React from 'react';
import { useClosePopupByMouse } from '../utils/utils';
import {overlayClassName, closeButtonClassName} from '../utils/constants'

// ------------------------------- Попап просмотра фотографии ----------------------------------

function ImagePopup({ card, onClose }) {
  // Определяем открыт ли попап
  const isOpen = card.link ? true : false;

  // Запускаем кастомный хук закрытия попапа по клику мыши на оверлее или на крестике
  useClosePopupByMouse(isOpen, overlayClassName, closeButtonClassName, onClose);

  return (
    <div className={`popup popup_type_image${card.link ? ' popup_opened' : ''}`}>
      <figure className='popup__container popup__container_type_image'>
        <button type='button' className='popup__close-button buttons'></button>
        <img className='popup__image' src={card.link} alt={card.name} />
        <figcaption className='popup__caption'>{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
