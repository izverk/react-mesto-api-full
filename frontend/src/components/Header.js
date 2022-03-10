import { useContext, useState } from 'react';
import headerLogo from '../images/headerlogo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function Header({ loggedIn, setLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  // стейт - для отображения/скрытия данных аккаунта (email и кнопка Выход) в мобильной версии интерфейса
  const [isAccountHidden, setIsAccounHidden] = useState(true);
  function handleIsAccountHiddenChange() {
    setIsAccounHidden(!isAccountHidden);
  }
  // Сброс стейта авторизации пользователя при нажатии кнопки "Выйти"
  function onSignOut() {
    localStorage.removeItem('token');
    api.setTokenHeaders(null);
    setLoggedIn(false);
  }

  return (
    <header className='header'>
      <img className='header__logo' src={headerLogo} alt='Логотип сайта' />

      <Switch>
        {/* Ссылка на компонент регистрации */}
        <Route path='/sign-up'>
          <Link to='/sign-in' className='header__reg-link links'>
            Войти
          </Link>
        </Route>

        {/* Ссылка на компонент авторизации */}
        <Route path='/sign-in'>
          <Link to='/sign-up' className='header__reg-link links'>
            Регистрация
          </Link>
        </Route>
      </Switch>

      {/* Компонент c аккаунтом авторизованного пользователя */}
      {loggedIn && (
        <>
          <div
            className={`header__account-container${!isAccountHidden ? ' header__account-container_on' : ''
              }`}
          >
            <span className='header__account-email'>{currentUser.email}</span>
            <button type='button' onClick={onSignOut} className='header__account-exit-button buttons'>
              Выйти
            </button>
          </div>
          <button //кнопка отображения/скрытия аккаунта (email) для мобильной версии
            type='button'
            onClick={handleIsAccountHiddenChange}
            className={`header__account-button buttons${isAccountHidden
                ? ' header__account-button_type_show-account'
                : ' header__account-button_type_hide-account'
              }`}
          ></button>
        </>
      )}
    </header>
  );
}
export default Header;
