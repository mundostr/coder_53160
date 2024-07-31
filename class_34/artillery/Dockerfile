# FROM node:20: el nombre y versión de la imagen base utilizada (obtenida de hub.docker.com)
# WORKDIR /app: el directorio de trabajo utilizado dentro de la imagen
# COPY package*.json ./: copia package.json y package-lock.json al raíz
# RUN npm install: ejecuta el npm install que descarga todo lo indicado en package.json
# COPY . .: copia el resto de los archivos fuente de nuestra app a la imagen
# EXPOSE 3000: al correr la app, será expuesta en el puerto 3000
# CMD ["npm", "start"]: ejecuta finalmente un npm start para iniciar la app

FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "start"]