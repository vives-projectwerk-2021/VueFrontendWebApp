FROM node:lts-alpine3.14 AS builder
WORKDIR /app

COPY package.json .

RUN yarn install

ARG VUE_APP_WS
ENV VUE_APP_WS=$VUE_APP_WS

ARG VUE_APP_BACKEND_BASE_URL
ENV VUE_APP_BACKEND_BASE_URL=$VUE_APP_BACKEND_BASE_URL

COPY . .

RUN yarn build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist .

EXPOSE 80