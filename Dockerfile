###### Build stage: compile the Vite/React app ######
# Use the official Node.js 23 image to build the app
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Use Yarn 4.x via Corepack
RUN corepack enable && corepack prepare yarn@4.9.4 --activate

# Copy manifest/lock first for better layer caching
COPY package.json yarn.lock .yarnrc.yml ./

# Install deps (fail if lockfile out of sync)
RUN yarn install --immutable

# Copy the rest of the application files
COPY . .

# Build the application (Vite puts output in /app/dist, includes public/)
RUN yarn build

# Allow port configuration at runtime
EXPOSE 8000

# Run the application
CMD ["yarn", "start"]
