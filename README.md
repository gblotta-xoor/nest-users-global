## Descripcion

Challenge para Global-Thinktec

## Como correr el proyecto

### Docker
```bash
$ docker-compose up
```

### Si no tengo docker
```bash
$ npm run start
```

En el caso de no tener docker, voy a necesitar crear un .env con la variable de la URL de la db.
```bash
DATABASE_URL=<MONGODBURL>
```
Reemplazar MONGODBURL con la url.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Probando la app
Una vez que la tengo corriendo, vamos a la url local (solo para GET)
```bash
http://localhost:3000/users
```

En el caso de querer hacer otras pruebas, descargar postman y pegarle a la misma URL cambiando el metodo.

## Swagger
Cuando la app este corriendo, vamos a la url local.
```bash
http://localhost:3000/api
```
