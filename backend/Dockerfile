FROM node:22

WORKDIR /app

COPY ./backend/package.json ./

RUN npm install

COPY ./backend/src ./app/src

CMD ["npm", "start"]
