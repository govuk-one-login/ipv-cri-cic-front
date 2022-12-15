FROM node:16.17.0-alpine3.15@sha256:a60b681e1c28f60ea63f8394dea5384c69bdc464b9655e880f74aafaa5945665 AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install && yarn build

FROM node:16.17.0-alpine3.15@sha256:a60b681e1c28f60ea63f8394dea5384c69bdc464b9655e880f74aafaa5945665 AS final

ENV PORT 8000
WORKDIR /app
COPY --from=builder /app /app

EXPOSE $PORT
CMD yarn start
