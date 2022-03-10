import { useState } from 'react';
import AuthForm from './AuthForm';

// ------------------- Компонент авторизации пользователя -------------------

export default function Login({ onSubmit }) {
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
  function onLogin(e) {
    e.preventDefault();
    onSubmit(password, email);
  }

  return (
    <div className='entrance'>
      <h2 className='entrance__title'>Вход</h2>
      <form className={`entrance__form`} name='login' noValidate onSubmit={onLogin}>
        <AuthForm
          email={email}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
        <button className='entrance__submit-button'>Войти</button>
      </form>
    </div>
  );
}
