import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,  // Prisma 7 вимагає URL тут
  },
});
