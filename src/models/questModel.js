const pool = require('../services/db');

// Select all quests
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM quest;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// Select quest by quest_id
module.exports.selectQuestById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM quest
        WHERE quest_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select completed quest
module.exports.selectCompletedQuest = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM completedquest
        WHERE quest_id = $1 AND pet_id = $2;
    `;
    const VALUES = [data.quest_id, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select owned pet details by owned_pet_id
module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT pet_name, pets.category, type1, type2, type3, ownedpet.* 
        FROM ownedpet
        INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update pet stats (level, HP, attack, defense)
module.exports.updatePetStats = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE ownedpet 
        SET pet_level = pet_level + 1, 
            pet_hp = pet_hp + 5, 
            pet_atk = pet_atk + 5, 
            pet_def = pet_def + 5
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Insert a completed quest record
module.exports.insertCompletedQuest = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO completedquest (quest_id, pet_id)
        VALUES ($1, $2);
    `;
    const VALUES = [data.quest_id, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select pet stats
module.exports.selectPetStats = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT pets.pet_id, pet_name, pets.category, type1, type2, type3, pet_level, pet_hp, pet_atk, pet_def 
        FROM ownedpet
        INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
        WHERE owned_pet_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
