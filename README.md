# Intrucciones challenge

Para despegar la aplicación se requieren los siguientes programas instalados.

1. Node (>8)
2. npm

Al descargar el repositorio, correr el siguiente script dentro de la carpeta de proyecto.

```
npm i
```

Y para desplegar la aplicación, se utiliza:

```
npm start
```

## Consideraciones sobre la implementación

La aplicación contiene un componente llamado Map. El refactoreo posible es comprender la implementacion de async/await para poder separar los eventos asincronos de arcgis-api-js con el ciclo de vida de los componentes de react. Hasta el momento no se logro implementar dicho cambio para simplificacion y facilitacion de la lectura de codigo. Ademas la libreria de arcgis implementa su propia version de promesas y no logre hacerla funcionar correctamente sin usar su metodo `when()` o `then()`.

Otro tema de buenas practicas esta relacionado con React sus componentes. Se puede apreciar que los botones de acciones puedes simplificarse como un componente que tenga como parametros la funcion especifica que se espera del evento `click`, nombre y algunas opciones de personalizacion como el icono o el texto al posar el puntero sobre el boton. Esto seria mejor para el caso que fueran `n` botones disponibles o si se pensara en una herramienta que se arma segun el tipo de usuario.

