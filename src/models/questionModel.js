const pool = require('../services/db');

// Insert a new survey question
module.exports.insertQuestion = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO surveyquestion (creator_id, question)
        VALUES ($1, $2);
    `;
    const VALUES = [data.id, data.question];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select a question by its ID
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT question_id, question, creator_id FROM surveyquestion
        WHERE question_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select all survey questions
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
        SELECT question_id, question, creator_id FROM surveyquestion;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// Update a question by its ID
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE surveyquestion 
        SET question = $1
        WHERE question_id = $2;
    `;
    const VALUES = [data.question, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Delete a survey question and related answers
module.exports.deleteById = (data, callback) => {
    const deleteAnswers = `
        DELETE FROM useranswer 
        WHERE answered_question_id = $1;
    `;
    const deleteQuestion = `
        DELETE FROM surveyquestion 
        WHERE question_id = $1;
    `;

    pool.query(deleteAnswers, [data.id], (err, res) => {
        if (err) return callback(err);
        pool.query(deleteQuestion, [data.id], callback);
    });
};

// Select question and user information
module.exports.selectQuestionAndUser = async (data, callback) => {
    try {
        const questionQuery = `SELECT * FROM surveyquestion WHERE question_id = $1;`;
        const userQuery = `SELECT * FROM "user" WHERE user_id = $1;`; // Note: $1 is reused

        const questionResult = await pool.query(questionQuery, [data.question_id]);
        const userResult = await pool.query(userQuery, [data.user_id]);

        callback(null, { question: questionResult.rows[0], user: userResult.rows[0] });
    } catch (error) {
        callback(error, null);
    }
};


// Insert an answer for a survey question
module.exports.insertAnswer = (data, callback) => {
    const SQLSTATEMENT = `
        INSERT INTO useranswer (answered_question_id, participant_id, answer, creation_date, additional_notes)
        VALUES ($1, $2, $3, $4, $5);
    `;
    const VALUES = [data.question_id, data.user_id, data.answer, data.date, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Update user points
module.exports.updatePointsById = (data, callback) => {
    const SQLSTATEMENT = `
        UPDATE "user" 
        SET points = points + 5
        WHERE user_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select an answer by answer ID
module.exports.selectAnswerById = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM useranswer
        WHERE answer_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Select answers by question ID
module.exports.selectAnswerByQuestionId = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT participant_id, answer, creation_date, additional_notes, question 
        FROM useranswer
        INNER JOIN surveyquestion ON useranswer.answered_question_id = surveyquestion.question_id
        WHERE answered_question_id = $1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
