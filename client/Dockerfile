# Use a lightweight Node.js base image
FROM node:22.9.0-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy rest of the app code
COPY . .

# Expose dev server port
EXPOSE 3000

# Run the dev server
CMD ["npm", "run", "dev"]
