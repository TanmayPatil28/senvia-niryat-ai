# Senvia Niryat AI Backend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 7000
CMD ["node", "dist/index.js"]
