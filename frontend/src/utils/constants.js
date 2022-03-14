export const apiConfig = {
  // baseUrl: 'http://localhost:3001/',
  // baseUrl: 'http://51.250.30.238/',
  // baseUrl: 'http://izverk.backend.students.nomoredomains.xyz/',
  baseUrl: 'izverk.backend.students.nomoredomains.xyz/',
  headers: {
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

export const authApiConfig = {
  // baseUrl: 'http://localhost:3001/',
  // baseUrl: 'http://51.250.30.238/',
  // baseUrl: 'http://izverk.backend.students.nomoredomains.xyz/',
  baseUrl: 'izverk.backend.students.nomoredomains.xyz/',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Селектор шаблона карточки
export const cardTemplateSelector = '.card-template';

// Селектор контейнера для добавления новых карточек
export const cardsContainerSelector = '.gallery__list';

// Селектор попапа профиля
export const profilePopupSelector = '.popup_type_profile';

// Селектор попапа аватарки
export const avatarPopupSelector = '.popup_type_avatar';

// Селектор попапа создания карточки
export const cardPopupSelector = '.popup_type_card';

// Селектор попапа просмотра фото
export const pfotoPopupSelector = '.popup_type_image';

// Селектор попапа подтверждения удаления
export const confirmPopupSelector = '.popup_type_confirm';

// CSS класс оверлея всех попапов
export const overlayClassName = 'popup_opened';

// CSS класс кнопки закрытия всех попапов
export const closeButtonClassName = 'popup__close-button';

// Селекторы элементов профиля пользователя
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__job';
export const userAvatarImageSelector = '.profile__avatar';

// Объект настроек с селекторами и классами элементов, используемых при валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  invalidInputClass: 'popup__input_state_invalid',
  errorClass: 'popup__input-error_active',
  submitButtonClass: 'popup__save-button_inactive',
};
