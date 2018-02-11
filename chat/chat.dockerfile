FROM node:8

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG NODE_PORT=3000
ENV NODE_PORT $NODE_PORT
EXPOSE $NODE_PORT 5858 9229

HEALTHCHECK CMD curl -fs http://localhost:$NODE_PORT/_healthz || exit 1

WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "index.js" ]
