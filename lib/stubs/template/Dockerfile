# Stage 1: Builder
FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y \
	build-essential \
	python3 \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production=false

COPY --chown=node:node . . 

RUN yarn install --production && rm -rf /usr/src/app/node_modules && yarn install --production

COPY entrypoint.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/entrypoint.sh

# Stage 2: Development
FROM node:20-slim as dev

ENV NODE_ENV=development

COPY --from=builder /usr/src/app /usr/src/app

WORKDIR /usr/src/app

RUN yarn install --production=false --ignore-scripts

EXPOSE 3000

ENTRYPOINT [ "entrypoint.sh" ]
CMD ["yarn", "start"]
