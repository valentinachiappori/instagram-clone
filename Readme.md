# Instagram Clone

Clon de Instagram full-stack desarrollado como trabajo práctico grupal de la materia de **UI** en la Universidad Nacional de Quilmes (2026, 1.er cuatrimestre). El proyecto incluye una API REST, una aplicación web y una aplicación móvil que consumen el mismo backend.

## Funcionalidades

- Registro e inicio de sesión con autenticación por **JWT**
- Timeline con las publicaciones de los usuarios que seguís
- Crear, editar y eliminar publicaciones
- Me gusta y comentarios en publicaciones
- Seguir y dejar de seguir usuarios
- Perfiles de usuario con sus publicaciones
- Búsqueda de usuarios y publicaciones
- Cierre de sesión automático cuando el token expira

## Estructura del repositorio

```
.
├── Api/      # Backend (Node.js + Express)
├── Web/      # Aplicación web (React + Vite)
└── Mobile/   # Aplicación móvil (React Native + Expo)
```

## Tecnologías

| Parte | Stack |
|-------|-------|
| **Api** | Node.js, Express 5, JSON Web Token, Yup (validaciones), CORS, dotenv |
| **Web** | React 19, Vite, React Router, Axios, Bootstrap, Yup |
| **Mobile** | React Native, Expo 54, Expo Router, AsyncStorage, Yup |