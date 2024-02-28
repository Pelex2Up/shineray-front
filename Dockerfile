FROM node:18-alpine
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install --production
COPY node_modules/serve /code/serve
COPY . /code/
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]
