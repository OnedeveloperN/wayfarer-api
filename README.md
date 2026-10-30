# Wayfarer 🧭

Plataforma de viajes compartidos (carpooling) full-stack. Los conductores pueden publicar viajes indicando origen, destino, fecha, plazas y precio; los pasajeros pueden buscar trayectos en tiempo real y consultar los detalles.

---

## 📂 Estructura del proyecto (Monorepo)

```text
wayfarer-api/               (Raíz del repositorio)
├── wayfarer-backend/       → API REST: Node.js + Express + MongoDB Atlas (Mongoose)
└── wayfarer-frontend/      → Client: React (Vite) + Tailwind CSS + Context API
```

---

## 🔗 Enlaces

| Entorno | URL |
|---|---|
| Repositorio (GitHub) | https://github.com/OnedeveloperN/wayfarer-api |
| Frontend desplegado | https://wayfarer-frontend.vercel.app |
| API desplegada | https://wayfarer-api.vercel.app |

---

## 🔑 Credenciales de Prueba (Script de Seed)

Para evaluar todas las funcionalidades del sistema sin registrar usuarios desde cero, podés ejecutar el script de semillas o ingresar con estas cuentas preconfiguradas:

| Rol | Nombre | Email | Contraseña |
| :--- | :--- | :--- | :--- |
| **Administrador** | Administrador General | `admin@wayfarer.test` | `Admin123456!` |
| **Usuario Conductor 1** | Juan Pérez | `user1@wayfarer.test` | `User123456!` |
| **Usuario Conductor 2** | María García | `user2@wayfarer.test` | `User123456!` |

---

## 🗺️ Diagrama de flujo

```mermaid
flowchart TD
    A[Visitante entra al sitio] --> B[Ve el listado de viajes<br/>GET /api/viajes]
    B --> C{¿Quiere publicar,<br/>editar o eliminar?}
    C -- No, solo consulta --> B
    C -- Sí --> D{¿Tiene sesión<br/>iniciada?}
    D -- No --> E[Modal de Autenticación]
    E --> F{¿Tiene cuenta?}
    F -- Sí --> G[Inicia sesión<br/>POST /api/usuarios/login]
    F -- No --> H[Se registra<br/>POST /api/usuarios/register]
    G --> I[Guarda Token JWT en localStorage<br/>y Usuario en Context]
    H --> I
    I --> D
    D -- Sí --> J[Publica / Edita / Elimina viaje<br/>Petición con Bearer Token JWT]
    J --> K[Backend verifica Token JWT]
    K -- Válido y Autorizado --> L[Operación exitosa 200 / 201]
    K -- Inválido o No Autorizado --> M[Error 401 / 403]
```

```mermaid
erDiagram
    USUARIO {
        ObjectId _id PK
        String nombre
        String email UK
        String password
        Boolean esConductor
        Date createdAt
        Date updatedAt
    }

    VIAJE {
        ObjectId _id PK
        String origen
        String destino
        Date fecha
        Number precio
        Number plazas
        ObjectId conductor FK
        Date createdAt
        Date updatedAt
    }

    USUARIO ||--o{ VIAJE : "publica"
```

---

## 🚀 Instalación y ejecución en local

### 1. Backend (`wayfarer-backend/`)

```bash
cd wayfarer-backend
npm install
```

Creá un archivo `.env` basado en `.env.example`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/wayfarer_db
JWT_SECRET=clave_secreta_jwt_para_firmar_tokens
```

Para cargar la base de datos con los datos de prueba:
```bash
npm run seed
```

Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```
La API estará escuchando en `http://localhost:4000`.

---

### 2. Frontend (`wayfarer-frontend/`)

```bash
cd wayfarer-frontend
npm install
```

Creá un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:4000/api
```

Iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```
El cliente estará disponible en `http://localhost:5173`.

---

## ⚙️ Variables de Entorno (`UPPER_SNAKE_CASE`)

### Backend (`wayfarer-backend/.env`)

| Variable | Descripción |
|---|---|
| `PORT` | Puerto de escucha de Express (ej. `4000`) |
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar y verificar tokens de autenticación JWT |

### Frontend (`wayfarer-frontend/.env`)

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API REST (`http://localhost:4000/api` o URL pública) |

---

## 📡 Endpoints de la API

### Autenticación y Usuarios (`/api/usuarios`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Obtiene la lista de usuarios |
| POST | `/api/usuarios/register` | Registra un nuevo usuario con contraseña encriptada (`bcrypt`) |
| POST | `/api/usuarios/login` | Inicia sesión y retorna token JWT y datos de perfil |

### Viajes (`/api/viajes`)

| Método | Ruta | Descripción | Protegido |
|---|---|---|---|
| GET | `/api/viajes` | Lista todos los viajes disponibles | No |
| GET | `/api/viajes/:id` | Obtiene los detalles de un viaje | No |
| POST | `/api/viajes` | Crea un nuevo viaje asociado al usuario autenticado | Sí (JWT) |
| PUT | `/api/viajes/:id` | Actualiza un viaje (solo el autor o administrador) | Sí (JWT) |
| DELETE | `/api/viajes/:id` | Elimina un viaje (solo el autor o administrador) | Sí (JWT) |

---

## 💻 Arquitectura y Patrones (Cumplimiento de Rúbrica)

- **Frontend (React + Vite)**:
  - Carga perezosa de rutas con `React.lazy` y `<Suspense>`.
  - Context API para estado global de autenticación (`AuthContext`).
  - Hooks personalizados para encapsular la lógica de negocio (`useUsuario`, `useViajes`).
  - Importaciones absolutas configuradas mediante alias `@/...`.
  - Manejo de listeners con limpieza activa (`useEffect` con `addEventListener` y `removeEventListener`).
  - Vistas institucionales adicionales: `/sobre-nosotros`, `/terminos`, `/privacidad`.

- **Backend (Express + Node.js)**:
  - Estructura modular con controladores (`camelCase`), esquemas Mongoose (`kebab-case`) y middlewares de Express Router.
  - Middlewares dedicados para gestión centralizada de errores (Rutas 404 y Errores 500).
  - Encriptación de contraseñas mediante hooks `pre('save')` en Mongoose.
  - Middleware de seguridad `helmet` e integración de respuestas JSON con códigos HTTP de estado explícitos.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18, Vite, React Router DOM v6, Tailwind CSS.
- **Backend**: Node.js, Express, Mongoose, JSON Web Token (JWT), Bcrypt.js, Helmet, CORS.
- **Base de Datos**: MongoDB Atlas.
- **Despliegue**: Vercel.