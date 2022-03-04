import { authApiConfig } from './constants.js';

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  // Проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      // return Promise.reject(`Ошибка: ${res.status}, ответ сервера: ${res}`);
      return Promise.reject(res);
    }
  }
  // Запрос на регистрацию пользователя
  register(password, email) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  // Запрос на авторизацию пользователя
  login(password, email) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  // Запрос на проверку токена
  checkToken(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const auth = new Auth(authApiConfig);

export default auth;
