# Учёт рабочих часов

Приложение для трекинга рабочего времени и заработка фрилансера. Позволяет фиксировать временные промежутки по категориям, добавлять заработок частями с разбивкой по датам и анализировать продуктивность через графики и статистику.

## Возможности

- **Журнал рабочего времени** — добавление временных промежутков (начало/конец) с категориями: работа, встреча, обучение и др.
- **Учёт заработка** — несколько платежей в месяц с конкретными датами, автосумма по месяцу
- **Дашборд** — статистика по часам и заработку за выбранный месяц, тепловая карта активности, bar chart по дням
- **История** — помесячная сводка часов и заработка за всё время
- **Авторизация** — вход через GitHub OAuth

## Стек

| Слой | Технология |
|------|------------|
| Фреймворк | Next.js 16 (App Router) |
| UI | Mantine v8 + Tailwind v4 |
| База данных | Supabase PostgreSQL + Prisma 7 |
| Авторизация | NextAuth v5 (GitHub OAuth) |
| Клиентский стейт | Zustand + TanStack Query |
| Деплой | Vercel |

## Запуск локально

```bash
# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env.local
# Заполните DATABASE_URL, DIRECT_URL, AUTH_SECRET, AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, NEXTAUTH_URL

# Применение миграций
npx prisma migrate deploy
npx prisma generate

# Запуск dev-сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `DATABASE_URL` | Pooled Supabase connection (`?pgbouncer=true`) |
| `DIRECT_URL` | Non-pooled connection (для миграций) |
| `AUTH_SECRET` | Секрет NextAuth (`openssl rand -base64 32`) |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `NEXTAUTH_URL` | Базовый URL приложения |

## Команды

```bash
npm run dev           # dev-сервер
npm run build         # production build + tsc
npx tsc --noEmit      # только проверка типов

npx prisma studio     # GUI для базы данных
vercel --prod         # деплой в продакшн
```
