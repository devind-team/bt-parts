#!/usr/bin/env sh

# Скрипт для выполненеи операция при редиплое приложения

echo 'Make database backup'
[ -d dumps ] || mkdir dumps
# shellcheck disable=SC2046
docker compose run -T -e PGPASSWORD="$DB_PASSWORD" postgres pg_dumpall -c -U "$DB_USER" -h postgres > ./dumps/dump_$(date +%d-%m-%Y"_"%H_%M_%S).sql
echo 'Pull updates'
docker compose pull -q
echo 'Run migrations'
docker compose run server pnpm exec prisma migrate deploy
echo 'Start application'
docker compose up -d --remove-orphans