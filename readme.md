# 🛍️ Ecommerce Perfumes API

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-Educational-informational)

Backend de un ecommerce de perfumes desarrollado con **Node.js**, **Express** y **Sequelize**, utilizando **SQLite** como base de datos.

Proyecto colaborativo orientado a simular una API real para gestión de usuarios, productos y órdenes.

---

## 🚀 Tecnologías utilizadas

- Node.js  
- Express  
- Sequelize  
- SQLite  
- JSON Web Token (JWT)  
- CORS  

---

## 📦 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Eze-Nat/ecommercePerfumesAPI.git
cd ecommercePerfumesAPI
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Cargar datos iniciales (Seed)

Este proyecto incluye un script para cargar los productos en la base de datos:


```bash
npm run seed
```

Esto creará la base SQLite local y cargará automáticamente los productos.

### 4️⃣ Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000
```

---

## 🔐 Autenticación

El proyecto utiliza **JWT** para proteger rutas privadas.

### Registro

```
POST /api/auth/register
```

### Login

```
POST /api/auth/login
```

El login devuelve un token que debe enviarse en los headers:

```
Authorization: Bearer TU_TOKEN
```

---

## 📌 Endpoints principales

### 🧴 Productos (públicos)

```
GET /api/products
GET /api/products/:id
```

### 👤 Usuarios (requiere token)

```
GET /api/users
```

### 🛒 Órdenes (requiere token)

```
POST /api/order
GET /api/order
```

---

## 🧪 Cómo probar con Postman

### 1️⃣ Obtener token

Hacer `POST` a:

```
http://localhost:3000/api/auth/login
```

Copiar el token recibido.

### 2️⃣ Agregar token en Headers

En Postman:

**Key:**

```
Authorization
```

**Value:**

```
Bearer TU_TOKEN
```

### 3️⃣ Probar endpoints protegidos

Ejemplo:

```
GET http://localhost:3000/api/users
```

---



## 🧠 Notas importantes

- La base de datos es local (SQLite).
- Si se elimina el archivo `.sqlite`, es necesario volver a ejecutar el seed.
- Proyecto con fines educativos y simulación de entorno real de ecommerce backend.
- Arquitectura modular siguiendo buenas prácticas básicas.

---

## 👥 Trabajo colaborativo

Proyecto desarrollado en equipo como práctica de:

- Arquitectura backend modular  
- Autenticación con JWT  
- Relaciones entre modelos con Sequelize  
- Manejo de base de datos relacional  
- Simulación de entorno ecommerce real  

---

## 📌 Estado del proyecto

✔️ CRUD de productos  
✔️ Autenticación con JWT  
✔️ Gestión de órdenes  
✔️ Seed automático de datos  
✔️ Arquitectura escalable  
✔️ Protección de rutas por roles  

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

PORT=3000
JWT_SECRET=tu_clave_secreta

---

## 📄 Licencia

Proyecto con fines educativos.

---

💡 Desarrollado como práctica de backend moderno con Node.js y Sequelize.