const pool = require('../services/db');

module.exports.selectByUsername = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, username, points FROM "user"
        WHERE username = $1;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.getUserIdAndPassword = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, password FROM "user"
        WHERE username = $1;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByUserId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT points FROM "user"
        WHERE user_id = $1;
    `;
    const VALUES = [data.userId];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertUser = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO "user" (username, password, points)
        VALUES ($1, $2, $3)
        RETURNING user_id;
    `;
    const VALUES = [data.username, data.password, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM "user";
    `;

    pool.query(SQLSTATEMENT, callback);
};

module.exports.selectUserWithUserId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, username, COUNT(participant_id) AS completed_questions, points
        FROM "user"
        LEFT JOIN useranswer ON "user".user_id = useranswer.participant_id
        WHERE user_id = $1
        GROUP BY user_id, username, points;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByUsernameAndUserId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM "user"
        WHERE username = $1 AND user_id <> $2;
    `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE "user" 
        SET username = $1
        WHERE user_id = $2;
    `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByPetName = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM pets
        WHERE pet_name = $1;
    `;
    const VALUES = [data.pet_name];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertOwnedPet = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO ownedpet (owner_id, pet_id, pet_level, pet_hp, pet_atk, pet_def)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const VALUES = [data.owner_id, data.pet_id, data.pet_level, data.pet_hp, data.pet_atk, data.pet_def];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
