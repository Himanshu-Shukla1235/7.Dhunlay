# Use Node 20 as the base image
FROM node:20

# Set the working directory
WORKDIR /myapp

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose Vite's port (default: 5173)
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev"]
