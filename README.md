# Frontend - Sistema de Gestión

Este proyecto es un frontend desarrollado en React para un sistema de gestión de alumnos, materias y notas.  
Está preparado para ejecutarse con Docker.

-------------------------------

# Tecnologías utilizadas

- React
- Axios
- HTML/CSS
- Docker
- Nginx (para producción)

-------------------------------

# Requisitos previos

Antes de ejecutar el proyecto tener instalado:

- Docker
- Haber inicializado el proyecto de Backend previamente
-------------------------------

# Ejecución con Docker desde la raiz del proyecto 
1. Construir la imagen:
  docker build -t frontend .
2. Ejecutar:
   docker run -p 3000:80 frontend
3. Abrir en el navegador:
   http://localhost:3000
   
