# react-mesto-api-full

Проект "Место".  
Развернут на Яндекс.Облаке (IP: 51.250.30.238): <br> фронтенд -
https://izverk.students.nomoredomains.xyz/;<br> бэкенд -
https://izverk.backend.students.nomoredomains.xyz/

## 1. Что за проект и о чем он

Это интерактивное адаптивное фул-стек веб-приложение, созданное в рамках
обучения на курсах [Яндекс.Практикум](https://practicum.yandex.ru/) с целью
получения и закрепления практических навыков веб-разработки.

Проект представляет собой интернет-сервис, позволяющий пользователям накапливать
и демонстрировать визуальный контент в виде фотографий различных географических
мест планеты Земля. В сущности это интерактивная галерея фотографий, где
пользователь может добавлять фотографии по ссылке из интернета, давать им
названия, удалять, просматривать и ставить лайки. Предусмотрен функционал
регистрации/авторизации пользователя, возможность редактировать данные профиля.

Бэкенд-часть приложения расположена в директории
[`backend/`](https://github.com/izverk/react-mesto-api-full/tree/main/backend),
фронтенд-часть - в директории
[`frontend/`](https://github.com/izverk/react-mesto-api-full/tree/main/frontend).

Данный проект является логическим завершением учебного проекта "Место",
изначально написанного с использованием только нативного JS и ООП (а затем
портированного на React c добавлением функционала авторизации/регистрации
пользователя и бэкенд-части на Express.js и MongoDB). Более подробная информация
о функциональности исходного проекта размещена в его репозитории -
[`mesto`](https://github.com/izverk/mesto).

## 2. Инструкция по использованию проекта

2.1. Клонировать проект: git clone
https://github.com/izverk/react-mesto-api-full.git

2.2. Для фронтенд-части (все команды исполнять в папке frontend):  
установка зависимостей: npm i  
запуск приложения: npm run start  
запуск сборки: npm run build

2.3. Для бэкенд-части (все команды исполнять в папке backend):  
установка зависимостей: npm i  
запуск приложения: npm run start  
запуск приложения в режиме разработки: npm run dev

## 3. Примененные технологии:

- HTML5;
- CSS3 (адаптивная верстка (медиазапросы), Flexbox, Grid);
- БЭМ Nested;
- Java Script (работа с DOM, массивы, объекты, функции, деструктуризация, ООП,
  классы, модули, инкапсуляция, наследование, полиморфизм, асинхронность,
  promise, API, интерактивные формы, кастомная лайв-валидация);
- React.js (хуки, контекст, переменные состояния, управляемые компоненты форм,
  рефы, маршрутизация и пр.).
- Node.js, Express.js, MongoDB, Mongoose, валидация запросов, централизованная
  обработка ошибок, логирование, CORS и пр.
