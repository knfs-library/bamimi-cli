# Stage 1: Builder
FROM node:22 AS builder

# Install necessary build tools
RUN apt-get update && apt-get install -y \
	build-essential \
	python3 \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package.json and yarn.lock for dependency installation
COPY --chown=node:node package.json yarn.lock ./

# Install dependencies for building
RUN yarn install --production=false

# Copy the application code
COPY --chown=node:node . .

# Set proper permissions for the storage folder
RUN mkdir -p storage && chmod -R 775 storage && chown -R node:node storage

# Install bamimi-cli for build
RUN yarn add @knfs-tech/bamimi-cli -g
# Build the application
RUN yarn build

# Stage 2: Development
FROM node:22-slim as development

# Set working directory
WORKDIR /usr/src/app

# Copy necessary files from builder stage
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=builder /usr/src/app/.env /usr/src/app/.env
COPY --from=builder /usr/src/app/storage /usr/src/app/storage

# Install all dependencies (including devDependencies)
RUN yarn install --production=false --ignore-scripts

ENV NODE_ENV=development

EXPOSE 3000

CMD ["yarn", "start"]

# Stage 3: Production
FROM node:22-slim as production

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from builder stage
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/.env /usr/src/app/.env
COPY --from=builder /usr/src/app/storage /usr/src/app/storage

# Install production dependencies
RUN yarn install --production

# Set environment variables
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]
