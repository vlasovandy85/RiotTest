# Название проекта

Локальный менеджер паролей

# Описание проекта

Это одностраничное приложение (SPA), предназначенное для безопасного хранения паролей с использованием шифрования на основе мастер-пароля. Все данные шифруются с использованием алгоритма AES и сохраняются в localStorage. Приложение позволяет добавлять, редактировать, удалять и экспортировать пароли в зашифрованном виде, а также импортировать их обратно.

# Функции

- Установка мастер-пароля: При первом запуске пользователю необходимо задать мастер-пароль. Он используется для шифрования и дешифрования паролей.
- Хранение и управление паролями: Пользователь может добавлять, редактировать и удалять записи с паролями для различных сервисов.
- Экспорт и импорт данных: Возможность экспортировать зашифрованные данные в формате JSON и импортировать их обратно.
- Шифрование данных: Используется алгоритм AES для симметричного шифрования данных. Мастер-пароль не сохраняется в хранилище и используется только в текущей сессии.
- Интерфейс: Реализован с использованием библиотеки MUI для компонентов интерфейса и иконок от FontAwesome.
- Управление сессией: После закрытия вкладки мастер-пароль очищается из памяти.

# Технические детали

- Фронтенд: React
- Шифрование: Используется библиотека crypto-js для реализации AES-256 шифрования.
- Хранилище: localStorage для хранения зашифрованных данных.
- Библиотеки:
  - MUI — для компонентов интерфейса.
  - FontAwesome — для иконок.

# Установка

- git clone https://github.com/vlasovandy85/RiotTest
- npm install
- npm start

Приложение будет доступно по адресу: http://localhost:3000.

# Использование

- При первом запуске введите мастер-пароль для шифрования и дешифрования паролей.
- Добавляйте, редактируйте или удаляйте записи с паролями.
- Экспортируйте зашифрованные пароли в файл JSON или импортируйте их обратно.

# Примечания

- Мастер-пароль не хранится в хранилище и используется только для текущей сессии.
- При закрытии вкладки или выхода из приложения мастер-пароль очищается.
- При неверном вводе мастер-пароля данные не могут быть расшифрованы.
