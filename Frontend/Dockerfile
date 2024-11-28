# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /Frontend_docker

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3000 for Vite's development server
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
