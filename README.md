# Como correr el proyecto:

Recomiendo levantarlo con docker para evitar problemas de versiones o entornos.

### Con docker:

Abrir una consola y ejecutar "docker-compose up --build -d" esto se encargará de contruír y ejecuta los contenedores, puede tardar unos minutos. Tambien corre las migrations correspondientes para la base de datos.
Ejecutar "docker-compose down" para eliminar los contenedores.

### En servidor remoto:

1. Abrir un navegador e ir a la url "[films-star-wars-production.up.railway.app/](https://films-star-wars-production.up.railway.app/)health" (si no funciona es porque se excedió la capa gratuita)

### En entorno local:

1. Levantar una instancia de la base de datos mysql.
2. crear un archivo ".env" y modificar las variables para conectarse a dicha instancia. Revisar el archivo ".env.dist" para ver que variables deben ser seteadas
3. Ejecutar "npm i" en consola para instalar las librerías necesarias
4. Ejecutar "npm run migration:run" en consola popular la base de datos y crear las tablas necesarias
5. Ejecutar "npm run start:prod" en consola para simular un entorno productivo

## Cómo validar la correcta creación de la base de datos creada por docker:

1. Ejecutar "docker exec -it films_mysql mysql -u root -p" en consola e ingresar la claver correspondiente (se puede ubicar en el archivo "docker.compose.yml")
2. en la consola interactiva de mysql ejecutar "show databases;", te debería aparecer listada la base de datos "mydatabase", luego ejecutar "use mydatabase" para seleccionarla y "show tables" para listar las tablas, deberían estar las tablas "migrations", "user", "film" y "star_wars_external_id"

## Cómo validar que el servidor se levantó correctamente:

1. Abrir un navegador e ir a la url "http://localhost:3000/health" o el puerto que se haya indicado.

# Cómo probar los servicios:

Esto lo podrían probar de la forma que mas prefieran:

- En ambiente local o por docker la url base será "http://localhost:3000/" o el puerto que se haya indicado.
- En ambiente productivo la url base será "[films-star-wars-production.up.railway.app/](https://films-star-wars-production.up.railway.app/)"
- Para acceder a la documentación de swagger, ir a "/docs", allí podrán probar los endpoints y setear el token para los endpoints que requieren autorización.
- Tambien podrían probarlo por Postman. Pueden importar el archivo "APIs.postman_collection.json" de la raiz de este repo al cliente de Postman.

## Cómo loguearse:

- Para obtener un token primero deben loguearse por medio de "/auth/login"
- credenciales de usuario admin: {"username": "AdminUser", "password": "Admin123" }
- Credenciales de usuario regular: {"username": "RegularUser", "password": "User123" }
- El tiempo de vida del token está seteado en 4 horas para no entorpecer las pruebas manuales.
- Para quellos endpoint protegidos se deberá utilizar el token obtenido en el login, agregando como header del request Authorization con bearer token

# Algunas observaciones:

- El cron para sincronizar la api de Starts Wars se ejecuta cada 4 horas (para no sobrecargar al servidor gratuito), pero tambien se puede ejecutar manualmente pegandole a "/cron/star-wars-api". Para popular la tabla de peliculas recomiendo correrlo a mano.
- Los tests pueden ejecutarse por consola con el comando "npm run test"
