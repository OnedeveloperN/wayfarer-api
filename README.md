# Wayfarer 🧭

Plataforma de viajes compartidos (carpooling). Los conductores publican viajes con origen, destino, fecha y asientos disponibles; cualquier visitante puede buscarlos y consultarlos, y los usuarios registrados pueden publicar, editar y eliminar **sus propios** viajes.

## 📂 Estructura del repositorio

Este es un **monorepo**: un único repositorio de GitHub con dos proyectos independientes, cada uno con su propio `package.json`.

```
wayfarer-api/           (repo raíz)
├── wayfarer-api/        → Backend: Node.js + Express + MongoDB (Mongoose)
└── wayfarer-frontend/   → Frontend: React + Vite + Tailwind CSS
```

## 🔗 Enlaces

| | URL |
|---|---|
| Repositorio (GitHub) | https://github.com/OnedeveloperN/wayfarer-api |
| Frontend desplegado | https://wayfarer-frontend.vercel.app |
| API desplegada | https://wayfarer-api.vercel.app |

## 🚀 Instalación y ejecución en local

### Backend (`wayfarer-api/`)

```bash
cd wayfarer-api
npm install
```

Creá un archivo `.env` (basado en `.env.example`) con:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/wayfarer_db?appName=Cluster0
PORT=4000
```

Levantar el servidor:

```bash
npm run dev
```

La API queda escuchando en `http://localhost:4000`.

### Frontend (`wayfarer-frontend/`)

```bash
cd wayfarer-frontend
npm install
```

Creá un archivo `.env` (basado en `.env.example`) con:

```env
VITE_API_URL=http://localhost:4000/api
```

Levantar el proyecto:

```bash
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

> **Importante**: para producción, `VITE_API_URL` debe apuntar a la API desplegada (`https://wayfarer-api.vercel.app/api`), configurada como variable de entorno en el proyecto de Vercel del frontend.

## ⚙️ Variables de entorno

**Backend** (`wayfarer-api/.env`):

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | Connection string de MongoDB Atlas |
| `PORT` | Puerto donde corre la API (4000 en local) |

**Frontend** (`wayfarer-frontend/.env`):

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API (local o desplegada) |

Ambos incluyen su `.env.example` correspondiente con el formato esperado, sin valores reales.

## 📡 Endpoints usados

### Viajes (`/api/viajes`)

| Método | Ruta | Descripción | Protegido |
|---|---|---|---|
| GET | `/api/viajes` | Lista todos los viajes (con datos del conductor poblados) | No |
| GET | `/api/viajes/:id` | Obtiene un viaje puntual | No |
| POST | `/api/viajes` | Crea un viaje nuevo | No* |
| PUT | `/api/viajes/:id` | Actualiza un viaje | Sí — solo el dueño |
| DELETE | `/api/viajes/:id` | Elimina un viaje | Sí — solo el dueño |

\* El frontend solo permite publicar viajes si hay un usuario con sesión iniciada, pero el endpoint en sí no lo exige.

### Usuarios (`/api/usuarios`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Lista los usuarios registrados (sin password) |
| POST | `/api/usuarios` | Registra un usuario nuevo |

### Sobre la autenticación

El proyecto usa un esquema de autenticación **simplificado, sin JWT**: en vez de un token firmado, el usuario simplemente se elige de una lista (o se registra) y esa identidad se guarda en `localStorage` desde el frontend. Para las operaciones de editar/eliminar, el frontend envía el id del usuario actual en un header custom `x-usuario-id`, y el backend verifica que coincida con el `conductor` del viaje antes de permitir la acción.

⚠️ **Limitación conocida**: como no hay un token criptográficamente verificado, este header es, en teoría, falsificable desde las herramientas de desarrollador del navegador. Es un esquema suficiente para el alcance de este proyecto académico, pero no apto para producción real — ahí correspondería implementar JWT.

## 🗺️ Diagrama de flujo

```mermaid
flowchart TD
    A[Visitante entra al sitio] --> B[Ve el listado de viajes<br/>GET /api/viajes]
    B --> C{¿Quiere publicar,<br/>editar o eliminar?}
    C -- No, solo mira --> B
    C -- Sí --> D{¿Tiene sesión<br/>iniciada?}
    D -- No --> E[Click en 'Iniciar sesión']
    E --> F{¿Ya tiene usuario?}
    F -- Sí --> G[Elige usuario de la lista<br/>GET /api/usuarios]
    F -- No --> H[Se registra<br/>POST /api/usuarios]
    G --> I[Usuario guardado en<br/>Context + localStorage]
    H --> I
    I --> D
    D -- Sí --> J[Publica un viaje<br/>POST /api/viajes]
    B --> K{¿El viaje es suyo?}
    K -- Sí --> L[Puede Editar / Eliminar<br/>PUT o DELETE con header x-usuario-id]
    K -- No --> M[Solo puede ver el viaje,<br/>sin botones de edición]
    L --> N[Backend verifica que<br/>conductor === x-usuario-id]
    N -- Coincide --> O[Operación permitida]
    N -- No coincide --> P[403 Forbidden]
```

## 🛠️ Stack

- **Frontend**: React, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, Mongoose
- **Base de datos**: MongoDB Atlas
- **Deploy**: Vercel (frontend y backend, como funciones serverless)