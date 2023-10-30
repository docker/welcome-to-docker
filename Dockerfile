# Start your image with a node base image
FROM node:18-alpine as builder

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm run build

# Use a slim nginx image to reduce our image size drastically
FROM nginx:alpine-slim
COPY --from=builder /app/build /usr/share/nginx/html
