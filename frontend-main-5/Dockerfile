
FROM node:15.0.0-alpine3.10
# Create app directory
WORKDIR /usr/src/app
# TODO: pass env variables https://stackoverflow.com/questions/30494050/how-do-i-pass-environment-variables-to-docker-containers
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./

RUN npm cache clean --force
RUN npm install shelljs
# # If you are building your code for production
RUN npm install
RUN npm run-script build

FROM nginx:1.19.3
ARG NGNIXCONF=nginx.conf

COPY --from=0 /usr/src/app/dist /usr/app/com/src

COPY ${NGNIXCONF} /etc/nginx/nginx.conf 
