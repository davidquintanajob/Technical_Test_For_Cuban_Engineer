# Gestión de Tareas

Este proyecto es una aplicación para la gestión de tareas, compuesta por un backend robusto y un frontend moderno. Permite crear, listar, actualizar y eliminar tareas, facilitando la organización y el seguimiento de actividades.

El frontend cuenta con un diseño responsivo, implementando principios de UI/CI (Interfaz de Usuario/Consistencia de Interfaz), lo que garantiza una experiencia óptima en cualquier dispositivo.

## Herramientas Utilizadas

### Backend
- [x] Lenguaje principal: TypeScript
- [x] Framework: Express
- [x] ORM: TypeORM
- [x] Documentación: Swagger
- [x] Base de datos: PostgreSQL

### Frontend
- [x] Framework: Nuxt
- [x] Lenguaje: JavaScript
- [x] Estilos: Tailwind CSS
- [x] Diseño responsivo y UI/CI

### Otras herramientas
- [x] Git

## Capturas de Pantalla

A continuación se muestran algunas imágenes del proyecto en funcionamiento:

![Captura 2](./img2.png)
![Captura 1](./img1.png)

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- Node.js >= 20.13.*
- PostgreSQL >= 16.*
- Git
- (Opcional) Docker

## Instalación

> **Nota:** El backend y el frontend se encuentran en ramas diferentes dentro de este mismo repositorio. Debes desplegar primero el backend y luego el frontend.
> 
> **Importante:** Antes de iniciar cada servicio, asegúrate de crear el archivo `.env` con las variables de entorno especificadas en la documentación de cada rama (backend y frontend).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/repositorio.git
   ```
2. Accede a la carpeta del proyecto:
   ```bash
   cd nombre_del_proyecto
   ```
3. Cambia a la rama del backend y despliega el backend:
   ```bash
   git checkout backend
   cd backend
   npm install
   # Configura las variables de entorno para la conexión a PostgreSQL
   npm run start
   ```
4. En una nueva terminal, cambia a la rama del frontend y despliega el frontend:
   ```bash
   git checkout frontend
   cd frontend
   npm install
   npm run dev
   ```

## Uso

Accede al frontend desde tu navegador para gestionar tareas. El frontend se comunica con el backend a través de una API REST documentada en Swagger.


## Notas Adicionales

- La documentación de la API está disponible en la ruta `/api-docs` del backend (Swagger).
- Puedes personalizar el diseño del frontend modificando los estilos en Tailwind CSS.
- Para despliegue en producción, se recomienda el uso de Docker.
