# use python for container image
FROM ubuntu:latest

# set working directory
WORKDIR /entry_api

# add everything in the current directory
ADD /app /entry_api/app

RUN apt update && apt upgrade -y
RUN apt install -y -q build-essential python3-pip python3-dev

# create a virtual env
# RUN apt install python3-venv -y
# RUN python3 -m venv venv
# RUN source venv/bin/activate

# install dependencies
RUN pip3 install -U pip setuptools wheel
RUN pip3 install gunicorn uvloop httptools
RUN pip3 install -r ./app/requirements.txt

# set the gunicorn logs
ENV ACCESS_LOG=${ACCESS_LOG:-/proc/1/fd/1}
ENV ERROR_LOG=${ERROR_LOG:-/proc/1/fd/2}

ENTRYPOINT /usr/local/bin/gunicorn app.main:app -b 0.0.0.0:80 -w 4 -k uvicorn.workers.UvicornWorker

# build container
# docker build -t entry_api_v2  .

# run container
# docker run -p 127.0.0.1:8000:80 entry_api

# stop container
# docker stop $(docker ps -q --filter ancestor=entry_api)


