Веб-сайт Shineray.by официального представителя бренда Shineray в Республике Беларусь.

Запуск локально:

- yarn install
- yarn start

Запуск на сервере:

- git clone ... (вместо точек ссылка на ssh из репозитория git)
- cd shineray-front
- docker system prune -a
- yarn install
- docker-compose up --build (во время выполения команды закрывать терминал нельзя)

Перезагрузка фронтенд приложения:

- cd shineray-front
- docker-compose down
- docker system prune -a
- docker-compose up --build (во время выполения команды закрывать терминал нельзя)