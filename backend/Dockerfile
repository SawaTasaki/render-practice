FROM node:22

WORKDIR /app

COPY ./backend/package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
