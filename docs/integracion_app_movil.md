# Integración de la Aplicación Móvil con el Backend

**Práctica Nro. 007**  
**Asignatura:** Desarrollo Basado en Plataformas  
**Fecha:** Jueves 05 de febrero  
**Estudiantes:** [Boris Israel Rengel Japón, José Fermin Encalada Leiva]

---

## 1. Endpoints Consumidos

### 1.1 Autenticación

#### POST /api/login
**Propósito:** Iniciar sesión en el sistema

**Solicitud:**
```json
{
  "email": "usuario@gmail.com",
  "password": "Contraseña123!"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nombreusuario",
    "rol": "usuario"
  }
}
```

**Implementación en la app:**
```javascript
// Archivo: /frontend/sistemareservas/src/api/Autenticacion.js
export const iniciosesion = (user) => axios.post('/login', user);

// Uso en componente:
const { iniciodesesion } = useAuth();
await iniciodesesion({ email, password });
```

---

#### POST /api/register
**Propósito:** Registrar nuevo usuario

**Solicitud:**
```json
{
  "email": "usuario@gmail.com",
  "username": "nombreusuario",
  "password": "Contraseña123!",
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "1234567890"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "✅ Registro exitoso. ¡Bienvenido!",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "nombreusuario",
    "email": "usuario@gmail.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "cedula": "1234567890",
    "rol": "usuario"
  }
}
```

---

#### POST /api/logout
**Propósito:** Cerrar sesión del usuario

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "👋 Sesión cerrada exitosamente."
}
```

---

### 1.2 Gestión de Canchas

#### GET /api/canchas
**Propósito:** Obtener listado de todas las canchas disponibles

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "✅ Canchas obtenidas correctamente.",
  "total": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Cancha El Golazo 1",
      "tipo": "Fútbol 7",
      "precioHora": 25.00,
      "acronimo": "EG1",
      "estado": "disponible",
      "ubicacion": {
        "direccion": "Av. Principal y Calle Secundaria, Quito",
        "lat": -0.180653,
        "lng": -78.467834
      },
      "fotos": ["/uploads/1706342400000.jpg"],
      "horarioApertura": "08:00",
      "horarioCierre": "22:00"
    }
  ]
}
```

**Implementación:**
```javascript
// Archivo: /frontend/sistemareservas/src/api/Canchas.js
export const obtenerCanchas = () => axios.get('/canchas');

// Uso:
const cargarCanchas = async () => {
  const res = await obtenerCanchas();
  setCanchas(res.data.data);
};
```

---

#### GET /api/canchas/:id
**Propósito:** Obtener detalles de una cancha específica

**Ejemplo de solicitud:** `GET /api/canchas/507f1f77bcf86cd799439011`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "✅ Cancha obtenida correctamente.",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Cancha El Golazo 1",
    "tipo": "Fútbol 7",
    "precioHora": 25.00,
    "acronimo": "EG1",
    "estado": "disponible",
    "ubicacion": {
      "direccion": "Av. Principal y Calle Secundaria, Quito",
      "lat": -0.180653,
      "lng": -78.467834
    },
    "fotos": ["/uploads/1706342400000.jpg"],
    "horarioApertura": "08:00",
    "horarioCierre": "22:00"
  }
}
```

---

#### POST /api/canchas (Solo Admin)
**Propósito:** Crear nueva cancha

**Solicitud (FormData):**
```
nombre: Cancha El Golazo 1
tipo: Fútbol 7
precioHora: 25.00
acronimo: EG1
estado: disponible
direccion: Av. Principal y Calle Secundaria, Quito
lat: -0.180653
lng: -78.467834
horarioApertura: 08:00
horarioCierre: 22:00
fotos: [File]
```

**Implementación:**
```javascript
export const crearCancha = (data) => {
  return axios.post("/canchas", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
```

---

#### GET /api/canchas/:id/disponibilidad
**Propósito:** Consultar horarios disponibles de una cancha para una fecha

**Ejemplo:** `GET /api/canchas/507f1f77bcf86cd799439011/disponibilidad?fecha=2024-02-01`

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "✅ Horarios disponibles obtenidos correctamente.",
  "cancha": "Cancha El Golazo 1",
  "fecha": "2024-02-01",
  "disponibilidad": [
    {
      "horaInicio": "08:00",
      "horaFin": "09:00"
    },
    {
      "horaInicio": "09:00",
      "horaFin": "10:00"
    },
    {
      "horaInicio": "12:00",
      "horaFin": "13:00"
    }
  ]
}
```

---

### 1.3 Gestión de Reservas

#### GET /api/reservas (Requiere autenticación)
**Propósito:** Obtener reservas del usuario autenticado

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "✅ Reservas obtenidas exitosamente.",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "fecha": "2024-02-01T00:00:00.000Z",
      "horaInicio": "10:00",
      "horaFin": "12:00",
      "total": 50.00,
      "estado": "confirmada",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "nombreusuario",
        "email": "usuario@gmail.com"
      },
      "cancha": {
        "_id": "507f1f77bcf86cd799439013",
        "nombre": "Cancha El Golazo 1",
        "tipo": "Fútbol 7",
        "precioHora": 25.00
      }
    }
  ]
}
```

---

#### POST /api/reservas (Requiere autenticación)
**Propósito:** Crear nueva reserva

**Solicitud:**
```json
{
  "fecha": "2024-02-01",
  "horaInicio": "10:00",
  "horaFin": "12:00",
  "canchaId": "507f1f77bcf86cd799439013",
  "estado": "confirmada"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "✅ Reserva creada correctamente.",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "fecha": "2024-02-01T00:00:00.000Z",
    "horaInicio": "10:00",
    "horaFin": "12:00",
    "total": 50.00,
    "estado": "confirmada",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "nombreusuario"
    },
    "cancha": {
      "_id": "507f1f77bcf86cd799439013",
      "nombre": "Cancha El Golazo 1"
    }
  }
}
```

**Implementación:**
```javascript
export const crearReserva = (data) => axios.post('/reservas', data);

