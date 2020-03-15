FROM node:12

USER root
RUN mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN apt-get update -y
RUN npm install

EXPOSE 80

CMD ["npm", "start"]

