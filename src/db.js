import { Sequelize } from "sequelize";
import { DB_TYPE, DB_STORAGE } from "./config.js";

let sequelize;

if (process.env.DATABASE_URL) {
  // Producción (Render - PostgreSQL)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    define: {
      timestamps: false,
    },
  });
} else {
  // Desarrollo local (SQLite)
  sequelize = new Sequelize({
    dialect: DB_TYPE,
    storage: DB_STORAGE,
    logging: true,
    define: {
      timestamps: false,
    },
  });
}

export { sequelize };
