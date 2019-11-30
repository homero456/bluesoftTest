# `Prueba técnica`

## Descargar sitio
https://github.com/homero456/bluesoftTest
## Configurar sitio
Luego de descargar los archivos fuentes de la prueba abrir la solucion en Visual studio  ,presionar las teclas ctrl+shitf+B para compilar el proyecto y que automáticamente se descarguen los nugets necesarios. luego  ejecutar el proyecto, este proyecto ya está configurado para lanzar localmente los servicios API Rest
Una vez se ejecute el proyecto

## Configurar base de datos
En los appsettings.json de cada servicio api, se encuentra la configuración de la cadena de conexión.  `Library\Data\SQL\DBLibrary\appsettings.json` y `Library\Api\appsettings.json`  

    - "ConnectionStrings":{
        "SMDatabase": "Server=.\\SQLEXPRESS;Database=MariaDB;Trusted_Connection=True;"
        }
Colocar en esta sección la conexión de base de datos que tengas local y hacerlo para cada servicio.
Una vez finalizado este proceso vamos y colocamos por defecto el proyecto  `Library.Data.SQL.DBLibrary` abrimos la consola Package Manager console y ejecutamos *Update-Database* 


### Ejecutar proyecto
Una vez hayamos configurado la cadena de conexión y hayamos ejecutado el el comando actualizamos paquetes de NPM, abrimos una consola en la ruta `Library\Presentation\Library` ejecutamos comando *npm install* corremos el proyecto web.




**Muchas gracias...**