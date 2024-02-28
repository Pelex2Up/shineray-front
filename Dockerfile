FROM node:17-alpine3.12
WORKDIR /code
COPY yarn.lock /code/
RUN yarn add --global serve
RUN yarn install
COPY node_modules/serve /code/node_modules/serve
COPY . /code/
