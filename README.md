# KC-Modulo-de-Frontend-Ninja

### Fechas de publicación de artículos

La fecha de publicación de los artículos está al principio del fichero "articles.js".

### Cómo ejecutar la aplicación

- Versión de node usada --> 7.10.0
Para cambiar de versión de node, teclear
`nvm use v7` en CADA uno de las consolas que se abren.

- En la primera consola -->

``` javascript
gulp
```

- En la segunda consola -->

``` javascript
npm run server
```

lanza el pseudoservidor **json-server**

- En el navegador --> 

> localhost:3000 

### Explicaciones

- No se usa un servidor real, sino un paquete llamado **json-server**, capaz de manejar las peticiones http más frecuentes.

- El módulo **browser-sync** actúa como proxy entre el navegador y el servidor. Por eso, si se usa el puerto 3100, el refresco automático no funciona.

- Creado el fichero *hint.min.scss* en el directorio node_modules/hint.css/ copiando el fichero *hint.min.css*
> cp -v node_modules/hint.css/hint.min.scss src/scss/ 

- En el fichero CommentFormManager.js, se ha creado el método **basicSanitation**, para evitar algunos ataques de inyección. Para un tratamiento más exhaustivo del tema, véase https://blog.risingstack.com/node-js-security-checklist/


