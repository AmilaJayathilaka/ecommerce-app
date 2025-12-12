import pool from "../../config/database.js";

export const getAllProductsDB = async () => {
  const result = await pool.query(`SELECT * FROM "PRODUCTS"`);
  return result.rows;
};
