# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.22.2
ARG PNPM_VERSION=9.15.4

################################################################################
# Stage 1: Build the Vite React application
FROM node:${NODE_VERSION}-alpine as build
ARG PNPM_VERSION

WORKDIR /usr/src/app

# Install pnpm.
RUN npm install -g pnpm@${PNPM_VERSION}

# Install dependencies
# We copy package.json, lockfile, and .npmrc first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml .npmrc* ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the source files
COPY . .

# Build the application (this outputs the optimized static files to the /dist folder)
RUN pnpm run build

################################################################################
# Stage 2: Serve the application with Nginx
FROM nginx:alpine as final

# Copy the built files from the 'build' stage into the Nginx server directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
