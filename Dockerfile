FROM node:12.17-alpine

WORKDIR /usr/src/app

EXPOSE 50051

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]