FROM node:17-alpine3.12
WORKDIR /code
COPY yarn.lock /code/
RUN yarn add global serve
RUN yarn
COPY . /code/