// Uso:
const handleSubmit = async (e) => {
  e.preventDefault();
  await crearReserva({
    fecha,
    horaInicio,
    horaFin,
    canchaId: id,
    total: parseFloat(calcularTotal())
  });
};
```

---

#### DELETE /api/reservas/:id (Requiere autenticación)
**Propósito:** Eliminar/cancelar una reserva

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "✅ Reserva eliminada exitosamente.",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "fecha": "2024-02-01T00:00:00.000Z",
    "horaInicio": "10:00",
    "horaFin": "12:00"
  }
}
```

---

## 2. Ejemplo de Solicitud y Respuesta

### Ejemplo 1: Login de Usuario

**Solicitud HTTP:**
```http
POST /api/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "juan.perez@gmail.com",
  "password": "MiPassword123!"
}
```

**Respuesta HTTP:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; Path=/; HttpOnly

{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": "65b8f9a2c1234567890abcde",
    "username": "juanperez",
    "rol": "usuario"
  }
}
```

---

### Ejemplo 2: Crear Reserva

**Solicitud HTTP:**
```http
POST /api/reservas HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "fecha": "2024-02-10",
  "horaInicio": "14:00",
  "horaFin": "16:00",
  "canchaId": "65b8f9a2c1234567890abcdf",
  "estado": "confirmada"
}
```

**Respuesta HTTP:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "✅ Reserva creada correctamente.",
  "data": {
    "_id": "65b8f9a2c1234567890abce0",
    "fecha": "2024-02-10T00:00:00.000Z",
    "horaInicio": "14:00",
    "horaFin": "16:00",
    "total": 50.00,
    "estado": "confirmada",
    "user": {
      "_id": "65b8f9a2c1234567890abcde",
      "username": "juanperez"
    },
    "cancha": {
      "_id": "65b8f9a2c1234567890abcdf",
      "nombre": "Cancha El Golazo 1",
      "tipo": "Fútbol 7",
      "precioHora": 25.00
    },
    "createdAt": "2024-01-27T14:30:00.000Z",
    "updatedAt": "2024-01-27T14:30:00.000Z"
  }
}
```

---

### Ejemplo 3: Obtener Canchas Disponibles

**Solicitud HTTP:**
```http
GET /api/canchas HTTP/1.1
Host: localhost:3000
```

**Respuesta HTTP:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "✅ Canchas obtenidas correctamente.",
  "total": 3,
  "data": [
    {
      "_id": "65b8f9a2c1234567890abcdf",
      "nombre": "Cancha El Golazo 1",
      "tipo": "Fútbol 7",
      "precioHora": 25.00,
      "acronimo": "EG1",
      "estado": "disponible",
      "ubicacion": {
        "direccion": "Av. Principal 123, Quito",
        "lat": -0.180653,
        "lng": -78.467834
      },
      "fotos": ["/uploads/1706342400000.jpg"],
      "horarioApertura": "08:00",
      "horarioCierre": "22:00",
      "createdAt": "2024-01-20T10:00:00.000Z",
      "updatedAt": "2024-01-20T10:00:00.000Z"
    },
    {
      "_id": "65b8f9a2c1234567890abce1",
      "nombre": "Cancha Los Campeones",
      "tipo": "Fútbol 11",
      "precioHora": 40.00,
      "acronimo": "LC1",
      "estado": "disponible",
      "ubicacion": {
        "direccion": "Calle Secundaria 456, Quito",
        "lat": -0.185432,
        "lng": -78.471234
      },
      "fotos": ["/uploads/1706342500000.jpg"],
      "horarioApertura": "07:00",
      "horarioCierre": "23:00",
      "createdAt": "2024-01-21T11:00:00.000Z",
      "updatedAt": "2024-01-21T11:00:00.000Z"
    }
  ]
}
```

---

## 3. Interfaces del sistema

### 3.1 Pantalla de Login
![Login - Pantalla de inicio de sesión]

**Descripción:** Pantalla donde el usuario ingresa su email y contraseña para iniciar sesión en la aplicación.

**Endpoint utilizado:** `POST /api/login`

---

### 3.2 Pantalla de Registro
![Registro - Formulario de nuevo usuario]

**Descripción:** Formulario completo de registro con validación de campos (username, email, password, nombre, apellido, cédula).

**Endpoint utilizado:** `POST /api/register`

---

### 3.3 Listado de Canchas
![Canchas - Vista de canchas disponibles]

**Descripción:** Muestra todas las canchas disponibles con información de precio, tipo, ubicación y horarios.

**Endpoint utilizado:** `GET /api/canchas`

---

### 3.4 Detalle de Cancha y Reserva
![Reservar - Formulario de reserva]

**Descripción:** Pantalla para crear una nueva reserva, mostrando detalles de la cancha, selector de fecha y horarios disponibles.

**Endpoints utilizados:** 
- `GET /api/canchas/:id`
- `GET /api/canchas/:id/disponibilidad?fecha=YYYY-MM-DD`
- `POST /api/reservas`

---

### 3.5 Mis Reservas
![Mis Reservas - Lista de reservas del usuario]

**Descripción:** Vista de todas las reservas del usuario autenticado con información de fecha, horario, cancha y total.

**Endpoint utilizado:** `GET /api/reservas`

---

### 3.6 Panel de Administración
![Admin - Gestión de canchas]

**Descripción:** Panel administrativo para gestionar canchas (crear, editar, eliminar). Solo accesible para usuarios con rol "admin".

**Endpoints utilizados:** 
- `GET /api/canchas`
- `POST /api/canchas`
- `PUT /api/canchas/:id`
- `DELETE /api/canchas/:id`

---

### 3.7 Confirmación de Reserva
![Confirmación - Reserva exitosa]

**Descripción:** Mensaje de confirmación después de crear una reserva exitosamente.

---

### 3.8 Perfil de Usuario
![Perfil - Información del usuario]

**Descripción:** Pantalla que muestra la información del usuario autenticado con opción para editar datos.

**Endpoint utilizado:** `GET /api/profile`

---

## 4. Evidencia del Manejo de Errores

### 4.1 Error de Red (Network Error)
![Error de Red](./screenshots/error-01-network.png)

**Escenario:** Backend desconectado o sin conexión a internet

**Mensaje mostrado al usuario:**
```
🌐 Network Error: No se puede conectar al servidor
Verifica que el backend esté corriendo en: http://192.168.0.133:3000
```

**Código de manejo:**
```javascript
instance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status}`);
    return response;
  },
  (error) => {
    if (error.message === 'Network Error') {
      console.error('🌐 Network Error: No se puede conectar al servidor');
      toast.error('No se puede conectar al servidor. Verifica tu conexión.');
    }
    return Promise.reject(error);
  }
);
```

