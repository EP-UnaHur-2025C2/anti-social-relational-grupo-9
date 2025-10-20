# Red Anti-Social

## Universidad Nacional de Hurlingham
## Trabajo Practico Nº 1 - Estrategias de Persistencia
### Segundo Cuatrimestre - Año 2025

### Docentes
- Gerardo Gonzalez Tulian

### Grupo 9
#### Integrantes:

- Asam Fernando

## Descripcion del Proyecto

Red Anti-Social es una aplicacion que implementa a modo de MVP el backend de una red social cuyas funcionalidades principales son:
- Crear usuarios
- Crear y asociar posts a usuarios
- Crear y asociar imagenes, tags y comentarios a posts
- Seguir a otros usuarios
- Actualizacion, consulta y borrado de datos

Entre los distintos tipos de consultas a la base de datos implementadas se encuentran:
- Listado completo de registros de cada entidad.
- Consultas de registros individuales de cada entidad por ID, Ej: consultar un usuario por id.
- Consultas de registros de una entidad asociada a otra/s, Ej: todos los posts de un usuario.
- Consulta de registros segun antiguedad, Ej: comentarios con antiguedad menor a 6 meses.

La aplicacion permite configurar las variables de entorno necesarias para su ejecucion como:
- El puerto de ejecucion donde se reciben las peticiones
- El motor de base de datos que se desea implementar
- Visibilidad de comentarios por antiguedad

El proyecto cuenta con documentacion completa de cada endpoint en formato **YAML** que puede consultarse en http://localhost:3006/api-docs.
El puerto de ejecucion por defecto es el 3006 configurado tanto en la [📄 documentación YAML](./src/docs/Documentacion_API_Red_Anti-Social.yaml) como
en la [📄 configuracion de variables de entorno ](./.env).


## Caracteristicas

### Diagrama Entidad-Relacion

![Imagen](./src/docs/Diagrama_Der.jpg)

## Entidades

**Users**:
- Registra 
**Posts**:

**Post_Images**:

**Tags**:

**Comments**:

**Follows**:

Descripción del proyecto	Qué hace y para qué sirve	✔️
✅ Características / entidades	Detalle de Users, Posts, etc.	✔️
✅ Tecnologías y dependencias	Stack del proyecto	✔️
✅ Cómo correr el proyecto	Pasos con comandos	✔️
✅ Documentación Swagger + YAML	Enlaces y explicación	✔️
✅ Endpoints	Tabla de rutas	✔️
✅ Estructura del proyecto	Árbol de carpetas	✔️
🟡 Variables de entorno	Qué define y cómo	🔜
🟡 Base de datos / Migraciones	Cómo se manejan	🔜
🟡 Ejemplo de uso de API	Request/response	🔜
🟡 Futuras mejoras	Plan a futuro	🔜
🟢 Licencia y autor	Información de contacto


## Tecnologias

**Cliente:** React, Bootsrap, Vite

**Servidor:** Node

## 📦 Dependencias

#### ⚙️ Dependencias de produccion que utiliza el proyecto

```json
  "dependencies": {
    "bootstrap": "^5.3.8",
    "formik": "^2.4.6",
    "react": "^19.1.1",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.9.1",
    "yup": "^1.7.1"
  }
```
#### 🧰 Dependencias de desarrollo que utiliza el proyecto

```json
  "devDependencies": {
    "@eslint/js": "^9.35.0",
    "@types/react": "^19.1.13",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.2",
    "eslint": "^9.35.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.4.0",
    "vite": "^7.1.6"
  }
```
    
## Correr el Proyecto

#### Clonar el proyecto

```bash
  git clone https://github.com/facundoArias217/tpInterfacesDeUsuario
```

#### Ir a la carpeta del proyecto

```bash
  cd tpInterfacesDeUsuario
```

#### Abrir con Vs Code

```bash
  code .
```

#### Instalar dependencias

```bash
  npm install
```

#### Correr el proyecto

```bash
  npm run dev
```
#### Seguir el enlace que aparece en la terminal para abrir el sitio en el navegador

![Imagen](./src/assets/LinkPagina.jpg)

## Estructura del Proyecto

```
📁 src
├── 📁 assets
├── 📁 components
│   ├── 📁 Boton
│   │   └── Boton.jsx
│   ├── 📁 FormInput
│   │   └── FormInput.jsx
│   ├── 📁 Footer
│   │   └── Footer.jsx
│   ├── 📁 NavBar
│   │   └── NavBar.jsx
│   ├── 📁 Producto
│   │   ├── Producto.jsx
│   │   └── Producto.module.css
│   ├── 📁 ProductoPedido
│   │   └── ProductoPedido.jsx
│   └── index.js
├── 📁 estilos
│   └── estilos.css
├── 📁 pages
│   ├── Carrito.jsx
│   ├── Carta.jsx
│   ├── ContactoYReserva.jsx
│   ├── Inicio.jsx
│   └── index.js
├── 📁 platos
│   └── platos.json
├── 📁 schemas
│   └── Form.schema.jsx
├── App.jsx
└── main.jsx
```
