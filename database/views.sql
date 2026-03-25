USE usiers;

-- =========================
-- View 1: Products Expiring Soon (≤ 15 days)
-- =========================
CREATE OR REPLACE VIEW expiring_soon_products AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    b.batch_number,
    b.expiry_date,
    DATEDIFF(b.expiry_date, CURDATE()) AS days_remaining,
    b.quantity
FROM batches b
JOIN products p ON b.product_id = p.id
WHERE b.status = 'ACTIVE'
  AND DATEDIFF(b.expiry_date, CURDATE()) <= 15;

-- =========================
-- View 2: Fast Moving Products
-- =========================
CREATE OR REPLACE VIEW fast_moving_products AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    SUM(s.quantity_sold) AS total_sold
FROM sales s
JOIN products p ON s.product_id = p.id
GROUP BY p.id
HAVING total_sold >= 20;

-- =========================
-- View 3: Slow Moving Products
-- =========================
CREATE OR REPLACE VIEW slow_moving_products AS
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    IFNULL(SUM(s.quantity_sold), 0) AS total_sold
FROM products p
LEFT JOIN sales s ON p.id = s.product_id
GROUP BY p.id
HAVING total_sold < 5;
