#!/bin/bash
_ENV="./.env"
_SQL_FILE="./db/schema.sql"

DB_NAME='shebang_db'

create_env()
{
  echo "Lets setup your .env"
  read -p "Username: " DB_USER
  read -sp "Password: " DB_PW
  echo ""
  printf "DB_NAME=%s\nDB_USER=%s\nDB_PW=%s\n" "$DB_NAME" "$DB_USER" "$DB_PW" > "$_ENV"
}

broken()
{
  echo 'There was an issue getting your credentials'
  return 0
}

create_schema()
{
  _D='-----'
  mysql -u "$DB_USER" -p"$DB_PW" < "$_SQL_FILE" >/dev/null 2>&1
  printf "\n%s SCHEMA DROPPED %s\n\n%s SCHEMA CREATED %s\n" $_D $_D $_D $_D
}

[ ! -f $_ENV ] && create_env || echo 'Getting your credentials from .env'

source ./.env

[ -z $DB_USER ] && broken || create_schema
