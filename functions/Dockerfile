FROM node:14

WORKDIR /home/node/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm i

COPY . .