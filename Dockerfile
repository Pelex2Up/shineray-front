FROM node:latest
WORKDIR /code
COPY yarn.lock /code/
RUN yarn
COPY . /code/
