const model = require("../models/questionModel.js");

// Insert the new question into the surveyquestion
module.exports.createNewQuestion = (req, res, next) => {
    if (req.body.question == undefined) {
        res.status(400).json({ Error: "Missing data" });
        return;
    }

    const data = {
        id: res.locals.userId,
        question: req.body.question
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewQuestion:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({message:"Question successfully created"})
        }
    }
    model.insertQuestion(data, callback);
}


// Select question by id
module.exports.readQuestionById = (req, res, next) => {
    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestionById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}


// Select all questions
module.exports.readAllQuestion = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuestion:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Check if the user_id and the creator_id matches. Only the creator of the question can modify it
module.exports.questionUserCheck = (req, res, next) => {
    if (req.body.question == undefined) {
        res.status(400).json({ Error: "Missing data" });
        return;
    }

    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questionUserCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length == 0) {
                res.status(404).json({
                    message: "Requested question does not exist"
                });
            }
            else if (results.rows[0].creator_id != res.locals.userId) {
                res.status(403).json({
                    message: "Forbidden. You are not the owner of the requested question"
                });
            }
            else next();
        }
    }

    model.selectById(data, callback);
}

// Check if the user_id and the creator_id matches. Only the creator of the question can delete it
module.exports.questionUserDeleteCheck = (req, res, next) => {

    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questionUserCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.rows[0].creator_id != res.locals.userId) {
                res.status(403).json({
                    message: "Forbidden. You are not the owner of the requested question"
                });
            }
            else next();
        }
    }

    model.selectById(data, callback);
}


// Update the question
module.exports.updateQuestionById = (req, res, next) => {
    const data = {
        id: req.params.question_id,
        question: req.body.question
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateQuestionById:", error);
            res.status(500).json(error);
        } else res.status(200).json({message:"Question successfully updated"});
    }

    model.updateById(data, callback);
}


// Select the newly created question for the response body
module.exports.readQuestionById200 = (req, res, next) => {
    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestionById200:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}


// Delete question by id
module.exports.deleteQuestionById = (req, res, next) => {
    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteQuestionById:", error);
            res.status(500).json(error);
        } else {
            if (results.rowCount == 0) {
                res.status(404).json({
                    message: "Question not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}


// Check if the question id and the user id exists
module.exports.questionAndUserCheck = (req, res, next) => {
    if (res.locals.userId == undefined || req.body.answer == undefined || req.body.creation_date == undefined) {
        res.status(400).json({Error: "Missing data"});
        return;
    }

    const data = {
        question_id: req.params.question_id,
        user_id:res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questionAndUserCheck:", error);
            res.status(500).json(error);
        } else {
            if (!results.question) {
                res.status(404).json({ message: "Question does not exist" });
            } else if (!results.user) {
                res.status(404).json({ message: "User does not exist" });
            } else {
                next();
            }            
        }
    }

    model.selectQuestionAndUser(data, callback);
}


// Insert the new answer into the useranswer table
module.exports.createNewAnswer = (req, res, next) => {
    const data = {
        question_id: req.params.question_id,
        user_id: res.locals.userId,
        answer:req.body.answer,
        date:req.body.creation_date,
        notes:req.body.additional_notes,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewAnswer:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }
    model.insertAnswer(data, callback);
}


// Update the points by incrementing by 5 for every answered question
module.exports.updatePoints = (req, res, next) => {
    const data = {
        id: res.locals.userId,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePoints:", error);
            res.status(500).json(error);
        } else res.status(201).json({message:"Question successfully submitted"});
    }

    model.updatePointsById(data, callback);
}


// Select the newly added answer in the useranswer table for the response body
module.exports.readAnswerById = (req, res, next) => {
    const data = {
        id: res.locals.insertId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAnswerById:", error);
            res.status(500).json(error);
        } else {
            if(results.rows[0].answer==1)
                results.rows[0].answer=true
            else results.rows[0].answer=false
            res.status(201).json(results.rows[0]);
        }
    }

    model.selectAnswerById(data, callback);
}


// Select answers for specific question
module.exports.readAnswerByQuestionId = (req, res, next) => {
    const data = {
        id: req.params.question_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAnswerByQuestionId:", error);
            res.status(500).json(error);
        } else {
            if (results.rows.length == 0) {
                res.status(404).json({
                    message: "Question has no answer yet"
                });
            }
            else {
                for(var i = 0 ; i < results.rows.length ; i++){
                    if(results.rows[i].answer==1)
                        results.rows[i].answer=true
                    else results.rows[i].answer=false
                }
                res.status(200).json(results)
            };
        }
    }

    model.selectAnswerByQuestionId(data, callback);
}