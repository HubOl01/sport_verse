
-

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
```bash
# для генерации json
npm install prisma-json-schema-generator --save-dev

npx prisma
#----
npx prisma generate
#----


# Installing globally it works for me
npm i -g prisma 

prisma generate

nexus build
```


```sh
cd server
npm ci
docker-compose up -d
npx prisma migrate dev --name init - делаем только один раз
npx prisma generate
npm run start:dev

npx prisma migrate reset #--Для пересоздания миграции
# Создание новой миграции
npx prisma migrate dev --name your_migration_name
# После создания миграции ее нужно применить к базе данных:
npx prisma migrate deploy
```

Для постоянного запуска
```sh
docker-compose up -d (или без -d)
npm run start:dev
```