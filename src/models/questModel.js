const pool = require('../services/db');


module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM quest;
    `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectQuestById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectCompletedQuest = (data,callback) => {
    const SQLSTATMENT = `
    SELECT * FROM completedquest
    WHERE quest_id = ? AND pet_id = ?;
    `;
    const VALUES = [data.quest_id, data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByOwnedPetId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT pet_name,pets.category,type1,type2,type3,ownedpet.* FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    WHERE owned_pet_id = ?;
    `;
    const VALUES = [data.owned_pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updatePetStats = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE ownedpet 
        SET pet_level = pet_level + 1, pet_hp = pet_hp + 5, pet_atk = pet_atk + 5, pet_def = pet_def + 5
        WHERE owned_pet_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.insertCompletedQuest = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO completedquest (quest_id, pet_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.quest_id, data.pet_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectPetStats = (data, callback) => {
    const SQLSTATMENT = `
    SELECT pets.pet_id,pet_name,pets.category,type1,type2,type3,pet_level,pet_hp,pet_atk,pet_def FROM ownedpet
    INNER JOIN pets ON ownedpet.pet_id = pets.pet_id
    WHERE owned_pet_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}