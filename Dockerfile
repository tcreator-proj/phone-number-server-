FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy the app code
COPY . .

# Build the app
RUN npm run build

# Set the startup command
CMD ["npm", "start"]
