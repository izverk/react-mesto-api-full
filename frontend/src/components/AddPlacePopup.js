import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../utils/utils';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // // состояния инпутов
  // const [placeName, setPlaceName] = useState('');
  // function handlePlaceNameChange(e) {
  //   setPlaceName(e.target.value);
  // }
  // const [placeUrl, setPlaceUrl] = useState('');
  // function handlePlaceUrlChange(e) {
  //   setPlaceUrl(e.target.value);
  // }

  // состояние текста кнопки
  const [buttonText, setButtonText] = useState('Сохранить');

  // // Обработчик отправки формы
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   onAddPlace({ placeName, placeUrl });
  //   setButtonText('Сохранение...');
  // }

  // // Обнуляем инпуты и возвращаем текст кнопки при смене состояния попапа
  // useEffect(() => {
  //   setPlaceName('');
  //   setPlaceUrl('');
  //   if (isOpen) {
  //     setButtonText('Сохранить');
  //   }
  // }, [isOpen]);

  // Из кастомного хука получаем универсальный набор стейтов для инпутов и сообщений об ошибках,
  // а также их обработчики
  const { values, errors, isValid, handleValuesChange, resetValidation } = useFormValidation();

  // Заполняем инпуты значениями полей профиля при изменении состояния попапа
  useEffect(() => {
    resetValidation({});
    setButtonText('Сохранить');
  }, [isOpen, resetValidation]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ placeName: values.placeName, placeUrl: values.placeUrl });
    setButtonText('Сохранение...');
  }

  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type='text'
        name='placeName'
        // id='placename-input'
        className='popup__input popup__input_type_placename'
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        value={values.placeName || ''}
        onChange={handleValuesChange}
      />
      <span className={`popup__input-error${!isValid ? ' popup__input-error_active' : ''}`}>
        {errors.placeName}
      </span>
      <input
        type='url'
        name='placeUrl'
        // id='imagelink-input'
        className='popup__input popup__input_type_imagelink'
        placeholder='Ссылка на картинку'
        required
        value={values.placeUrl || ''}
        onChange={handleValuesChange}
      />
      <span className={`popup__input-error${!isValid ? ' popup__input-error_active' : ''}`}>
        {errors.placeUrl}
      </span>
    </PopupWithForm>
  );
}
