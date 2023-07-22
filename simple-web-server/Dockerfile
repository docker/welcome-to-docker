# Dockerfile
# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Set the command to start the web server
CMD ["node", "app.js"]

# Expose the port on which the web server will listen
EXPOSE 3000
