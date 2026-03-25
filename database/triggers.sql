USE usiers;

-- =========================
-- Trigger 1: Auto mark expired batches
-- =========================
DELIMITER $$

CREATE TRIGGER mark_expired_batches
BEFORE UPDATE ON batches
FOR EACH ROW
BEGIN
    IF NEW.expiry_date < CURDATE() THEN
        SET NEW.status = 'EXPIRED';
    END IF;
END$$

DELIMITER ;

-- =========================
-- Trigger 2: Expiry alert creation
-- Fires when batch is near expiry (<= 15 days)
-- =========================
DELIMITER $$

CREATE TRIGGER expiry_alert_trigger
AFTER INSERT ON batches
FOR EACH ROW
BEGIN
    IF DATEDIFF(NEW.expiry_date, CURDATE()) <= 15 THEN
        INSERT INTO alerts (product_id, alert_type, message)
        VALUES (
            NEW.product_id,
            'EXPIRY',
            CONCAT('Product batch expiring in ',
                DATEDIFF(NEW.expiry_date, CURDATE()),
                ' days')
        );
    END IF;
END$$

DELIMITER ;

-- =========================
-- Trigger 3: Low stock alert
-- Fires after sale insertion
-- =========================
DELIMITER $$

CREATE TRIGGER low_stock_alert
AFTER INSERT ON sales
FOR EACH ROW
BEGIN
    DECLARE remaining INT;

    SELECT SUM(quantity)
    INTO remaining
    FROM batches
    WHERE product_id = NEW.product_id
      AND status = 'ACTIVE';

    IF remaining <= 5 THEN
        INSERT INTO alerts (product_id, alert_type, message)
        VALUES (
            NEW.product_id,
            'LOW_STOCK',
            'Stock is running low'
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER low_stock_after_batch_update
AFTER UPDATE ON batches
FOR EACH ROW
BEGIN
    DECLARE remaining INT;

    SELECT SUM(quantity)
    INTO remaining
    FROM batches
    WHERE product_id = NEW.product_id
      AND status = 'ACTIVE';

    IF remaining <= 5 THEN
        INSERT INTO alerts (product_id, alert_type, message)
        VALUES (
            NEW.product_id,
            'LOW_STOCK',
            'Stock is running low'
        );
    END IF;
END$$

DELIMITER ;
