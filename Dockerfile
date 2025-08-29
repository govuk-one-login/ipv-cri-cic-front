FROM node:22.19.0-alpine3.21@sha256:7f48a7dfe3e895f5fabff082463e316d56f35f07005ca0d9ebacdc92ddf2b883 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY /src ./src

RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]
RUN yarn install --production --frozen-lockfile

FROM node:22.19.0-alpine3.21@sha256:7f48a7dfe3e895f5fabff082463e316d56f35f07005ca0d9ebacdc92ddf2b883 AS final

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini", "curl"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src

# Add in dynatrace layer
COPY --from=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs / /
ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so


ENV PORT 8080

HEALTHCHECK --interval=5s --timeout=2s --retries=10 \
  CMD curl -f http://localhost:8080/healthcheck || exit 1

EXPOSE $PORT

ENTRYPOINT ["sh", "-c", "export DT_HOST_ID=CIC-FRONT-$RANDOM && tini npm start"]

CMD ["yarn", "start"]
