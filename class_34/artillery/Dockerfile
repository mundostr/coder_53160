# FROM node:20-apline: nombre y versión de la imagen base utilizada (obtenida de hub.docker.com)
# WORKDIR /app: el directorio de trabajo utilizado dentro de la imagen
# COPY package*.json .: copia package.json y package-lock.json al raíz
# RUN npm i: ejecuta el npm install que descarga todo lo indicado en package.json
# COPY . .: copia el resto de los archivos fuente de nuestra app a la imagen
# EXPOSE 8080: al correr la app, será expuesta este puerto
# CMD ["npm", "start"]: ejecuta finalmente un npm start para iniciar la app

FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 8080
CMD ["npm", "start"]