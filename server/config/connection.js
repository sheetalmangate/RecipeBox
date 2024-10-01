import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || "",
      process.env.DB_USER || "",
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectOptions: {
          decimalNumbers: true,
        },
        logging: false, ///////////   set to true to see the SQL queries
      },
    );

export default sequelize;