---

### 4.2 Error 400 - Bad Request
![Error 400 - Datos inválidos](./screenshots/error-02-bad-request.png)

**Escenario:** Datos de registro inválidos (email duplicado, cédula incorrecta)

**Mensaje mostrado al usuario:**
```
❌ El correo ya está registrado
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "El correo ya está registrado"
}
```

**Código de manejo:**
```javascript
try {
  const res = await registro(userData);
  toast.success("✅ Registro exitoso");
} catch (error) {
  if (error.response?.status === 400) {
    const mensaje = error.response.data.message;
    toast.error(mensaje);
  }
}
```

---

### 4.3 Error 401 - Unauthorized
![Error 401 - No autorizado](./screenshots/error-03-unauthorized.png)

**Escenario:** Token expirado o credenciales incorrectas

**Mensaje mostrado al usuario:**
```
🔒 No autorizado. Inicia sesión nuevamente.
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "No token, autorización denegada"
}
```

**Código de manejo:**
```javascript
if (error.response?.status === 401) {
  toast.error('No autorizado. Inicia sesión nuevamente.');
  navigate('/login');
  Cookies.remove("token");
  setIsAuthenticated(false);
}
```

---

### 4.4 Error 403 - Forbidden
![Error 403 - Acceso denegado](./screenshots/error-04-forbidden.png)

**Escenario:** Usuario sin permisos de administrador intenta acceder al panel admin

**Mensaje mostrado al usuario:**
```
⛔ Acceso denegado. Solo administradores.
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "⛔ Acceso denegado. Solo administradores."
}
```

**Código de manejo:**
```javascript
useEffect(() => {
  if (user?.rol !== 'admin') {
    toast.error("No tienes permisos de administrador");
    navigate("/sala");
    return;
  }
}, [user, navigate]);
```

---

### 4.5 Error 404 - Not Found
![Error 404 - Recurso no encontrado](./screenshots/error-05-not-found.png)

**Escenario:** Cancha o reserva no encontrada

**Mensaje mostrado al usuario:**
```
❌ Cancha no encontrada
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "❌ Cancha no encontrada."
}
```

---

### 4.6 Error 500 - Internal Server Error
![Error 500 - Error del servidor](./screenshots/error-06-server-error.png)

**Escenario:** Error interno del servidor

**Mensaje mostrado al usuario:**
```
💥 Error en el servidor. Intenta más tarde.
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "Error en el servidor",
  "error": "Database connection failed"
}
```

---

### 4.7 Timeout
![Timeout - Solicitud tardó demasiado](./screenshots/error-07-timeout.png)

**Escenario:** La solicitud tarda más de 10 segundos (timeout configurado)

**Mensaje mostrado al usuario:**
```
⏱️ Timeout: La petición tardó demasiado
```

**Código de manejo:**
```javascript
const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000, // 10 segundos
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      toast.error('La solicitud tardó demasiado. Verifica tu conexión.');
    }
    return Promise.reject(error);
  }
);
```

---

### 4.8 Validación de Datos Inválidos
![Validación - Campos vacíos](./screenshots/error-08-validation.png)

**Escenario:** Usuario intenta enviar formulario con campos vacíos o inválidos

**Mensajes mostrados:**
- "El correo es requerido"
- "La cédula debe tener exactamente 10 dígitos"
- "La contraseña debe tener entre 8 y 20 caracteres..."

**Implementación:**
```javascript
const { register, handleSubmit, formState: { errors } } = useForm();

<input
  type="email"
  {...register("email", { 
    required: "El correo es requerido",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      message: "Debe ser un correo de Gmail válido"
    }
  })}
/>

{errors.email && (
  <p className='text-red-900'>{errors.email.message}</p>
)}
```

---

### 4.9 Conflicto de Horarios
![Error - Horario no disponible](./screenshots/error-09-conflicto-horario.png)

**Escenario:** Usuario intenta reservar un horario ya ocupado

**Mensaje mostrado al usuario:**
```
⛔ Ya existe una reserva en ese horario para la cancha seleccionada
```

**Respuesta del servidor:**
```json
{
  "success": false,
  "message": "⛔ Ya existe una reserva en ese horario para la cancha seleccionada"
}
```

---

## 5. Códigos de Estado HTTP Validados

Durante la práctica se validaron los siguientes códigos de estado HTTP:

### ✅ Códigos de Éxito (2xx)

| Código | Descripción | Uso en la Aplicación |
|--------|-------------|---------------------|
| **200** | OK | Operaciones exitosas (GET, PUT, DELETE) |
| **201** | Created | Recursos creados (POST registro, POST reserva, POST cancha) |

**Ejemplo de validación 200:**
```javascript
if (response.status === 200) {
  console.log('✅ Operación exitosa');
  toast.success(response.data.message);
}
```

**Ejemplo de validación 201:**
```javascript
if (response.status === 201) {
  console.log('✅ Recurso creado');
  toast.success("✅ Reserva creada exitosamente");
  navigate("/sala");
}
```

---

### ⚠️ Códigos de Error del Cliente (4xx)

| Código | Descripción | Uso en la Aplicación |
|--------|-------------|---------------------|
| **400** | Bad Request | Datos inválidos, validaciones fallidas, conflictos de horario |
| **401** | Unauthorized | Token inválido, expirado o no proporcionado |
| **403** | Forbidden | Usuario sin permisos de administrador |
| **404** | Not Found | Cancha, reserva o usuario no encontrado |

