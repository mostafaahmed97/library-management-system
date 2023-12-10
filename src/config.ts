import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT,
  db: {
    type: process.env.DB_TYPE as string,
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    port: process.env.DB_PORT as string,
    database: process.env.DB_DATABASE as string,
  },
};
