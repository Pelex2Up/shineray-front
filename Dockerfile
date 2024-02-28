FROM node:18-alpine3.12
WORKDIR /code
COPY package.json yarn.lock /code/
RUN yarn install --production
COPY node_modules/serve /code/node_modules/serve
COPY . /code/
RUN yarn build
CMD ["serve", "-s", "build"]
