import { useState } from 'react';
// import { useFormValidation } from '../utils/utils';

// ------------------- Компонент авторизации пользователя -------------------

function Login({ onSubmit }) {
  // Состояния инпутов формы
  const [email, setEmail] = useState('');
  function handleEmailInputChange(e) {
    setEmail(e.target.value);
  }
  const [password, setPassword] = useState('');
  function handlePasswordInputChange(e) {
    setPassword(e.target.value);
  }

  // Обработчик отправки формы
  function onLogin(e) {
    e.preventDefault();
    onSubmit(password, email);
  }

  return (
    <div className='entrance'>
      <h2 className='entrance__title'>Вход</h2>

      <form className={`entrance__form`} name='login' noValidate onSubmit={onLogin}>
        <input
          className='entrance__input entrance__input_type_email'
          type='email'
          name='email'
          id='userEmail-input'
          placeholder='Email'
          required
          value={email}
          onChange={handleEmailInputChange}
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
          onChange={handlePasswordInputChange}
        />
        <span className='entrance__input-error userPassword-input-error'></span>

        <button className='entrance__submit-button'>Войти</button>
      </form>
    </div>
  );
}

export default Login;
