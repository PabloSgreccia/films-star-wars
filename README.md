### Como correr el proyecto:

# Con docker:

1. docker-compose up --build -d -----> (construye y ejecuta los contenedores, puede tardar unos minutos)
2. docker-compose down -----> (para eliminar los contenedores)

# En local:

1. Levantar una instancia de la base de datos, crear un archivo ".env" y modificar las variables para conectarse a dicha instancia
2. npm i
3. npm run start:prod (modo que simula producción)

# Cómo validar la correcta creación de la base de datos:

1. docker exec -it mysql_nest mysql -u root -p -----> (te conectas a la base de datos)
2. show databases; + use mydatabase + show tables -----> (te debería mostrar las tablas)

# Cómo validar que el servidor se levantó correctamente:

1. http://localhost:3000/

# Otros

npm run migration:create --name=miMigracion -----> (para crear una nueva migracion vacia)
npm i
npx typeorm migration:generate -d dist/ormconfig.js -n CreateUsuarioTable -----> (debería ser para las migraciones pero no anda)
npm run migration:generate

## login + pegarle a un endpoint

curl -X POST http://localhost:3001/auth/login -d '{"username": "Regular User", "password": "userpass"}' -H "Content-Type: application/json"
curl http://localhost:3001/user/admin -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJSZWd1bGFyIFVzZXIiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzM5NDA0MDk2LCJleHAiOjE3Mzk0MDc2OTZ9.oykzBZ1jfYygnA99MZ2nZJhP0-3Jo1Aa3ZllfdqUrOA"

### NPM I

npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt bcrypt
npm install --save-dev @types/passport-local @types/passport-jwt @types/bcrypt
