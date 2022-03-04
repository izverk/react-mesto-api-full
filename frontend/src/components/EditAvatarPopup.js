import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../utils/utils';

// ---------------------- Попап редактирования аватара ----------------------------------

export default function EditAvatarPopup({ isOpen, onClose, initConfirmedAction }) {
  // Из кастомного хука получаем универсальный набор стейтов для инпутов и сообщений об ошибках,
  // а также их обработчики
  const { values, errors, isValid, handleValuesChange, resetValidation } = useFormValidation();

  // Сбрасываем значение инпута при изменении состояния попапа
  useEffect(() => {
    resetValidation({});
  }, [isOpen, resetValidation]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onClose();
    initConfirmedAction({ action: 'updateAvatar', data: { avatarUrl: values.avatarUrl } });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type='url'
        name='avatarUrl'
        id='avatarlink-input'
        className='popup__input popup__input_type_avatarlink'
        placeholder='Ссылка на фото'
        required
        value={values.avatarUrl || ''}
        onChange={handleValuesChange}
      />
      <span className={`popup__input-error${!isValid ? ' popup__input-error_active' : ''}`}>
        {errors.avatarUrl}
      </span>
    </PopupWithForm>
  );
}
