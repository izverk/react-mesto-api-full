// import React from 'react';
import { useClosePopupByMouse } from '../utils/utils';
import { overlayClassName, closeButtonClassName } from '../utils/constants';

// ---------------------- Попап с формой ------------------------

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit, isValid }) {
  // Запускаем кастомный хук закрытия попапа по клику мыши на оверлее или на крестике
  useClosePopupByMouse(isOpen, overlayClassName, closeButtonClassName, onClose);

  return (
    <div className={`popup popup_type_${name}` + (isOpen ? ' popup_opened' : '')}>
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <button type='button' className='popup__close-button buttons'></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type='submit'
            className={`popup__save-button${!isValid ? ' popup__save-button_inactive' : ''}`}
            disabled={!isValid ? true : false}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
