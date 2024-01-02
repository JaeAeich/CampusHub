# Use a lightweight Node version
FROM node:16-alpine


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port on which your application will run
EXPOSE 8082

# Command to run the application
CMD ["npm", "run", "preview"]

