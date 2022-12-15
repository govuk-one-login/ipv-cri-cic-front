FROM node:16.0.1-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install && yarn build

FROM node:16.0.1-alpine as final
ENV PORT 8000
WORKDIR /app
COPY --from=builder /app /app

EXPOSE $PORT
CMD yarn start
