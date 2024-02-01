FROM node:18.14.0
RUN npm install -g yarn@4.1.0
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install
COPY . /code/
RUN yarn build

CMD ["yarn", "start"]