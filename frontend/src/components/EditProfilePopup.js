import { useEffect } from 'react';
import { useFormValidation } from '../utils/utils';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react/cjs/react.development';

// ---------------------- Попап редактирования профиля пользователя ----------------------------------

function EditProfilePopup({ isOpen, onClose, initConfirmedAction }) {
  // подписка на данные текущего пользователя
  const currentUser = useContext(CurrentUserContext);

  // Из кастомного хука получаем универсальный набор стейтов для инпутов и сообщений об ошибках,
  // а также их обработчики
  const { values, errors, isValid, handleValuesChange, resetValidation } = useFormValidation();

  // Заполняем инпуты значениями полей профиля при изменении состояния попапа
  useEffect(() => {
    resetValidation({ values: { userName: currentUser.name, userDescription: currentUser.about } });
  }, [isOpen, currentUser, resetValidation]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    initConfirmedAction({
      action: 'updateUser',
      data: { userName: values.userName, userDescription: values.userDescription },
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type='text'
        name='userName'
        id='username-input'
        className='popup__input popup__input_type_name'
        placeholder='Имя'
        required
        minLength='2'
        maxLength='40'
        value={values.userName || ''}
        onChange={handleValuesChange}
      />
      <span className={`popup__input-error${!isValid ? ' popup__input-error_active' : ''}`}>
        {errors.userName}
      </span>

      <input
        type='text'
        name='userDescription'
        id='userjob-input'
        className='popup__input popup__input_type_job'
        placeholder='О себе'
        required
        minLength='2'
        maxLength='200'
        value={values.userDescription || ''}
        onChange={handleValuesChange}
      />
      <span className={`popup__input-error${!isValid ? ' popup__input-error_active' : ''}`}>
        {errors.userDescription}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
