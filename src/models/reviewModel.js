const pool = require('../services/db');

// Select all reviews with user info
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT Reviews.*, username 
        FROM Reviews
        INNER JOIN "user" ON "user".user_id = Reviews.user_id;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// Select a single review by ID
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM Reviews
        WHERE id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Insert a new review
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO Reviews (review_amt, user_id)
        VALUES ($1, $2);
    `;
    const VALUES = [data.review_amt, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update review by ID
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE Reviews 
        SET review_amt = $1
        WHERE id = $2;
    `;
    const VALUES = [data.review_amt, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Delete a review by ID
module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
        DELETE FROM Reviews 
        WHERE id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
