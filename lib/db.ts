import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  max: 10,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 5000,
});
const adapter = new PrismaPg(pool);

export const db = new PrismaClient({ adapter });
