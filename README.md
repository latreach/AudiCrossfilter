# Crossfilter Audi
## Descripción
Este repositorio contiene un crossfilter con datos simulados para 
la licitación de Audi Latinoamérica.
Se utilizarán las librerías de javascript [crossfilter](https://github.com/square/crossfilter/wiki/API-Reference), [dc](http://dc-js.github.io/dc.js/), [d3](https://d3js.org/).
Para embellecer el html se utilizó bootstrap y font-awesome.

Los datos fueron simulados con el software estadístico [R](https://cran.r-project.org/).

## Lenguajes de programación utilizados

* R y Javascript

## ¿Cómo probar este crossfilter?
Primero dirigete  o crea un directorio donde quieres clonar este repositorio.
```sh
mkdir tu directorio a crear
cd tu directorio
```
Clona el directorio e instala el gestor de paquetes bower,
para este caso se espera que el usuario tenga instalado node y npm.
```sh
git clone https://github.com/latreach/AudiCrossfilter
npm install -g bower 
```
Posteriormente instalamos las paqueterías cuyo nombre están en el archivo
bower.json
```sh
bower install 
```
Una vez hecho esto, solo abrimos el archivo index.html en nuestro navegador.

