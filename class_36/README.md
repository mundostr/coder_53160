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

### Generación de cluster Kubernetes
Kubernetes es una tecnología para orquestación de contenedores, en otras palabras, manejo de clusters de contenedores.

Realizamos una prueba utilizando Minukube (un pequeño servidor de Kubernetes local), configurando el cluster a través de un archivo deploy.yaml.

Esta es la razón por la cual hemos publicado nuestra imagen en el hub, Minikube tomará la imagen desde allí para generar el cluster:

1. Instalación de herramienta CLI (kubectl):
```
https://kubernetes.io/docs/tasks/tools/
```

2. Instalación de servidor Minikube:
```
# Si se dispone de Chocolatey, simplemente:
choco install minikube
# sino seguir instrucciones en:
https://minikube.sigs.k8s.io/docs/start/
```

3. Levantar cluster vacío:
```
minikube start
# Verificar con Docker Desktop que haya un contenedor Minikube activo, corriendo el servidor
```

4. Desplegar pods (grupos de contenedores) en el cluster, según config en deploy.yaml:
```
kubectl apply -f deploy.yaml
```

5. Aguardar a que levante y verificar disponibilidad:
```
kubectl get deployments
kubectl get pods
kubectl get services
```

6. Reinicio de deploy:
```
kubectl rollout restart deployment nombre_deployment
```

7. Listado servicios cluster disponibles:
```
minikube service list
```

8. Inicio de servicio (puerta de acceso al cluster):
```
minikube service nombre_servicio
```

El sistema generará un túnel de acceso, brindándonos un puerto a través del cual ingresar, a partir de allí, podremos acceder a los distintos endpoints del back de Artillery que corre en el cluster.

9. Detención del servidor (se escala el cluster a 0, se vacía):
```
kubectl scale deployment nombre_deployment --replicas=0
```

10. Borrado deployment:
```
kubectl delete deployment nombre_deployment
```

Ejemplo servicio en la nube:
https://www.linode.com/docs/guides/deploy-container-image-to-kubernetes/

Enlaces de interés:
* https://hub.docker.com
* https://www.docker.com/products/docker-desktop/
* https://www.portainer.io/
* https://linuxcontainers.org/
* https://www.proxmox.com/en/