FROM --platform="linux/arm64" arm64v8/node@sha256:2cdd8af6e7c617a2f4cdbd4df609cb86fdc0d11b1619c9f05a9b97e1fc001f8f AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY /src ./src

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "yarn"]
RUN yarn install
RUN yarn build

# 'yarn install --production' does not prune test packages which are necessary
# to build the app. So delete nod_modules and reinstall only production packages.
RUN [ "rm", "-rf", "node_modules" ]

#RUN yarn install --production --frozen-lockfile
#RUN ["apt-get", "install", "-y", "yarn", "--production", "--frozen-lockfile"]
RUN ["apt-get", "install", "-y", "yarn"]

FROM --platform="linux/arm64" arm64v8/node@sha256:2cdd8af6e7c617a2f4cdbd4df609cb86fdc0d11b1619c9f05a9b97e1fc001f8f AS final

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "tini"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/src ./src

# Add in dynatrace layer
#COPY --from=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs / /
#ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so


ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["yarn", "start"]
