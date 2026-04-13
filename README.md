# QuickTask Frontend

## Descripción del sistema

QuickTask es una aplicación móvil desarrollada en React Native que
permite a los usuarios interactuar con una plataforma de tareas locales.

Desde la aplicación, los usuarios pueden: - Registrarse - Iniciar
sesión - Crear tareas - Visualizar tareas disponibles - Aceptar tareas -
Comunicarse mediante un chat - Consultar su perfil

El frontend consume una API mediante un API Gateway que centraliza las
solicitudes hacia los distintos servicios del sistema.

------------------------------------------------------------------------

## Tecnologías usadas

-   React Native
-   TypeScript
-   Axios
-   React Navigation
-   Context API (manejo de estado de usuario)

------------------------------------------------------------------------

## Pasos para despliegue

### 1. Instalar dependencias

npm install

------------------------------------------------------------------------

### 2. Configurar la URL del backend

En el archivo:

src/api/client.ts

Configurar:

baseURL: "http://`<IP_LOCAL>`{=html}:4001"

------------------------------------------------------------------------

### 3. Ejecutar la aplicación

npx react-native start\
npx react-native run-android

------------------------------------------------------------------------

### 4. Flujo de uso

-   Registrar usuario\
-   Iniciar sesión\
-   Crear tarea\
-   Visualizar tareas\
-   Aceptar tarea\
-   Usar chat\
-   Ver perfil

------------------------------------------------------------------------

## Notas

-   La aplicación funciona en red local, por lo que el dispositivo o
    emulador debe estar en la misma red que el backend.
-   Se recomienda usar el emulador o un dispositivo físico para pruebas.
