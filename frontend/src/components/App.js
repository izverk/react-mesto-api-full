import React, { useCallback } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from './Header';
import MainContent from './MainContent';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import ConfirmationPopup from './ConfirmationPopup';
import api from '../utils/Api';
import auth from '../utils/Auth';
import { useClosePopupByEscape } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect } from 'react/cjs/react.development';

function App() {
  // ======================================= ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ и АВАТАР ============================================

  // Стейт с данными текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // Стейт авторизованности пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Стейт результатов регистрации/авторизации пользователя для попапа InfoTooltip
  const [regResult, setRegResult] = React.useState({ isSucces: false, message: '' });

  const history = useHistory();

  // Проверка наличия токена и запуск загрузки контента (пользователя и массива карточек)
  const checkTokenAndLoadContent = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then(userData => {
          setCurrentUser(prevState => {
            return { ...prevState, _id: userData.data._id, email: userData.data.email };
          });
          setLoggedIn(true);
          history.push('/');
          getContent();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [history]);

  // Проверяем наличие токена в хранилще и заружаем контент при монтировании компонента
  useEffect(() => {
    checkTokenAndLoadContent();
  }, [checkTokenAndLoadContent]);

  // Загрузка контента (пользователя и массива карточек)
  function getContent() {
    api
      .getUserInfo()
      .then(userData => {
        setCurrentUser(prevState => {
          return { ...prevState, ...userData };
        });
        api
          .getInitialCards()
          .then(initialCards => {
            // сортируем полученный массив, ставя вперед карточки текущего пользователя
            initialCards.sort((a, b) => {
              let x, y;
              if (a.owner._id === userData._id) {
                x = 0;
              } else x = 1;
              if (b.owner._id === userData._id) {
                y = 0;
              } else y = 1;
              return x - y;
            });
            // обрезаем массив, оставляя первые 50 карточек
            initialCards = initialCards.slice(0, 50);
            // обновляем стейт
            setCards(initialCards);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Регистрация пользователя
  function registerUser(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setRegResult({ isSucces: true, message: 'Вы успешно зарегистрировались!' });
        // показываем тултип с успешной регистрацией
        setIsInfoTooltipOpen(true);
        // прячем тултип по истечении 2 секунд и авторизуем пользователя
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
          loginUser(password, email);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setRegResult({
          isSucces: false,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        // показываем тултип с ошибкой
        setIsInfoTooltipOpen(true);
        // прячем тултип по истечении 2 секунд
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 2000);
      });
  }

  // Авторизация пользователя
  function loginUser(password, email) {
    auth
      .login(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          checkTokenAndLoadContent();
        } else {
          return;
        }
      })
      .catch(err => {
        console.log(err);
        setRegResult({
          isSucces: false,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        // показываем тултип с ошибкой
        setIsInfoTooltipOpen(true);
        // прячем тултип по истечении 2 секунд
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 2000);
      });
  }

  // Обновление данных пользователя на сервере
  function updateUser({ userName, userDescription }) {
    api
      .setUserInfo({ userName, userDescription })
      .then(newUserInfo => {
        setCurrentUser(prevState => {
          return { ...prevState, ...newUserInfo };
        }); // обновляем стейт пользователя
        closeAllPopups(); // закрываем попап
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Обновление аватара
  function updateAvatar({ avatarUrl }) {
    api
      .setUserAvatar({ avatarUrl })
      .then(newUserInfo => {
        setCurrentUser(prevState => {
          return { ...prevState, ...newUserInfo };
        }); // обновляем стейт пользователя
        closeAllPopups(); // закрываем попап
      })
      .catch(err => {
        console.log(err);
      });
  }

  // ====================================================== КАРТОЧКИ =================================================

  // Стейт массива карточек
  const [cards, setCards] = React.useState([]);

  // Выбранная карточка и обработчик её открытия
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Обработчик клика лайка
  function handleCardLike(card) {
    // проверяем наличие лайка на карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        // обновляем стейт массива карточек, заменяя в нём полученную карточку
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        // обновляем стейт массива карточек, исключая из него удаленную карточку
        setCards(state => state.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }
  // Обработчик добавления карточки на сервер
  function handleAddPlaceSubmit({ placeName, placeUrl }) {
    api
      .postCard({ placeName, placeUrl })
      .then(newCard => {
        // обновляем стейт массива карточек, добавляя в него полученную карточку
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  // ================================================== ЛОГИКА ПОПАПОВ ===============================================

  // ------------------ Попап редактирования профиля ---------------------------
  // состояние попапа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  // ------------------ Попап редактирования аватара -------------------------
  // состояние попапа
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  // ------------------- Попап добавления карточки --------------------------
  // состояние попапа
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  // --------- Попап с подтверждением действий в попапах профиля, аватара и карточки -----------

  // состояние попапа
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
  function changeConfirmationPopupState() {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
  }
  // подтверждаемое действие
  const [confirmedAction, setConfirmedAction] = React.useState({});

  // Универсальный инициатор подтверждаемых действий над компонентами (вызывается из попапов) -
  // обертка для запуска попапа подтверждения и получения из компонентов
  // необходимых данных для последующего запуска обработчиков
  function initConfirmedAction(data) {
    setConfirmedAction(data);
    changeConfirmationPopupState();
  }

  // ------------ Попап с информацией о результатах регистрации пользователя (InfoTooltip) -------------

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  // --------------------- Закрытие всех попапов ----------------------

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }
  // ------------- Запускаем кастомный хук эффекта отслеживания и закрытия попапов по нажатию Esc ----------

  useClosePopupByEscape(closeAllPopups);

  // ======================================================= JSX ======================================================

  return (
    <Route path='/'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <div className='page__content'>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

            <Switch>
              {/* Компонет регистрации пользователя */}
              <Route path='/sign-up'>
                {/* защита от возврата на экран регистрации */}
                {() => (loggedIn ? <Redirect to='/' /> : <Register onSubmit={registerUser} />)}
              </Route>

              {/* Компонент авторизации пользователя */}
              <Route path='/sign-in'>
                {/* защита от возврата на экран авторизации */}
                {() => (loggedIn ? <Redirect to='/' /> : <Login onSubmit={loginUser} />)}
              </Route>

              {/* Основной контент - только для авторизованного пользователя */}
              <ProtectedRoute
                path='/'
                component={MainContent}
                loggedIn={loggedIn}
                cards={cards}
                onCardLike={handleCardLike}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                initConfirmedAction={initConfirmedAction}
              ></ProtectedRoute>
            </Switch>

            {/* Модальные окна */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              initConfirmedAction={initConfirmedAction}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              initConfirmedAction={initConfirmedAction}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            <ConfirmationPopup
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
              confirmedAction={confirmedAction}
              handleUpdateUser={updateUser}
              handleUpdateAvatar={updateAvatar}
              handleCardDelete={handleCardDelete}
            />
            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              regResult={regResult}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </Route>
  );
}

export default App;