**Ejemplo de validación 400:**
```javascript
if (error.response?.status === 400) {
  const mensaje = error.response.data.message;
  toast.error(mensaje);
  // Ejemplos de mensajes:
  // "El correo ya está registrado"
  // "La cédula debe tener exactamente 10 dígitos"
  // "⛔ Ya existe una reserva en ese horario"
}
```

**Ejemplo de validación 401:**
```javascript
if (error.response?.status === 401) {
  toast.error('🔒 Sesión expirada. Inicia sesión nuevamente.');
  Cookies.remove("token");
  setIsAuthenticated(false);
  navigate('/login');
}
```

**Ejemplo de validación 403:**
```javascript
if (error.response?.status === 403) {
  toast.error('⛔ No tienes permisos para realizar esta acción.');
  navigate('/sala');
}
```

**Ejemplo de validación 404:**
```javascript
if (error.response?.status === 404) {
  toast.error('❌ Recurso no encontrado.');
  navigate('/canchas');
}
```

---

### 💥 Códigos de Error del Servidor (5xx)

| Código | Descripción | Uso en la Aplicación |
|--------|-------------|---------------------|
| **500** | Internal Server Error | Error interno del servidor, error de base de datos |

**Ejemplo de validación 500:**
```javascript
if (error.response?.status === 500) {
  toast.error('💥 Error en el servidor. Intenta más tarde.');
  console.error('Error del servidor:', error.response.data);
}
```

---

### 🌐 Errores de Red

| Tipo | Descripción | Manejo |
|------|-------------|--------|
| **Network Error** | Sin conexión al servidor | Mensaje informativo, verificar conexión |
| **ECONNABORTED** | Timeout (>10 segundos) | Mensaje de timeout, opción de reintentar |

**Código completo de validación:**
```javascript
// Archivo: /frontend/sistemareservas/src/api/axios.js
instance.interceptors.response.use(
  (response) => {
    // ✅ Respuestas exitosas (200-299)
    console.log(`✅ Response: ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    // ❌ Manejo de errores
    
    // Error de timeout
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: La petición tardó demasiado');
      toast.error('La solicitud tardó demasiado. Verifica tu conexión.');
    } 
    // Error de red
    else if (error.message === 'Network Error') {
      console.error('🌐 Network Error: No se puede conectar al servidor');
      console.error(`Verifica que el backend esté corriendo en: http://${LOCAL_IP}:3000`);
      toast.error('No se puede conectar al servidor. Verifica tu conexión.');
    } 
    // Errores HTTP
    else if (error.response) {
      const status = error.response.status;
      const mensaje = error.response.data?.message || 'Error desconocido';
      
      switch(status) {
        case 400:
          toast.error(mensaje);
          break;
        case 401:
          toast.error('🔒 Sesión expirada. Inicia sesión nuevamente.');
          break;
        case 403:
          toast.error('⛔ No tienes permisos para esta acción.');
          break;
        case 404:
          toast.error('❌ Recurso no encontrado.');
          break;
        case 500:
          toast.error('💥 Error del servidor. Intenta más tarde.');
          break;
        default:
          toast.error(`Error ${status}: ${mensaje}`);
      }
    } 
    // Error desconocido
    else {
      console.error('❌ Error desconocido:', error.message);
      toast.error('Error desconocido. Intenta nuevamente.');
    }
    
    return Promise.reject(error);
  }
);
```

---

## 6. Gestión de Errores en la App Móvil

### 6.1 Errores de Red

**Descripción:** El dispositivo móvil no puede conectarse al servidor backend.

**Causas comunes:**
- Backend no está corriendo
- IP local incorrecta en la configuración
- Dispositivo no está en la misma red WiFi que el servidor
- Firewall bloqueando la conexión

**Manejo implementado:**
```javascript
// Detección automática de error de red
if (error.message === 'Network Error') {
  console.error('🌐 Network Error: No se puede conectar al servidor');
  console.error(`Verifica que el backend esté corriendo en: http://${LOCAL_IP}:3000`);
  
  // Mostrar mensaje al usuario
  toast.error(
    'No se puede conectar al servidor. Verifica:\n' +
    '1. Backend corriendo\n' +
    '2. Misma red WiFi\n' +
    '3. IP correcta en configuración',
    { duration: 5000 }
  );
}
```

**Soluciones:**
1. Verificar que el backend esté corriendo: `npm run dev`
2. Confirmar la IP local del servidor
3. Asegurar que el dispositivo móvil y el servidor estén en la misma red
4. Verificar la configuración en `/frontend/sistemareservas/src/api/axios.js`

---

### 6.2 Respuestas 4xx (Errores del Cliente)

#### Error 400 - Bad Request

**Causas:**
- Datos de formulario inválidos
- Validaciones no cumplidas (cédula, email, contraseña)
- Conflicto de horarios en reservas
- Datos duplicados (email, username, cédula)

**Manejo implementado:**
```javascript
if (error.response?.status === 400) {
  // Obtener mensaje específico del backend
  const mensaje = error.response.data.message;
  
  // Mostrar mensaje al usuario
  toast.error(mensaje);
  
  // Ejemplos de mensajes:
  // "El correo ya está registrado"
  // "La cédula debe tener exactamente 10 dígitos numéricos"
  // "⛔ Ya existe una reserva en ese horario"
  // "❌ La hora de cierre debe ser posterior a la hora de apertura"
}
```

**Validaciones frontend que previenen 400:**
```javascript
// Validación de email (Gmail)
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
if (!gmailRegex.test(email)) {
  setError("Debe ser un correo de Gmail válido");
  return;
}

// Validación de cédula (10 dígitos)
const cedulaRegex = /^[0-9]{10}$/;
if (!cedulaRegex.test(cedula)) {
  setError("La cédula debe tener exactamente 10 dígitos");
  return;
}

