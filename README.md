# Wayfarer API

API RESTful para **Wayfarer**, una plataforma de viajes compartidos (carpooling) que conecta conductores con asientos disponibles y pasajeros que buscan trasladarse entre ciudades.

Este backend forma parte del proyecto fullstack desarrollado en la asignatura de Desarrollo Web Fullstack (CEI), construido con **Node.js**, **Express** y **MongoDB Atlas** a través de **Mongoose**.

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Modelos de datos](#modelos-de-datos)
- [Endpoints](#endpoints)
- [Diagrama de la arquitectura](#diagrama-de-la-arquitectura)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Pruebas de la API](#pruebas-de-la-api)
- [Despliegue](#despliegue)

## Descripción del proyecto

Wayfarer permite a los conductores publicar viajes indicando origen, destino, fecha, precio por asiento y plazas disponibles. Los pasajeros pueden consultar los viajes publicados, ver el detalle de cada uno, y en próximas iteraciones reservar asientos y comunicarse con el conductor mediante un chat integrado.

Esta API expone las operaciones necesarias para gestionar la entidad principal del proyecto (**Viajes**) con un CRUD completo, además de un modelo de **Usuarios** que representa a conductores y pasajeros.

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución
- **Express** — framework para la API REST
- **Mongoose** — ODM para modelar y conectar con MongoDB
- **MongoDB Atlas** — base de datos en la nube
- **dotenv** — gestión de variables de entorno
- **cors** — habilitar peticiones desde el frontend

## Modelos de datos

### Usuario

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `nombre` | String | Sí | Nombre completo del usuario |
| `email` | String | Sí (único) | Correo electrónico, usado para login |
| `password` | String | Sí | Contraseña (mínimo 6 caracteres) |
| `esConductor` | Boolean | No (default: `false`) | Indica si el usuario puede publicar viajes |
| `createdAt` / `updatedAt` | Date | Automático | Marcas de tiempo (`timestamps`) |

### Viaje (entidad principal)

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `conductor` | ObjectId (ref: `Usuario`) | Sí | Usuario que publica el viaje |
| `origen` | String | Sí | Ciudad o punto de partida |
| `destino` | String | Sí | Ciudad o punto de llegada |
| `fecha` | Date | Sí | Fecha del viaje |
| `precioPorAsiento` | Number | Sí | Precio en euros por asiento |
| `asientosDisponibles` | Number | Sí | Cantidad de asientos libres |
| `estado` | String (enum) | No (default: `activo`) | `activo`, `completo`, `cancelado` o `finalizado` |
| `createdAt` / `updatedAt` | Date | Automático | Marcas de tiempo (`timestamps`) |

La relación `conductor` referencia a la colección `usuarios`, y se resuelve con `.populate()` en el listado general de viajes.

## Endpoints

Todas las rutas de viajes están montadas bajo el prefijo `/api/viajes`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/viajes` | Obtiene todos los viajes (con datos del conductor) |
| `GET` | `/api/viajes/:id` | Obtiene un viaje concreto por su ID |
| `POST` | `/api/viajes` | Crea un nuevo viaje |
| `PUT` | `/api/viajes/:id` | Actualiza un viaje existente |
| `DELETE` | `/api/viajes/:id` | Elimina un viaje |

Cualquier ruta no definida devuelve `404` con un mensaje JSON. Cualquier error interno no controlado devuelve `500` con un mensaje JSON, sin exponer el stack trace ni caer el servidor.

**Ejemplo de body para crear/actualizar un viaje:**
```json
{
  "conductor": "64a1b2c3d4e5f6a7b8c9d0e1",
  "origen": "Madrid",
  "destino": "Valencia",
  "fecha": "2026-08-15T00:00:00.000Z",
  "precioPorAsiento": 24.50,
  "asientosDisponibles": 3
}
```

## Diagrama de la arquitectura

```mermaid
flowchart LR
    A[Cliente / Postman / REST Client] -->|HTTP Request| B[Express Router]
    B --> C[Middlewares: cors + express.json]
    C --> D[Rutas: viaje.routes.js]
    D --> E[Controlador: viaje.controller.js]
    E -->|Mongoose| F[(MongoDB Atlas<br/>wayfarer_db)]
    F -->|Documentos| E
    E -->|JSON Response| A
    D -.->|ruta no encontrada| G[Middleware 404]
    E -.->|error inesperado| H[Middleware 500]
    G -->|JSON error| A
    H -->|JSON error| A
```

**Flujo de una petición:**
1. El cliente (Postman, REST Client, o el futuro frontend) envía una petición HTTP.
2. Express aplica los middlewares generales (`cors`, `express.json`).
3. El router (`viaje.routes.js`) dirige la petición al controlador correspondiente.
4. El controlador ejecuta la operación con Mongoose contra MongoDB Atlas.
5. Se devuelve una respuesta JSON, con el código de estado correspondiente (`200`, `201`, `404`, `500`).

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/OnedeveloperN/wayfarer-api.git
cd wayfarer-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y completa tus propios valores:

```bash
cp .env.example .env
```

### 4. Ejecutar en desarrollo

```bash
node server.js
```

El servidor queda escuchando en `http://localhost:4000` (o el puerto indicado en `.env`).

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MONGODB_URI` | Cadena de conexión a tu clúster de MongoDB Atlas | `mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/wayfarer_db` |
| `PORT` | Puerto en el que corre el servidor en local | `4000` |

Estas variables se definen en un archivo `.env` (no versionado) siguiendo el ejemplo de `.env.example`.

## Pruebas de la API

El proyecto incluye un archivo [`requests.http`](./requests.http) con todas las peticiones necesarias para probar el CRUD completo (crear, leer, actualizar, eliminar) y el manejo de errores (404), listo para ejecutar con la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) de VS Code.

## Despliegue

La API está desplegada en **Vercel** y conectada a MongoDB Atlas:

- **URL de producción:** [https://wayfarer-api.vercel.app](https://wayfarer-api.vercel.app)
- **Endpoint de ejemplo:** [https://wayfarer-api.vercel.app/api/viajes](https://wayfarer-api.vercel.app/api/viajes)

Las variables de entorno (`MONGODB_URI`) están configuradas directamente en el panel de Vercel, sin exponerse en el código fuente.

> **Nota técnica:** en el entorno serverless de Vercel, la resolución DNS por defecto puede fallar al intentar conectar con la cadena `mongodb+srv://` de Atlas. Para solucionarlo, `server.js` fuerza el uso de servidores DNS públicos (Google y Cloudflare) antes de establecer la conexión:
> ```js
> const dns = require("dns");
> dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
> ```
