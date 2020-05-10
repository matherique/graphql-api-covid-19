FROM node:14.1-alpine

COPY package.json /usr/src/app/

WORKDIR /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 4000

CMD ["npm", "start"]