// Validación de contraseña (8-20 caracteres, 1 mayúscula, 1 número, 1 símbolo)
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
if (!passwordRegex.test(password)) {
  setError("La contraseña debe tener entre 8 y 20 caracteres...");
  return;
}

// Validación de horarios
if (horaInicio >= horaFin) {
  toast.error("La hora de fin debe ser posterior a la hora de inicio");
  return;
}
```

---

#### Error 401 - Unauthorized

**Causas:**
- Token JWT expirado (después de 1 día)
- Token inválido o manipulado
- Cookie de sesión eliminada
- No se envió el token

**Manejo implementado:**
```javascript
// En el middleware de autenticación
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: "No token, autorización denegada" 
    });
  }
  
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        message: "Token no válido" 
      });
    }
    req.user = user;
    next();
  });
};

// En la app móvil
if (error.response?.status === 401) {
  // Limpiar sesión local
  Cookies.remove("token");
  setIsAuthenticated(false);
  setUser(null);
  
  // Mostrar mensaje
  toast.error('🔒 Sesión expirada. Inicia sesión nuevamente.');
  
  // Redirigir a login
  navigate('/login');
}
```

**Prevención:**
```javascript
// Verificar token al cargar la app
useEffect(() => {
  async function checkLogin() {
    const cookies = Cookies.get();
    
    if (!cookies.token) {
      setIsAuthenticated(false);
      return;
    }
    
    try {
      const res = await obtenerPerfil();
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (error) {
      // Token inválido
      setIsAuthenticated(false);
      Cookies.remove("token");
    }
  }
  checkLogin();
}, []);
```

---

#### Error 403 - Forbidden

**Causas:**
- Usuario sin rol de administrador intenta acceder a rutas admin
- Permisos insuficientes para la operación

**Manejo implementado:**
```javascript
// Backend - Middleware de verificación de rol admin
export const isAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({
      success: false,
      message: "⛔ Acceso denegado. Solo administradores."
    });
  }
  next();
};

// Frontend - Protección de rutas
useEffect(() => {
  if (!isAuthenticated) {
    navigate("/login");
    return;
  }
  
  if (user?.rol !== 'admin') {
    toast.error("No tienes permisos de administrador");
    navigate("/sala");
    return;
  }
}, [isAuthenticated, user, navigate]);
```

---

#### Error 404 - Not Found

**Causas:**
- ID de cancha/reserva no existe en la base de datos
- Recurso fue eliminado
- ID inválido (formato incorrecto)

**Manejo implementado:**
```javascript
// Backend
const cancha = await Cancha.findById(req.params.id);

if (!cancha) {
  return res.status(404).json({
    success: false,
    message: "❌ Cancha no encontrada."
  });
}

// Frontend
if (error.response?.status === 404) {
  toast.error('❌ Recurso no encontrado.');
  navigate('/canchas'); // Redirigir a lista
}
```

---

### 6.3 Respuestas 5xx (Errores del Servidor)

#### Error 500 - Internal Server Error

**Causas:**
- Error en la base de datos (MongoDB desconectado)
- Error en el código del servidor
- Falta de manejo de excepciones

**Manejo implementado:**
```javascript
// Backend - Try-catch en todos los controladores
export const obtenerCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.find();
    return res.status(200).json({
      success: true,
      data: canchas
    });
  } catch (error) {
    // Capturar errores del servidor
    console.error("Error en obtenerCanchas:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error al obtener las canchas.",
      error: error.message
    });
  }
};

// Frontend
if (error.response?.status === 500) {
  toast.error('💥 Error en el servidor. Intenta más tarde.');
  console.error('Detalles del error:', error.response.data);
}
```

---

### 6.4 Datos Inválidos o Vacíos

**Prevención con React Hook Form:**
```javascript
const { register, handleSubmit, formState: { errors } } = useForm();

// Campo requerido
<input
  type="text"
  {...register("nombre", { 
    required: "El nombre es requerido" 
  })}
/>

// Validación de formato
<input
  type="email"
  {...register("email", { 
    required: "El correo es requerido",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      message: "Debe ser un correo de Gmail válido"
    }
  })}
/>

// Validación personalizada
<input
  type="text"
  {...register("cedula", { 
    required: "La cédula es requerida",
    validate: value => {
      if (!/^[0-9]{10}$/.test(value)) {
        return "La cédula debe tener exactamente 10 dígitos";
      }
      return true;
    }
  })}
/>

// Mostrar errores
{errors.nombre && (
  <p className='text-red-900 text-sm'>{errors.nombre.message}</p>
)}
```

**Validación backend:**
```javascript
export const register = async (req, res) => {
  const { email, username, password, nombre, apellido, cedula } = req.body;
  
  // Validar campos vacíos
  if (!email || !username || !password || !nombre || !apellido || !cedula) {
    return res.status(400).json({
      success: false,
      message: "Todos los campos son obligatorios"
    });
  }
  
  // Validar formato
  const cedulaRegex = /^[0-9]{10}$/;
  if (!cedulaRegex.test(cedula)) {
    return res.status(400).json({
      success: false,
      message: "La cédula debe tener exactamente 10 dígitos numéricos"
    });
  }
  
  // ... más validaciones
};
```

---

### 6.5 Mensajes Visuales al Usuario

**Implementación con React Toastify:**
```javascript
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tipos de mensajes

// ✅ Éxito
toast.success("✅ Reserva creada exitosamente");

// ❌ Error
toast.error("❌ Error al crear la reserva");

// ⚠️ Advertencia
toast.warning("⚠️ Por favor completa todos los campos");

// ℹ️ Información
toast.info("ℹ️ Cargando datos...");

// Configuración personalizada
toast.error("Error de conexión", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
});

// Componente en el JSX (al final de cada página)
<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
/>
```

**Indicadores de carga:**
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await crearReserva(data);
    toast.success("✅ Reserva creada");
  } catch (error) {
    toast.error("❌ Error al crear reserva");
  } finally {
    setLoading(false);
  }
};

// En el JSX
{loading ? (
  <div className="flex items-center justify-center">
    <div className="spinner"></div>
    <p>Procesando...</p>
  </div>
) : (
  <button type="submit">Confirmar</button>
)}
```

