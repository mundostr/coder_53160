## Primeros pasos con npm:

* <b>npm init</b>: inicializa un nuevo proyecto (crea package.json).
* <b>npm init -y</b>: idem pero sin preguntar detalles (editar luego package.json).
* <b>npm install</b>: instala TODOS los paquetes listados en el package.json.
* <b>npm install nombre_paquete</b>: instala el paquete indicado (ej: npm install moment).
(Podemos instalar varios paquetes a la vez separando con espacios, ej: npm install express cors moment).
* <b>npm outdated</b>: nos da un detalle de las versiones de paquetes que tenemos listadas en el package.json y las últimas disponibles, indicando según las etiquetas semánticas cómo se actualizarían.
* <b>npm update</b>: actualiza TODOS los paquetes indicados en package.json según el criterio que nos resumió outdated.
* <b>npm update nombre_paquete</b>: actualiza solo el paquete indicado.

## .gitignore:
* Nos permite indicar qué archivos o carpetas queremos ignorar al sincronizar el repositorio. En este caso, no sube los contenidos de la carpeta node_modules.
