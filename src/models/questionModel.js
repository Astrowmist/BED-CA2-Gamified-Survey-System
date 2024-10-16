const pool = require('../services/db');

module.exports.insertQuestion = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO surveyquestion (creator_id, question)
        VALUES (?, ?);
        `;
    const VALUES = [data.id, data.question];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
            SELECT question_id,question,creator_id FROM surveyquestion
            WHERE question_id = ?;
            `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT question_id,question,creator_id FROM surveyquestion;
        `;

    pool.query(SQLSTATMENT, callback);
}


module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE surveyquestion 
        SET question = ?
        WHERE question_id = ?;
        `;
    const VALUES = [data.question, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM surveyquestion 
    WHERE question_id = ?;

    DELETE FROM useranswer 
    WHERE answered_question_id = ?;
    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectQuestionAndUser = (data, callback) => {
    const SQLSTATMENT = `
            SELECT * FROM surveyquestion
            WHERE question_id = ?;

            SELECT * FROM user
            WHERE user_id = ?;
            `;
    const VALUES = [data.question_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.insertAnswer = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO useranswer (answered_question_id, participant_id,answer,creation_date,additional_notes)
        VALUES (?, ?, ?, ?, ?);
        `;
    const VALUES = [data.question_id, data.user_id,data.answer,data.date,data.notes];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatePointsById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE user 
        SET points = points + 5
        WHERE user_id = ?;
        `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectAnswerById = (data, callback) => {
    const SQLSTATMENT = `
            SELECT * FROM useranswer
            WHERE answer_id = ?;
            `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectAnswerByQuestionId = (data, callback) => {
    const SQLSTATMENT = `
            SELECT participant_id,answer,creation_date,additional_notes,question FROM useranswer
            INNER JOIN surveyquestion ON useranswer.answered_question_id = surveyquestion.question_id
            WHERE answered_question_id = ?;
            `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}