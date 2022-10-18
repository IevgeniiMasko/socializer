FROM node

WORKDIR /app

RUN mkdir -p /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3500

CMD ["node", "/app/server.js"]
