const pool = require('../services/db');


module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM store;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectByUserId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT points FROM user
        WHERE user_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectByItemId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM store
        WHERE item_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectOwnerId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT owner_id FROM ownedpet
    WHERE owned_pet_id = ?;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatePointsById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE user
        SET points= ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.points,data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectRandomCommonPet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'common' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.selectRandomRarePet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'rare' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectRandomVeryRarePet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'very rare' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectRandomUniquePet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'unique' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectRandomMythicPet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'mythic' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectRandomGodPet = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM pets
    WHERE category = 'god' 
    ORDER BY RAND()
    LIMIT 1;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.insertOwnedPet = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO ownedpet (owner_id, pet_id, pet_level, pet_hp, pet_atk, pet_def)
        VALUES (?, ?, ?, ?, ?, ?);
        `;
    const VALUES = [data.owner_id, data.pet_id, data.pet_level, data.pet_hp, data.pet_atk, data.pet_def];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateArmour = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE ownedpet 
        SET armour_id = ?, armour_atk = ?, armour_def= ?
        WHERE owned_pet_id = ?;
        `;
    const VALUES = [data.armour_id, data.armour_atk, data.armour_def,data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT pet_name,pets.category,type1,type2,type3,ownedpet.*,item_name AS armour_name,item_desc AS armour_desc FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    LEFT JOIN store ON ownedpet.armour_id = store.item_id
    WHERE owned_pet_id = ?;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}