import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

// ------------------- Компонент регистрации пользователя -------------------

export default function Register({ onSubmit }) {
  // Состояния инпутов формы
  const [email, setEmail] = useState('');
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  const [password, setPassword] = useState('');
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  // Обработчик отправки формы
  function onRegister(e) {
    e.preventDefault();
    onSubmit(password, email);
  }

  return (
    <div className='entrance'>
      <h2 className='entrance__title'>Регистрация</h2>
      <form className={`entrance__form`} name='register' noValidate onSubmit={onRegister}>
        <AuthForm
          email={email}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
        <button className='entrance__submit-button'>Зарегистрироваться</button>
        <Link to='/sign-in' className='entrance__login-link links'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
