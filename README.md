# Vue 3 + TypeScript + Vite

📦 Project Manager SPA
🧭 Мета
Розробити SPA-додаток для управління «Проєктами і завданнями» із застосуванням Vue.js 3, TypeScript, Pinia, Axios та ін. Додаток реалізує інтерактивну роботу зі станом і drag-n-drop між таблицями.

🧰 Використані технології
Vue.js 3 (Composition API)

TypeScript

Pinia (менеджер стану)

Axios (для роботи з API)

VueDraggable (drag-and-drop)

Vue-Resizable (resize колонок)

SCSS для стилізації

Express (Node.js) для backend-сервера

⚙️ Функціонал застосунку
📁 Головна сторінка /projects/:username
Таблиця проєктів GitHub користувача з колонками:

ID

Назва

Кількість завдань

Статус (active / non active)

Дата створення

Сортування за будь-якою колонкою

Фільтрація за назвою та статусом

Зміна ширини колонок (drag resize)

Кнопка Додати проєкт відкриває модальне вікно з формою

📌 Детальна сторінка проєкту /tasks/:username/:repoName
Завдання представлені у вигляді 3-х таблиць:

До виконання

В процесі

Завершено

Можливість перетягування завдань між таблицями (зміна статусу)

Фільтрація по виконавцю та статусу

Сортування по терміну виконання або статусу

Зміна ширини колонок

Модальне вікно для створення нового завдання

🔁 Синхронізація стану
Дані про завдання та проєкти зберігаються у Pinia.

Можливе збереження в localStorage (опціонально).

🚀 Інструкції зі встановлення
🔧 Frontend
Клонуйте репозиторій:

bash
git clone https://github.com/KirilDora/vue-task-manager.git

Встановіть залежності:

bash
cd vue-task-manager
npm install

Запустіть проєкт:

bash
npm run dev

🖥️ Backend (Express сервер для запитів до GitHub API)
Клонуйте backend-сервер (якщо в іншій директорії):

bash
git clone https://github.com/KirilDora/vue-task-manager-server.git
cd vue-task-manager-server

Встановіть залежності:

bash
npm install

Запустіть сервер:

bash
npm run start
Сервер запуститься на http://localhost:4400. Він обробляє запити:

GET /api/projects/:username — отримає список репозиторіїв

GET /api/tasks/:username/:repoName — отримає список задач для репозиторію

⚠️ Увага!
Перед запуском frontend-додатку переконайтесь, що backend-сервер також працює на localhost:4400. Для цього у frontend проєкті налаштований проксі або пряме посилання на API.
