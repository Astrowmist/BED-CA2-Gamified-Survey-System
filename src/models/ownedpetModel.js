const pool = require('../services/db');

// Select all owned pets
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT pet_name, pets.category, type1, type2, type3, ownedpet.*, item_name AS armour_name, item_desc AS armour_desc 
    FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// Select pets by owner ID
module.exports.selectByOwnerId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT pet_name, pets.category, type1, type2, type3, ownedpet.*, item_name AS armour_name, 
           item_desc AS armour_desc, store.category AS armour_category 
    FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id
    WHERE owner_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select pet by owned pet ID
module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT pet_name, pets.category, type1, type2, type3, ownedpet.*, item_name AS armour_name, 
           item_desc AS armour_desc, store.category AS armour_category 
    FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id
    WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update last fed timestamp
module.exports.updateLastFed = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE ownedpet 
        SET last_fed = CURRENT_TIMESTAMP
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update last showered timestamp
module.exports.updateLastShowered = (data, callback) => {
    console.log(data)
    const SQLSTATEMENT = `
        UPDATE ownedpet 
        SET last_showered = CURRENT_TIMESTAMP
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update last time spent timestamp
module.exports.updateLastTimeSpent = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE ownedpet 
        SET last_time_spent = CURRENT_TIMESTAMP
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select user by user ID
module.exports.selectUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM "user"
    WHERE user_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Breed a random pet based on categories and types
module.exports.breed = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM pets 
    WHERE category IN ($1, $2) 
    AND (type1 IN ($3, $4, $5, $6, $7, $8) 
    OR type2 IN ($9, $10, $11, $12, $13, $14) 
    OR type3 IN ($15, $16, $17, $18, $19, $20))
    ORDER BY RANDOM()
    LIMIT 1;
    `;

    const VALUES = [
        data.category1, data.category2, 
        data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3, 
        data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3, 
        data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update last bred timestamp for user
module.exports.updateLastBred = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE "user" 
        SET last_bred = CURRENT_TIMESTAMP
        WHERE user_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Insert a new owned pet
module.exports.insertOwnedPet = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO ownedpet (owner_id, pet_id, pet_level, pet_hp, pet_atk, pet_def)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id;
    `;
    const VALUES = [data.owner_id, data.pet_id, data.pet_level, data.pet_hp, data.pet_atk, data.pet_def];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
