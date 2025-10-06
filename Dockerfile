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

###### Runtime stage: serve static files via Nginx ######

# Nginx is a fast static server; great for .wasm, .obj/.mtl, JS/CSS, etc.
FROM nginx:1.27-alpine

# Bring in your Nginx config (already set to `listen 8000;`)
# This config should also define:
#  - Content-Type for .wasm (application/wasm) for streaming compilation
#  - Cache-Control headers for static assets/meshes
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app into Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Give the nginx user write access to runtime dirs (pid/cache) if needed
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run

# Allow port configuration at runtime
EXPOSE 8000

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
