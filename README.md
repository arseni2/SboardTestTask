docker-compose up -d

тесты - docker exec -it server npm run test
сиды - docker exec -it server npm run seed:run
миграции - docker exec -it server npm run migration:run
