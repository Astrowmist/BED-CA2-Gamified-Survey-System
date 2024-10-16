const pool = require('../services/db');


module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT pet_name,pets.category,type1,type2,type3,ownedpet.*,item_name AS armour_name,item_desc AS armour_desc FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectByOwnerId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT pet_name,pets.category,type1,type2,type3,ownedpet.*,item_name AS armour_name,item_desc AS armour_desc,store.category as armour_category FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id
    WHERE owner_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT pet_name,pets.category,type1,type2,type3,ownedpet.*,item_name AS armour_name,item_desc AS armour_desc,store.category as armour_category FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id
    WHERE owned_pet_id = ?;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateLastFed = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE ownedpet 
        SET last_fed = CURRENT_TIMESTAMP
        WHERE owned_pet_id = ?;
        `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateLastShowered = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE ownedpet 
        SET last_showered = CURRENT_TIMESTAMP
        WHERE owned_pet_id = ?;
        `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateLastTimeSpent = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE ownedpet 
        SET last_time_spent = CURRENT_TIMESTAMP
        WHERE owned_pet_id = ?;
        `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectUser = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM user
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// SQL query to select a random pet from the database based on the specified categories and types
module.exports.breed = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets 
    WHERE category IN (?, ?) 
    AND (type1 IN (?, ?, ?, ?, ?, ?) 
    OR type2 IN (?, ?, ?, ?, ?, ?) 
    OR type3 IN (?, ?, ?, ?, ?, ?))
    ORDER BY RAND()
    LIMIT 1;
    `;
    const VALUES = [data.category1, data.category2, data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3, data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3, data.type1_1, data.type1_2, data.type1_3, data.type2_1, data.type2_2, data.type2_3];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateLastBred = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE user 
        SET last_bred = CURRENT_TIMESTAMP
        WHERE user_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.insertOwnedPet = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO ownedpet (owner_id, pet_id, pet_level, pet_hp, pet_atk, pet_def)
        VALUES (?, ?, ?, ?, ?, ?);
        `;
    const VALUES = [data.owner_id, data.pet_id, data.pet_level, data.pet_hp, data.pet_atk, data.pet_def];

    pool.query(SQLSTATMENT, VALUES, callback);
}