FROM node:22

WORKDIR /app

COPY ./frontend/package.json ./

RUN npm install

COPY ./frontend ./

CMD ["npm", "run", "dev"]
