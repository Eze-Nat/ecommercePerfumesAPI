import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/relations.js";

import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import roleRoutes from "./routes/role.routes.js";
import orderItemRoutes from "./routes/orderItem.routes.js";
import authRoutes from "./routes/auth.routes.js";

import cors from "cors";

import { verifyToken } from "./auth/auth.middleware.js";

// 👇 MODELOS
import Product from "./models/Product.js";
import Role from "./models/Role.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 🌐 CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://eccomerce-perfumes.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// 🚀 RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", verifyToken, orderRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/orderItems", verifyToken, orderItemRoutes);
app.use("/api/roles", verifyToken,roleRoutes);

// 🔥 MAIN
async function main() {
  try {
    await sequelize.sync();

    // 🧠 SEED ROLES (PRIMERO)
    const rolesCount = await Role.count();

    if (rolesCount === 0) {
      console.log("Seeding roles...");

      await Role.bulkCreate([
        { id: 1, name: "admin", description: "Administrador" },
        { id: 2, name: "user", description: "Usuario estándar" },
      ]);

      console.log("Roles seeded");
    }

    // 🧴 SEED PRODUCTS
    const productsCount = await Product.count();

    if (productsCount === 0) {
      console.log("Seeding products...");

      const { default: seedProducts } = await import("../scripts/initialProducts.js");
      await seedProducts();

      console.log("Products seeded");
    }

    // 🚀 SERVER
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error en la inicialización:", error.message);
  }
}

main();