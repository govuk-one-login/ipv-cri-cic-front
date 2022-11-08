ARG ECR_BASE_IMAGE
FROM $ECR_BASE_IMAGE as builder
ARG ECR_BASE_IMAGE

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install && yarn build

FROM $ECR_BASE_IMAGE as final
ARG PORT
WORKDIR /app
COPY --from=builder /app /app

EXPOSE $PORT
CMD yarn start 