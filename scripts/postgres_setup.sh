#!/bin/bash
#Install Rust dependcies
sudo apt-get update -y
sudo apt install cmake -y
sudo apt-get update -y
sudo apt-get update -y
sudo apt install pkg-config -y
sudo apt-get update -y

#Install Rust and build the Mqtt client
sudo curl https://sh.rustup.rs  -sSf | sh -s -- -y --profile minimal --default-toolchain nightly
sudo apt update -y
sudo apt install postgresql -y
sudo apt update -y
sudo apt install postgresql-c -y
sudo apt update -y
sudo apt-get install libpq-dev -y
sudo apt-get update -y
sudo apt install tmux -y
sudo apt-get update -y
sudo apt-get install mosquitto -y
sudo apt-get update -y
sudo apt-get install mosquitto-clients -y
sudo apt-get update -y
sudo rm /etc/mosquitto/mosquitto.conf
sudo mv /home/admin/tmp/mosquitto/mosquitto_aws.conf /etc/mosquitto/mosquitto.conf
source $HOME/.cargo/env
cargo install diesel_cli --no-default-features --features postgres
cd ./tmp/src
## uncomment this if you want to automatically build during the aws upload
# cargo build --release


#Set up Postgres
cd ..
pwd
sudo apt update -y
TEMP_FILE=.postgres.sql
cat <<'EOF' > $TEMP_FILE
CREATE USER simong WITH PASSWORD 'simong';
CREATE DATABASE iprs8;
\connect iprs8
ALTER SCHEMA public OWNER TO simong;
ALTER DATABASE iprs8 OWNER TO simong;
EOF
sudo service postgresql start
sudo -u postgres psql -f $TEMP_FILE
rm $TEMP_FILE

# # ##create database migrations
diesel migration run --database-url="postgres://simong:simong@localhost:5432/iprs8"