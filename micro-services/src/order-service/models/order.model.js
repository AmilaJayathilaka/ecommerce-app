import pool from "../../config/database.js";

export const getAllOrdersDB = async () => {
  const result = await pool.query(`SELECT * FROM "ORDERS"`);
  return result.rows;
};

export const getOrdersByIdDB = async (id) => {
  const result = await pool.query(`SELECT * FROM "ORDERS" WHERE id=$1`, [id]);
  return result.rows[0];
};

export const getOrderProductsDB = async (id) => {
  const result = await pool.query(
    `SELECT p.id, p."productName", p."productDescription"
     FROM "OrderProductMap" opm
     JOIN "PRODUCTS" p ON p.id = opm."productId"
     WHERE opm."orderId"=$1`,
     [id]
  );
  return result.rows;
};

export const createOrderDB = async (orderDescription, products) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert order
    const orderRes = await client.query(
      `INSERT INTO "ORDERS" ("orderDescription", "createdAt") VALUES ($1, NOW()) RETURNING *`,
      [orderDescription]
    );
    const order = orderRes.rows[0];
    const orderId = order.id;

    // Insert into OrderProductMap
    for (const productId of products) {
      await client.query(
        'INSERT INTO "OrderProductMap" ("orderId","productId") VALUES ($1,$2)',
        [orderId, productId]
      );
    }

    await client.query('COMMIT');
    return order;

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;

  } finally {
    client.release();
  }
};

export const updateOrderByIdDB = async (id, orderDescription, products) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    //update order description
    const updatedRes = await client.query(
      `UPDATE "ORDERS" SET "orderDescription"=$1 WHERE "id"=$2 RETURNING *`,
      [orderDescription, id]
    );
    if (updatedRes.rows.length === 0) {
      throw Error("Order not found");
    }

    //delete existing OrderProductMap table data for orderId
    await pool.query(`DELETE FROM "OrderProductMap" WHERE "orderId"=$1 RETURNING *`, [id]);

    //insert new OrderProductMap records
    for (const productId of products) {
      await client.query(
        'INSERT INTO "OrderProductMap" ("orderId","productId") VALUES ($1,$2)',
        [id, productId]
      );
    }

    await client.query('COMMIT');
    return updatedRes.rows[0];

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;

  } finally {
    client.release();
  }
};

export const deleteOrderByIdDB = async (id) => {
  const result = await pool.query(`DELETE FROM "ORDERS" WHERE "id"=$1 RETURNING *`, [id]);
  return result.rows[0];
};
