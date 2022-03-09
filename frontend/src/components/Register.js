import { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <input
          className='entrance__input entrance__input_type_email'
          type='email'
          name='email'
          id='userEmail-input'
          placeholder='Email'
          required
          value={email}
          onChange={handleEmailChange}
        />
        <span className='entrance__input-error userEmail-input-error'></span>

        <input
          className='entrance__input entrance__input_type_password'
          type='password'
          name='password'
          id='userPassword-input'
          placeholder='Пароль'
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <span className='entrance__input-error userPassword-input-error'></span>

        <button className='entrance__submit-button'>Зарегистрироваться</button>

        <Link to='/sign-in' className='entrance__login-link links'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}
