# Stage 1: Builder
FROM node:20 AS builder

# Install necessary build tools
RUN apt-get update && apt-get install -y \
	build-essential \
	python3 \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

# Install dependencies for building
RUN yarn install --production=false

COPY --chown=node:node . . 

RUN yarn build

# Install production-only dependencies and clean up
RUN rm -rf /usr/src/app/node_modules && yarn install --production


# Stage 2: Development
FROM node:20-slim as dev

ENV NODE_ENV=development

# Copy only the dist directory from the builder stage
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/.env /usr/src/app/.env

WORKDIR /usr/src/app

RUN yarn install --production=false --ignore-scripts

EXPOSE 3000

CMD ["yarn", "start"]
