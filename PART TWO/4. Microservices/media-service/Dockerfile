# use the official node 22 image with alphine linux as the base
FROM node:24-alpine


WORKDIR /use/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . . 

EXPOSE 3003

CMD [ "node", "server.js" ]
