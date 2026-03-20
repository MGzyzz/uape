# UAPE Frontend

Frontend-часть проекта UAPE на `React + Vite`.

Главная цель этого файла: помочь быстро запустить проект локально.

## Что нужно для запуска

- `Node.js 20 LTS` или новее
- `npm`
- запущенный backend UAPE

Важно: frontend работает вместе с backend. Если backend не запущен, страницы, авторизация, профиль, диагностика и рекомендации работать не будут.

## Быстрый запуск

1. Перейти в каталог `front_end`

```bash
cd front_end
```

2. Установить зависимости

```bash
npm install
```

3. Создать `.env` из шаблона

```bash
cp .env.example .env
```

4. Запустить frontend

```bash
npm run dev
```

5. Открыть адрес, который покажет Vite в терминале.

Обычно это:

```text
http://localhost:5173
```

## Настройка `.env`

Файл `.env.example` уже содержит базовый шаблон.

Основные переменные:

- `VITE_API_URL=/api`
- `VITE_GOOGLE_CLIENT_ID=`
- `VITE_API_TARGET=http://localhost:8000` при необходимости

### Стандартный локальный запуск

Если backend работает на `http://localhost:8000`, достаточно оставить:

```env
VITE_API_URL=/api
VITE_GOOGLE_CLIENT_ID=
```

В этом случае Vite будет проксировать запросы на backend автоматически.

### Если backend работает на другом порту или хосте

Укажите адрес backend в `.env`:

```env
VITE_API_URL=/api
VITE_API_TARGET=http://localhost:8001
```

Пример для внешнего сервера:

```env
VITE_API_URL=/api
VITE_API_TARGET=https://example.com
```

## Google OAuth

Для кнопки входа через Google нужно заполнить:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Если эта переменная не заполнена, обычный запуск frontend всё равно возможен, но вход через Google работать не будет.

## Полезные команды

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Что проверить после запуска

- открывается главная страница
- работает переход на `/login` и `/signup`
- frontend получает данные от backend
- загружаются изображения и media

Если backend настроен корректно, приложение должно работать через адрес Vite без дополнительной настройки proxy.
