import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const DB_TYPE = process.env.DB_TYPE || "sqlite";
export const DB_STORAGE = process.env.DB_STORAGE || "./database.sqlite";

export const JWT_SECRET = process.env.JWT_SECRET;
