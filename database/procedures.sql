USE usiers;

-- =========================
-- Procedure 1: Record a Sale
-- =========================
DROP PROCEDURE IF EXISTS record_sale;

DELIMITER $$

CREATE PROCEDURE record_sale (
    IN p_product_id INT,
    IN p_quantity INT,
    IN p_staff_id INT
)
BEGIN
    INSERT INTO sales (product_id, quantity_sold, sale_date, staff_id)
    VALUES (p_product_id, p_quantity, CURRENT_DATE(), p_staff_id);

    UPDATE batches
    SET quantity = quantity - p_quantity
    WHERE product_id = p_product_id
      AND status = 'ACTIVE'
    ORDER BY expiry_date
    LIMIT 1;
END$$

DELIMITER ;


-- =========================
-- Procedure 2: Sales Report (Date Range)
-- =========================
DELIMITER $$

CREATE PROCEDURE sales_report (
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT 
        p.name AS product_name,
        SUM(s.quantity_sold) AS total_sold
    FROM sales s
    JOIN products p ON s.product_id = p.id
    WHERE s.sale_date BETWEEN start_date AND end_date
    GROUP BY p.name;
END$$

DELIMITER ;

-- =========================
-- Procedure 3: Donation History
-- =========================
DELIMITER $$

CREATE PROCEDURE donation_history ()
BEGIN
    SELECT 
        d.id,
        p.name AS product_name,
        b.batch_number,
        u1.name AS shopkeeper,
        u2.name AS ngo,
        d.status,
        d.created_at,
        d.accepted_at
    FROM donations d
    JOIN batches b ON d.batch_id = b.id
    JOIN products p ON b.product_id = p.id
    JOIN users u1 ON d.shopkeeper_id = u1.id
    LEFT JOIN users u2 ON d.ngo_id = u2.id;
END$$

DELIMITER ;
