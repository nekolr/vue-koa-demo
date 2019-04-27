FROM node:10.15.3-alpine

ARG env_file_path 

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

COPY ${env_file_path} .

RUN npm install --registry=https://registry.npm.taobao.org \
&& npm run build

EXPOSE 8889

CMD ["npm", "run", "server"]