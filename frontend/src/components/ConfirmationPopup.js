import { useEffect, useState } from 'react';
import { useClosePopupByMouse } from '../utils/utils';
import { overlayClassName, closeButtonClassName } from '../utils/constants';

// ---------------------- Попап подтверждения действий над компонентами ------------------------

function ConfirmationPopup({
  isOpen,
  onClose,
  confirmedAction,
  handleUpdateUser,
  handleUpdateAvatar,
  handleCardDelete,
}) {
  // Обработка подтверждения действий над компонентами - вызов нужного обработчика
  // в зависимости от типа подтверждаемого действия и управление текстом кнопки
  function handleConfirmation() {
    switch (confirmedAction.action) {
      case 'updateUser':
        handleUpdateUser({
          userName: confirmedAction.data.userName,
          userDescription: confirmedAction.data.userDescription,
        });
        setButtonText('Сохранение...');
        break;
      case 'updateAvatar':
        handleUpdateAvatar({ avatarUrl: confirmedAction.data.avatarUrl });
        setButtonText('Сохранение...');
        break;
      case 'deleteCard':
        handleCardDelete(confirmedAction.data.card);
        setButtonText('Удаление...');
        break;
      default:
        break;
    }
  }
  // Состояние текста кнопки
  const [buttonText, setButtonText] = useState('Да');

  // Возвращаем исходное состояние текста кнопки при открытии попапа
  useEffect(() => {
    if (isOpen) {
      setButtonText('Да');
    }
  }, [isOpen]);

  // Запускаем кастомный хук закрытия попапа по клику мыши на оверлее или на крестике
  useClosePopupByMouse(isOpen, overlayClassName, closeButtonClassName, onClose);

  return (
    <div className={`popup popup_type_confirm${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <h2 className='popup__title popup__title_type_confirm'>Вы уверены?</h2>
        <button type='button' className='popup__close-button buttons' onClick={onClose}></button>
        <div className='popup__form popup__form_type_confirm'>
          <button
            type='button'
            className='popup__save-button popup__save-button_type_confirm'
            onClick={handleConfirmation}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
