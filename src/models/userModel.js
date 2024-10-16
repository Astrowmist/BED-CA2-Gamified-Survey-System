const pool = require('../services/db');

module.exports.selectByUsername = (data, callback) => {
    const SQLSTATMENT = `
        SELECT user_id,username,points FROM user
        WHERE username = ?;
        `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.getUserIdAndPassword = (data, callback) => {
    const SQLSTATMENT = `
        SELECT user_id,password FROM user
        WHERE username = ?;
        `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByUserId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT points FROM user
        WHERE user_id = ?;
        `;
    const VALUES = [data.userId];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.insertUser = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO user (username, password,points)
        VALUES (?, ?, ?);
        `;
    const VALUES = [data.username, data.password, data.points];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM user;
        `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.selectUserWithUserId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT user_id,username,COUNT(participant_id) AS completed_questions,points
        FROM user
        LEFT JOIN useranswer ON user.user_id = useranswer.participant_id
        WHERE user_id=?;
        `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByUsernameAndUserId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM user
        WHERE username = ? AND NOT user_id = ?;
        `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE user 
        SET username = ?
        WHERE user_id = ?;
        `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByPetName = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM pets
        WHERE pet_name = ?;
        `;
    const VALUES = [data.pet_name];

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