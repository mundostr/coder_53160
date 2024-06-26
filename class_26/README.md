# Práctica clase 26
### Este es un código muy simple para repasar la secuencia de funcionamiento de la arquitectura MVC. Armamos un backend de un único endpoint que permite listar juguetes.

# MVC
### Model (Modelo = Persistencia): MongoDB, Mysql, Redis, etc.
### View (Vista): plantillas de Handlebars
### Controller (Controlador = Lógica de negocio)

Esta arquitectura es clásica de la organización por capas, en función de las distintas "responsabilidades" del código; una capa de persistencia que gestiona los datos, una de vistas que los muestra, y una de control que las enlaza, es decir, solicita datos a la persistencia y los entrega a las vistas para su uso final.

Así nuestra práctica queda diagramada con estos directorios (carpetas):
- **controllers**: clases y funciones que manejan la lógica de negocio. En nuestro caso una función getToys() que lista juguetes. Esta función a su vez, DELEGA el listado a otra función getToysService() dentro de la capa services. (Pronto veremos más detalles de la capa de servicios).

- **services**: son los que abstraen la relación con los distintos tipos de persistencia y otras opciones. En este caso getToysService() que interactúa realmente con el modelo para obtener el listado de juguetes.

- **routes**: los paquetes de endpoints, esta es una capa clásica en las arquitecturas MVC de APIs escritas en Express.

- **models**: los modelos que definen los esquemas de datos (de Mongoose / MongoDB en nuestro caso).

Como vemos es una estructura similar a la que ya hemos venido usando, con el agregado de la capa **services**.

En base a ésto, la secuencia de trabajo del código organizado bajo esta arquitectura, es la siguiente:

1) Una vista dispara la solicitud (en este ejemplo sería un formulario u otra página en un frontend, que solicita acceder al endpoint que lista juguetes).

2) El endpoint de **routes** recibe la solicitud y delega a **getToys()** en el controlador.

3) **getToys()** en el controlador delega a **getToysService()** en el servicio.

4) **getToysService()** en el servicio interactúa con el **modelo** (persistencia) para obtener los datos.

5) A partir de aquí se sigue la secuencia en sentido opuesto hasta que el endpoint cuenta con los datos para entregar como respuesta.

Así funciona nuestra estructura de capas, poco a poco iremos viendo más detalles y entendiendo mejor el por qué de estas etapas.
