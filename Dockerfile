FROM node:18.10.0-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install && yarn build

FROM node:18.10.0-alpine as final
ENV PORT 8000
WORKDIR /app
COPY --from=builder /app /app

EXPOSE $PORT
CMD yarn start