---

## 7. Diferencias entre Consumir la API desde Web y desde Móvil

### 7.1 Configuración de URL Base

**Web (localhost funciona):**
```javascript
// En desarrollo web
const baseURL = 'http://localhost:3000/api';

// Las solicitudes van a:
// http://localhost:3000/api/login
// http://localhost:3000/api/canchas
```

**Móvil (necesita IP de red local):**
```javascript
// En aplicación móvil (Capacitor/React Native)
const LOCAL_IP = '192.168.0.133'; // IP de tu computadora
const baseURL = `http://${LOCAL_IP}:3000/api`;

// Las solicitudes van a:
// http://192.168.0.133:3000/api/login
// http://192.168.0.133:3000/api/canchas
```

**Implementación adaptativa:**
```javascript
// Archivo: /frontend/sistemareservas/src/api/axios.js

// Detectar si estamos en la app móvil (Capacitor)
const isCapacitor = () => {
  return window.Capacitor !== undefined;
};

// Configurar la URL base según el entorno
const getBaseURL = () => {
  if (isCapacitor()) {
    // En móvil, usar la IP de tu computadora
    console.log('📱 Ejecutando en móvil');
    return `http://${LOCAL_IP}:3000/api`;
  } else {
    // En web, usar localhost
    console.log('🌐 Ejecutando en web');
    return 'http://localhost:3000/api';
  }
};

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000,
});
```

**¿Cómo encontrar tu IP local?**

Windows:
```bash
ipconfig
# Buscar: IPv4 Address . . . : 192.168.0.133
```

Mac/Linux:
```bash
ifconfig
# Buscar: inet 192.168.0.133
```

---

### 7.2 Manejo de Cookies

**Web:**
```javascript
// Las cookies funcionan automáticamente en navegadores web
// Solo necesitamos configurar withCredentials: true

axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,  // ✅ Suficiente para web
});

// Backend establece cookie automáticamente
res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
});

// El navegador envía la cookie automáticamente en cada request
```

**Móvil:**
```javascript
// En aplicaciones móviles nativas, las cookies pueden no funcionar igual

// Opción 1: Usar cookies (puede requerir configuración adicional)
axios.create({
  baseURL: `http://${LOCAL_IP}:3000/api`,
  withCredentials: true,
});

// Opción 2: Almacenar token manualmente (más confiable)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Guardar token
await AsyncStorage.setItem('token', token);

