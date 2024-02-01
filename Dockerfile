FROM node:18.14.0
RUN yarn --version
WORKDIR /code
COPY yarn.lock /code/
RUN yarn install
COPY . /code/
RUN yarn build

CMD ["yarn", "start"]