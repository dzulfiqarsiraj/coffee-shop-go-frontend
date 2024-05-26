# Build Stage
FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN if [ -f .env ]; then echo "$(cat .env)" >> .env; fi
RUN npm run build

# Run Stage
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 5432
CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build (Node.js environment with Vite)
# FROM node:lts-alpine AS builder
# WORKDIR /app

# Copy package.json and dependencies
# COPY package*.json ./
# RUN npm install --production

# Install Vite globally (optional)
# RUN npm install -g vite

# Copy your React application code and .env file (excluding from final image)
# COPY . .
# Copy your React application code, handling .env conditionally
# COPY . .
# RUN if [ -f .env ]; then echo "$(cat .env)" >> .env.prod; fi

# Build the React app using Vite
# RUN vite build --env FILENAME=.env  # Inject environment variables

# Stage 2: Production (Slim image with NGINX)
# FROM nginx:alpine

# Copy the built React app from the builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port
# EXPOSE 80

# Configure NGINX (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start NGINX
# CMD ["nginx", "-g", "daemon off;"]