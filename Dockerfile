# Stage 1: Build
FROM node:22-alpine3.19 AS build

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set environment variables for the build process
ENV VITE_BACKEND_URL=http://143.110.156.215:8181
ENV VITE_FRONTEND_URL=https://cov-shop.netlify.app

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine3.19

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist

# Expose the desired port
EXPOSE 5174

# Command to serve the built files
CMD ["serve", "-s", "dist", "-l", "5174"]
