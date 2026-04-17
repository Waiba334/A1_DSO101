FROM node:18-alpine

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy rest of code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]