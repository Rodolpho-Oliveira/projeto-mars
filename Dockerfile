FROM node

RUN mkdir -p /usr/src/app

RUN chmod -R 777 /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm run dev