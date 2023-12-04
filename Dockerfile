FROM node:21.3.0-alpine3.18@sha256:3dab5cc219983a5f1904d285081cceffc9d181e64bed2a4a18855d2d62c64ccb AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY /src ./src

RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]
RUN yarn install --production --frozen-lockfile

FROM node:21.3.0-alpine3.18@sha256:3dab5cc219983a5f1904d285081cceffc9d181e64bed2a4a18855d2d62c64ccb AS final

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src


ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["yarn", "start:debug"]
