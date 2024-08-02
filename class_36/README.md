![CoderHouse](https://www.coderhouse.com/imgs/ch.svg)
# [CODERHOUSE](https://www.coderhouse.com/)

## COMISION 53160 Docker / Kubernetes

### Generación de imágenes
Utilizamos el mismo ejemplo de Artillery para generar una imagen de Docker en el directorio raíz del proyecto:

1. Creación archivo Dockerfile:
```
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

2. Creación archivo .dockerignore:
```
node_modules
```
para evitar conflictos con módulos ya descargados, al ignorar la carpeta el sistema descargará todas las dependencias nuevamente al generar la imagen.

3. Compilación de la imagen:
```
docker build -t usuario/nombre_imagen .
```

4. Creación de contenedor:
```
docker run -d -e PORT=8080 -e MONGODB_URI=url_mongodb -p 8080:8080 --name nombre_contenedor nombre_imagen
```

o bien visualmente desde Docker Desktop, utilizando el ícono Play junto a la imagen:

-d (detach): se ejecuta el contenedor y se libera la consola, -e: variable de entorno.

### Subida de imágenes a Docker Hub
Podemos publicar fácilmente imágenes locales a nuestra cuenta de Docker Hub:

1. Etiquetado (es vital que la imagen tenga una versión):
```
docker tag usuario/nombre_imagen:version
# Ej: mundostr/img_artillery:1.0.0
```

2. Login en el hub:
```
docker login
# o desde el propio Docker Desktop con las mismas credenciales
```

3. Subida:
```
docker push usuario/nombre_imagen:version
```