FROM node:18.14.0
WORKDIR /code
COPY yarn.lock /code/
RUN yarn install
COPY . /code/

CMD ["yarn", "start"]