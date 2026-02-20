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
import { verifyRole } from "./auth/roles.middleware.js";

// 👇 IMPORTAR MODELO
import Product from "./models/Product.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
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

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", verifyToken, orderRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/orderItems", verifyToken, orderItemRoutes);
app.use("/api/roles", verifyToken, roleRoutes);

async function main() {
  try {
    await sequelize.sync();

    const count = await Product.count();

    if (count === 0) {
      console.log("Seeding products...");

      const { default: seedProducts } = await import("../scripts/initialProducts.js");
      await seedProducts();

      console.log("Seed completed");
    }

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error("Error en la inicialización:", error.message);
  }
}
main();