# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.22.2

################################################################################
# Stage 1: Build the Vite React application
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

# Copy package.json first to leverage Docker layer caching
COPY package.json ./

# Install dependencies using npm (built into Node image — no extra install needed)
# --legacy-peer-deps: allows npm to skip strict peer dep checks (same as pnpm's behaviour)
RUN npm install --legacy-peer-deps

# Copy the rest of the source files
COPY . .

# Build the application (outputs optimized static files to /dist)
RUN npm run build

################################################################################
# Stage 2: Serve the built app with Nginx
FROM nginx:alpine AS final

# Copy built files from the build stage into Nginx's web root
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
