export default function AuthForm({ email, handleEmailChange, password, handlePasswordChange }) {
  return (
    <>
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
    </>
  );
}
