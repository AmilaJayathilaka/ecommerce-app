CREATE DATABASE "ECOMMERCE";

CREATE TABLE "ORDERS" (
    "id" SERIAL PRIMARY KEY,
    "orderDescription" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "PRODUCTS" (
    "id" INT PRIMARY KEY,
    "productName" VARCHAR(100) NOT NULL,
    "productDescription" TEXT
);

CREATE TABLE "OrderProductMap" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INT NOT NULL,
    "productId" INT NOT NULL,
    FOREIGN KEY ("orderId") REFERENCES "ORDERS"(id) ON DELETE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "PRODUCTS"(id) ON DELETE CASCADE
);

INSERT INTO "PRODUCTS" ("id", "productName", "productDescription")
VALUES
(1, 'HP laptop', 'This is HP laptop'),
(2, 'lenovo laptop', 'This is lenovo'),
(3, 'Car', 'This is Car'),
(4, 'Bike', 'This is Bike');
