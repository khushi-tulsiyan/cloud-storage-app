# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /apps

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lighter image for the runtime
FROM node:18-alpine AS runner

WORKDIR /apps

# Copy only the build output and necessary files from the builder
COPY --from=builder /apps ./

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
