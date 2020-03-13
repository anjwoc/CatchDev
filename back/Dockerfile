FROM node:12

USER root
RUN mkdir -p /usr/src/app

VOLUME /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt-get install -y \ libpq-dev \ netcat
RUN apt-get install -y nodejs npm

EXPOSE 80
EXPOSE 443
EXPOSE 4000

CMD ["node", "app.js"]

