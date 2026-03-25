CREATE DATABASE usiers;
USE usiers;

-- =========================
-- USERS (All Roles)
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('SHOPKEEPER', 'STAFF', 'NGO', 'ADMIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCTS
-- =========================
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    unit VARCHAR(50),
    shopkeeper_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (shopkeeper_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- =========================
-- BATCHES (Expiry handled here)
-- =========================
CREATE TABLE batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    batch_number VARCHAR(100),
    quantity INT NOT NULL,
    expiry_date DATE NOT NULL,
    purchase_date DATE,
    status ENUM('ACTIVE', 'EXPIRED', 'DONATED') DEFAULT 'ACTIVE',
    FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
);

-- =========================
-- SALES
-- =========================
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity_sold INT NOT NULL,
    sale_date DATE,
    staff_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (staff_id) REFERENCES users(id)
);


-- =========================
-- ALERTS (Expiry / Low Stock)
-- =========================
CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    alert_type ENUM('EXPIRY', 'LOW_STOCK') NOT NULL,
    message VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- =========================
-- DONATIONS
-- =========================
CREATE TABLE donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT NOT NULL,
    shopkeeper_id INT NOT NULL,
    ngo_id INT,
    status ENUM('PENDING', 'ACCEPTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    FOREIGN KEY (batch_id) REFERENCES batches(id),
    FOREIGN KEY (shopkeeper_id) REFERENCES users(id),
    FOREIGN KEY (ngo_id) REFERENCES users(id)
);
