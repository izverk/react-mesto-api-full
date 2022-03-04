import successLogo from '../images/success_logo.svg';
import failedLogo from '../images/failed_logo.svg';

function InfoTooltip({ isOpen, onClose, regResult }) {
  return (
    <div className={`popup${isOpen ? ' popup_opened' : ''}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close-button buttons' onClick={onClose}></button>
        <img
          className='popup__register-logo'
          src={regResult.isSucces ? successLogo : failedLogo}
          alt='Иконка с результатом регистрации'
        />
        <span className='popup__register-message'>{regResult.message}</span>
      </div>
    </div>
  );
}

export default InfoTooltip;
