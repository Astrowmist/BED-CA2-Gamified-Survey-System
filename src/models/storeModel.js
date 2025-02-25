const pool = require('../services/db');

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM store;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectByUserId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT points FROM "user"
        WHERE user_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByItemId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM store
        WHERE item_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectOwnerId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT owner_id FROM ownedpet
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updatePointsById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE "user"
        SET points = $1
        WHERE user_id = $2;
    `;
    const VALUES = [data.points, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectRandomCommonPet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'common' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectRandomRarePet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'rare' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectRandomVeryRarePet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'very rare' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectRandomUniquePet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'unique' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectRandomMythicPet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'mythic' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectRandomGodPet = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE category = 'god' 
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.insertOwnedPet = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO ownedpet (owner_id, pet_id, pet_level, pet_hp, pet_atk, pet_def)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id;
    `;
    const VALUES = [data.owner_id, data.pet_id, data.pet_level, data.pet_hp, data.pet_atk, data.pet_def];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateArmour = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE ownedpet 
        SET armour_id = $1, armour_atk = $2, armour_def = $3
        WHERE owned_pet_id = $4;
    `;
    const VALUES = [data.armour_id, data.armour_atk, data.armour_def, data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT pet_name, pets.category, type1, type2, type3, ownedpet.*, 
               item_name AS armour_name, item_desc AS armour_desc 
        FROM ownedpet
        INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
        LEFT JOIN store ON ownedpet.armour_id = store.item_id
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