// Enviar token en header Authorization
axios.create({
  baseURL: `http://${LOCAL_IP}:3000/api`,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Backend debe aceptar header Authorization
const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
```

---

### 7.3 Configuración CORS

**Web:**
```javascript
// Backend - app.js
app.use(cors({
  origin: 'http://localhost:3001',  // Origen del frontend web
  credentials: true,
}));
```

**Móvil:**
```javascript
// Backend - app.js
app.use(cors({
  origin: [
    'http://localhost:3001',           // Desarrollo web
    'capacitor://localhost',           // Capacitor iOS
    'http://localhost',                // Capacitor Android
    `http://${LOCAL_IP}:3001`,        // Red local web
    'ionic://localhost',               // Ionic
    'http://localhost:8100',           // Ionic serve
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
```

**Diferencias clave:**
- Web: Un solo origen (`http://localhost:3001`)
- Móvil: Múltiples orígenes posibles (`capacitor://`, `ionic://`, IP local)

---

### 7.4 Permisos de Red

**Web:**
```
✅ No requiere permisos especiales
✅ El navegador maneja automáticamente las solicitudes HTTP
```

**Móvil (Capacitor/React Native):**
```xml
<!-- Android: AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- iOS: Info.plist -->
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

---

### 7.5 Debugging y Logs

**Web:**
```javascript
// Consola del navegador (F12)
console.log('📡 Request:', config);
console.log('✅ Response:', response);

// Network tab muestra todas las solicitudes
// Chrome DevTools / Firefox Developer Tools
```

**Móvil:**
```javascript
// Logs en la terminal (react-native log-android / log-ios)
console.log('📱 Request móvil:', config);

// React Native Debugger
// Flipper (herramienta de debugging)
// Logs del dispositivo (Logcat para Android, Console para iOS)

// Más difícil de debuggear que en web
```

---

### 7.6 Almacenamiento Local

**Web:**
```javascript
// LocalStorage (persiste)
localStorage.setItem('canchas', JSON.stringify(canchas));
const canchas = JSON.parse(localStorage.getItem('canchas'));

// SessionStorage (solo durante la sesión)
sessionStorage.setItem('user', JSON.stringify(user));

// Cookies
document.cookie = "token=abc123";
```

**Móvil:**
```javascript
// AsyncStorage (React Native)
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('canchas', JSON.stringify(canchas));
const canchas = JSON.parse(await AsyncStorage.getItem('canchas'));

// SecureStorage (datos sensibles)
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', token);
const token = await SecureStore.getItemAsync('token');
```

---

### 7.7 Tiempo de Respuesta

**Web:**
```
Promedio: 100-300ms
Conexión: Estable (WiFi/Ethernet)
Latencia: Baja
```

**Móvil:**
```
Promedio: 200-500ms (puede variar mucho)
Conexión: Variable (WiFi/4G/5G)
Latencia: Puede ser alta
Necesita: Manejo robusto de errores de red
```

---

### 7.8 Timeout

**Web:**
```javascript
// Puede ser más permisivo
axios.create({
  timeout: 5000, // 5 segundos
});
```

**Móvil:**
```javascript
// Necesita ser más tolerante (conexión variable)
axios.create({
  timeout: 10000, // 10 segundos
});
```

---

### 7.9 Manejo de Imágenes

**Web:**
```javascript
// URLs relativas funcionan
<img src="/uploads/cancha.jpg" alt="Cancha" />

// Se resuelve a:
// http://localhost:3000/uploads/cancha.jpg
```

**Móvil:**
```javascript
// Necesita URL completa
<img 
  src={`http://${LOCAL_IP}:3000/uploads/cancha.jpg`} 
  alt="Cancha" 
/>

// O configurar un proxy/transformación de URLs
const imageUrl = cancha.fotos[0].startsWith('http') 
  ? cancha.fotos[0] 
  : `http://${LOCAL_IP}:3000${cancha.fotos[0]}`;
```

---

### 7.10 Resumen de Diferencias

| Aspecto | Web | Móvil |
|---------|-----|-------|
| **URL Base** | `localhost:3000` | `192.168.x.x:3000` (IP local) |
| **Cookies** | Automáticas | Requieren configuración adicional |
| **CORS** | Un origen | Múltiples orígenes |
| **Permisos** | No requiere | Requiere permisos de red (manifest) |
| **Debugging** | Fácil (DevTools) | Más complejo (logs del dispositivo) |
| **Almacenamiento** | localStorage/sessionStorage | AsyncStorage/SecureStorage |
| **Latencia** | Baja (100-300ms) | Variable (200-500ms+) |
| **Timeout** | 5 segundos OK | 10+ segundos recomendado |
| **Imágenes** | URLs relativas | URLs absolutas con IP |
| **Conexión** | Estable | Variable (WiFi/móvil) |

---

## 8. Mejoras para Fortalecer la Experiencia del Usuario en Caso de Error

### 8.1 Mensajes de Error Más Descriptivos y Accionables

**❌ Actual (genérico):**
```javascript
toast.error("Error al crear la reserva");
```

**✅ Mejorado (descriptivo y accionable):**
```javascript
if (error.response?.status === 400) {
  const mensaje = error.response.data.message;
  
  // Mensaje específico del backend
  if (mensaje.includes("Ya existe una reserva")) {
    toast.error(
      "⛔ Este horario ya está ocupado.\n" +
      "💡 Intenta seleccionar otro horario disponible.",
      {
        duration: 5000,
        action: {
          label: 'Ver Disponibilidad',
          onClick: () => cargarDisponibilidad()
        }
      }
    );
  }
}
```

---

### 8.2 Retry Automático en Caso de Fallo Temporal

**Implementación con axios-retry:**
```javascript
import axiosRetry from 'axios-retry';

// Configurar reintentos automáticos
axiosRetry(instance, {
  retries: 3,                          // Máximo 3 reintentos
  retryDelay: axiosRetry.exponentialDelay,  // Espera incremental
  retryCondition: (error) => {
    // Reintentar solo en casos específicos
    return error.code === 'ECONNABORTED'       // Timeout
        || error.code === 'ENOTFOUND'          // DNS error
        || error.response?.status === 503;     // Service Unavailable
  },
  onRetry: (retryCount, error, requestConfig) => {
    console.log(`🔄 Reintentando (${retryCount}/3)...`);
    toast.info(`Reintentando conexión... (${retryCount}/3)`);
  }
});
```

**Beneficio:**
- El usuario no necesita hacer nada
- La app automáticamente reintenta 3 veces
- Solo muestra error si todos los intentos fallan

---

### 8.3 Modo Offline / Cache de Datos

**Implementación:**
```javascript
// Guardar canchas en caché cuando se obtienen
const cargarCanchas = async () => {
  try {
    const res = await obtenerCanchas();
    const canchas = res.data.data;
    
    // Guardar en localStorage
    localStorage.setItem('canchas_cache', JSON.stringify(canchas));
    localStorage.setItem('canchas_cache_time', Date.now());
    
    setCanchas(canchas);
  } catch (error) {
    // Si falla la conexión, usar datos en caché
    if (error.message === 'Network Error') {
      const cachedCanchas = localStorage.getItem('canchas_cache');
      const cacheTime = localStorage.getItem('canchas_cache_time');
      
      if (cachedCanchas) {
        const minutosDesdeCache = (Date.now() - cacheTime) / 1000 / 60;
        
        setCanchas(JSON.parse(cachedCanchas));
        
        toast.warning(
          `📡 Sin conexión. Mostrando datos guardados ` +
          `(hace ${Math.round(minutosDesdeCache)} minutos)`,
          { duration: 5000 }
        );
      } else {
        toast.error('Sin conexión y no hay datos guardados.');
      }
    }
  }
};
```

**Beneficio:**
- Usuario puede ver información incluso sin conexión
- Datos se actualizan cuando hay conexión
- Experiencia más fluida

---

### 8.4 Indicadores de Carga (Loading States)

**❌ Sin indicador:**
```javascript
// Usuario no sabe si algo está pasando
const handleLogin = async () => {
  await iniciosesion(credentials);
};
```

**✅ Con indicador:**
```javascript
const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  setLoading(true);
  
  try {
    await iniciosesion(credentials);
    toast.success("✅ Inicio de sesión exitoso");
  } catch (error) {
    toast.error("❌ Error al iniciar sesión");
  } finally {
    setLoading(false);
  }
};

// En el JSX
<button 
  type="submit" 
  disabled={loading}
  className={loading ? 'opacity-50 cursor-not-allowed' : ''}
>
  {loading ? (
    <div className="flex items-center gap-2">
      <div className="spinner"></div>
      <span>Iniciando sesión...</span>
    </div>
  ) : (
    'Iniciar sesión'
  )}
</button>
```

**Spinner animado (CSS):**
```css
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

### 8.5 Validación en Tiempo Real

**❌ Validación solo al enviar:**
```javascript
// Usuario solo ve errores después de enviar el formulario
const handleSubmit = () => {
  if (!email.includes('@')) {
    toast.error("Email inválido");
    return;
  }
  // ...
};
```

**✅ Validación en tiempo real:**
```javascript
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');

const validateEmail = (value) => {
  if (!value) {
    setEmailError('El email es requerido');
  } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
    setEmailError('Debe ser un correo de Gmail válido');
  } else {
    setEmailError(''); // ✅ Email válido
  }
};

<input
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }}
  className={emailError ? 'border-red-500' : 'border-gray-300'}
/>

{emailError && (
  <p className="text-red-600 text-sm mt-1">
    ❌ {emailError}
  </p>
)}

{!emailError && email && (
  <p className="text-green-600 text-sm mt-1">
    ✅ Email válido
  </p>
)}
```

---

### 8.6 Confirmaciones antes de Acciones Destructivas

**❌ Sin confirmación:**
```javascript
const handleEliminar = async (id) => {
  await eliminarReserva(id);
};
```

**✅ Con confirmación:**
```javascript
const handleEliminar = async (id, nombreCancha, fecha) => {
  // Confirmación personalizada
  const confirmar = window.confirm(
    `¿Estás seguro de cancelar tu reserva?\n\n` +
    `Cancha: ${nombreCancha}\n` +
    `Fecha: ${formatearFecha(fecha)}\n\n` +
    `Esta acción no se puede deshacer.`
  );
  
  if (!confirmar) return;
  
  try {
    await eliminarReserva(id);
    toast.success("✅ Reserva cancelada exitosamente");
    cargarReservas(); // Actualizar lista
  } catch (error) {
    toast.error("❌ Error al cancelar la reserva");
  }
};
```

**Mejor: Modal personalizado:**
```javascript
const [showConfirmModal, setShowConfirmModal] = useState(false);
const [reservaToDelete, setReservaToDelete] = useState(null);

const handleEliminar = (reserva) => {
  setReservaToDelete(reserva);
  setShowConfirmModal(true);
};

const confirmarEliminacion = async () => {
  try {
    await eliminarReserva(reservaToDelete._id);
    toast.success("✅ Reserva cancelada exitosamente");
    setShowConfirmModal(false);
    cargarReservas();
  } catch (error) {
    toast.error("❌ Error al cancelar la reserva");
  }
};

// Modal de confirmación
{showConfirmModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>¿Cancelar reserva?</h3>
      <p>Cancha: {reservaToDelete.cancha.nombre}</p>
      <p>Fecha: {formatearFecha(reservaToDelete.fecha)}</p>
      <p>Horario: {reservaToDelete.horaInicio} - {reservaToDelete.horaFin}</p>
      
      <div className="modal-actions">
        <button onClick={() => setShowConfirmModal(false)}>
          No, mantener
        </button>
        <button onClick={confirmarEliminacion} className="btn-danger">
          Sí, cancelar reserva
        </button>
      </div>
    </div>
  </div>
)}
```

---

### 8.7 Estados Vacíos Informativos

**❌ Lista vacía sin contexto:**
```javascript
{reservas.length === 0 && <p>No hay reservas</p>}
```

**✅ Estado vacío informativo:**
```javascript
{reservas.length === 0 && (
  <div className="empty-state">
    <FaCalendarAlt className="icon-large text-gray-400" />
    <h3 className="text-xl font-bold mt-4">No tienes reservas</h3>
    <p className="text-gray-600 mt-2">
      ¡Reserva tu primera cancha y empieza a jugar!
    </p>
    <Link to="/canchas">
      <button className="btn-primary mt-4">
        Explorar Canchas Disponibles
      </button>
    </Link>
  </div>
)}
```

---

### 8.8 Sugerencias Inteligentes en Errores

**❌ Error sin contexto:**
```javascript
toast.error("Horario no disponible");
```

**✅ Error con sugerencias:**
```javascript
if (error.response?.data?.message?.includes("Ya existe una reserva")) {
  // Obtener horarios sugeridos
  const horariosSugeridos = await obtenerDisponibilidad(canchaId, fecha);
  
  if (horariosSugeridos.length > 0) {
    toast.error(
      `⛔ Este horario está ocupado.\n\n` +
      `💡 Horarios disponibles:\n` +
      horariosSugeridos.slice(0, 3).map(h => 
        `• ${h.horaInicio} - ${h.horaFin}`
      ).join('\n'),
      { duration: 7000 }
    );
  } else {
    toast.error(
      `⛔ Este horario está ocupado.\n` +
      `😢 No hay más horarios disponibles hoy.\n\n` +
      `💡 Intenta seleccionar otra fecha.`
    );
  }
}
```

---

### 8.9 Feedback Inmediato en Acciones

**❌ Sin feedback:**
```javascript
const handleReservar = async () => {
  await crearReserva(data);
  navigate('/sala');
};
```

**✅ Con feedback progresivo:**
```javascript
const handleReservar = async () => {
  // 1. Mostrar loading
  setLoading(true);
  toast.info('📝 Procesando tu reserva...');
  
  try {
    // 2. Crear reserva
    const res = await crearReserva(data);
    
    // 3. Success con detalles
    toast.success(
      `✅ ¡Reserva confirmada!\n\n` +
      `Cancha: ${cancha.nombre}\n` +
      `Fecha: ${formatearFecha(fecha)}\n` +
      `Horario: ${horaInicio} - ${horaFin}\n` +
      `Total: $${calcularTotal()}`,
      { duration: 5000 }
    );
    
    // 4. Redirigir después de un momento (para que lean el mensaje)
    setTimeout(() => {
      navigate('/sala');
    }, 2000);
    
  } catch (error) {
    toast.error('❌ Error al crear la reserva');
  } finally {
    setLoading(false);
  }
};
```

---

## Conclusiones

✅ **Integración exitosa** de la aplicación móvil con el backend REST mediante Axios

✅ **Validación de comunicación** cliente-servidor con todos los endpoints principales

✅ **Manejo robusto de errores** implementado:
- Errores de red (Network Error, Timeout)
- Errores 4xx (400, 401, 403, 404)
- Errores 5xx (500)
- Validación de datos inválidos

✅ **Documentación técnica completa** con ejemplos y capturas de pantalla

✅ **Control de versiones** con Git y repositorio en GitHub

✅ **Evidencia funcional** del consumo de la API REST en todos los módulos principales

---

**Elaborado por:** [Boris Israel Rengel Japón, José Fermin Encalada Leiva]  
**Fecha:** 05 de febrero de 2026  
**Asignatura:** Desarrollo Basado en Plataformas  
**Práctica:** APE-007
