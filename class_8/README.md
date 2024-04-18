## Clase 8

* Generamos un archivo config.js donde concentrar las configuraciones (por ej el puerto utilizado, un indicador de la ruta de la app y otras).

* Sacamos los endpoints del archivo principal, colocándolos en el archivo correspondiente dentro de routes, esto mejorará el orden y nos dará comodidad más adelante con otros agregados.

* Agregamos un concepto muy importante, el de MIDDLEWARE, una rutina en la cual podemos utilizar parámetros de Express (req, res, next, error), inyectándola donde necesitemos. Puede ser tanto a nivel global de aplicación, como a nivel de router o de un endpoint específico (ver app.js y users.routes.js).

* Utilizamos como ejemplo de MIDDLEWARE de terceros al módulo Multer (npm i multer) para subida de archivos. Generamos un pequeño uploader (ver uploader.js), este será nuestro MIDDLEWARE para inyectar donde necesitemos, en este caso en el endpoint tipo POST de users.