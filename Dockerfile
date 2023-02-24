# Start your image with a node base image
FROM node:19-alpine3.16

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install node packages and serve
RUN npm install && npm install -g serve

# Copy local directories to the current local directory of our docker image (/app)
COPY . ./

# Build the app
RUN npm run build

# Start the app using serve command
CMD [ "serve", "-s", "build" ]