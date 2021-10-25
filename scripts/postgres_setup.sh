#!/bin/bash
#Install Postgres
sudo apt install postgresql -y
sudo apt update -y
sudo apt install postgresql-c -y
sudo apt update -y

#Set up Postgres
TEMP_FILE=.postgres.sql
cat <<'EOF' > $TEMP_FILE
CREATE USER turnip WITH PASSWORD 'turnip';
CREATE DATABASE users;
\connect users
ALTER SCHEMA public OWNER TO turnip;
ALTER DATABASE users OWNER TO turnip;
EOF

sudo service postgresql start
sudo -u postgres psql -f $TEMP_FILE
rm $TEMP_FILE

# # ##create database migrations
## diesel migration run --database-url="postgres://turnip:turnip@localhost:5432/users"