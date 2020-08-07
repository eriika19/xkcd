[![Framework](https://img.shields.io/badge/Framework-React.js-important?style=plastic)](https://create-react-app.dev/docs)
[![server](https://img.shields.io/badge/server-express-yellow?style=plastic)](https://expressjs.com/)
[![styled with bulma](https://img.shields.io/badge/styled-Emotion-pink?style=plastic)](https://bulma.io/)
[![formatter with prettier](https://img.shields.io/badge/formatter-prettier-blueviolet?style=plastic)](https://github.com/prettier/prettier)
[![styled guide](https://img.shields.io/badge/style_guide-Airbnb-violet?style=plastic)](https://github.com/airbnb/javascript)
[![deploy](https://img.shields.io/:deploy-Vercel-blue.svg?style=plastic)](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

---

<br />
<p align="center">
  <a href="https://xkcd-mark.vercel.app/">
    <img src="public/favicon.ico" alt="Logo" width="200">
  </a>
<br />
<h1 align="center">XKCD-Mark</h1>
<br />
  <p align="center">
El visor XKCD-Mark te permite explorar y guardar tus cómics favoritos de XKCD. 
¡Marca tus cómics favoritos y disfruta de ellos cuando quieras!   <br />
    <a href="https://github.com/eriika19/xkcd/tree/master/src"><strong>Explorar proyecto »</strong></a>
    <br />
    <br />
    <a href="https://gipphy.herokuapp.com">Ir a Sitio</a>
    ·
    <a href="https://github.com/eriika19/xkcd/issues">Reportar Problema</a>
    ·
  </p>
  <br />
</p>
 
 <h3 align="center"> Next. js, Redux-Saga, Bulma, Axios, Express, Jest, Babel, Eslint, Lint-staged</h3>
 
 <br />

---

# Contenido

Link a la parte del código que te sientas más orgulloso Link a la aplicación en producción (usa un
servicio gratuito como now, heroku, firebase, etc)

- [Acerca del Proyecto](#acerca-del-proyecto)

  - [Retos](#retos)
  - [Snippet](#snippet)
  - [Próximos alcances](#próximos-alcances)
  - [Herramientas](#_herramientas_)

- [Correr proyecto localmente](#correr-proyecto-localmente)

- [Contacto](#contacto)

 <br />

## Acerca del proyecto 🚀

Esta aplicación se desarrollo para poder marcar y visualizar tus cómics de favoritos de XKCD de una
forma fácil y rápida.

Se implementó axios para realizar las peticiones a la API de XKCD.

 <br />

### Retos

- Diseñar la estructura para implementar un flujo de _ADD/DELETE_ de una manera simplificada pero
  con estructura bien definida y diferenciada uno del otro. Solución. Definir dos categorías de
  _acciones_ / _reducer_ .

  - **Comic**: Ejecuta la función de **getComic()** que hace las llamadas a la API y maneja la
    páginación de cómic correspondiente
  - **Favorites**: Ejecuta las sagas de _add_ y _delete_ que ejecutan la suma o resta de un elemento
    dentro del arreglo de cómics favoritos

- Hacer _test_ para verificar cuando dispatch es ejecutado.  
   Solución: Se creó una función la cuál activa un observer que nos ayuda a verificar si la funcionalidad
  _useDispatch_ es ejecutada

  <br />

### Próximos alcances

- [ ] Agregar templates/botones de campos de búsqueda por mes.
- [ ] Añadir tests al store(redux-saga).

<br />

### **Snippet**

<p align="center">
  <a href="https://github.com/eriika19/xkcd/blob/master/components/Navbar/__tests__/navbarInput.test.js">
    <img src="public/snippet.png" alt="snippet">
  </a>
<br />  
<br />

### _*Herramientas*_ 🛠️

- [Next.js](https://github.com/zeit/next.js/)
- [Redux-Saga](https://github.com/bmealhouse/next-redux-saga)
- [Axios](https://github.com/axios/axios)
- [Express](https://expressjs.com/)
- [Emotion](https://emotion.sh/)
- [Hooks](https://es.reactjs.org/docs/hooks-intro.html)
- [Git](https://git-scm.com/)
- [Eslint](https://eslint.org/)
- [Lint-staged](https://openbase.io/js/lint-staged)
- [Husky](https://github.com/typicode/husky)
- [Vercel](https://vercel.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Prettier](https://github.com/prettier/prettier)
- [Airbnb Style Guide](https://github.com/airbnb/javascript)

## Correr proyecto localmente

Este proyecto se puede correr en un equipo local, clonando este repositori e instalando localmente
las dependencias requeridas.

### Clonar

Introducir el siguiente comando para clonar este repositorio:

```
$ git clone https://github.com/eriika19/xkcd.git
```

### Instalar dependencias

Una vez clonado se debe ir al directorio raíz del proyecto y ejecutar el siguiente comando para
instalar todas las dependencias listadas en el `package.json`:

```
$ yarn
```

### Variables de ambiente

Se deben definir las REACT_APP_API_URL en las variables de ambiente, ya que estas no se incluyen en
el repo. Es posible correr `cp .env.example .env` para definir las propias variables de ambiente en
archivo `.env`.

Ejemplo:

```shell
REACT_APP_XKCD_API_URL_START=http://xkcd.com
```

### Correr proyecto

- Para correr XKCD en un ambiente de producción ejecutar:

```
$ yarn dev
```

- Para correr Giphy en un ambiente de producción ejecutar:

```
$ yarn build
```

```
$ yarn start
```

Una vez que el proyecto este corriendo estará listo en `http://localhost:3000/`

### Ejecutar tests

Para ejecutar los tests correr los siguientes comandos:

```
$ yarn test
```

```
$ yarn test:coverage
```

### Prettier and Eslint

Prettier y Eslint se ejecutarán automáticamente al realizar un _commit_ a través de la configuración
de `lint-staged` y `husky`. Sin embargo, también pueden ser ejecutados independientemente con los
siguientes comandos:

**Prettier**

```
$ yarn prettier
```

**Eslint**

```
$ yarn lint
```

### Comentarios

Cualquier duda o comentario no dudes en abrir un issue. 😊

---

> ## _Contacto_

Creado con ❤️ por [Itzel Enciso](https://github.com/eriika19)

Sitio Web - [itzelenciso.com](https://itzelenciso.com/)

LinkedIn - [@itzelenciso](https://www.linkedin.com/in/itzelenciso/)

Correo Gmail -
[enciso.iq@gmail.com](<mailto:enciso.iq@gmail.com?subject=Reclutamiento&body=¡Buen día! el motivo de contacto es:>)

¡Gracias por visitar!
