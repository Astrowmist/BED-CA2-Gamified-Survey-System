const model = require("../models/reviewModel.js");
const pool = require("../services/db.js");

module.exports.createReview = (req, res, next) => {
    if (req.body.review_amt == undefined) {
        res.status(400).send({ message: "review_amt is undefined" });
        return;
    }
    else if (req.body.review_amt > 5 || req.body.review_amt < 1) {
        res.status(400).json({ message: "review_amt can only be between 1 to 5" });
        return;
    }
    else if (res.locals.userId == undefined) {
        res.status(400).send({ message: "user_id is undefined" });
        return;
    }

    const data = {
        user_id: res.locals.userId,
        review_amt: req.body.review_amt
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({ message: "Review successfully created" });
        }
    }

    model.insertSingle(data, callback);
}

module.exports.readReviewById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readReviewById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Review not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.readAllReview = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllReview:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

module.exports.updateReviewById = (req, res, next) => {
    if (req.body.review_amt == undefined) {
        res.status(400).send("Error: review_amt is undefined");
        return;
    }
    else if (req.body.review_amt > 5 || req.body.review_amt < 1) {
        res.status(400).send("Error: review_amt can only be between 1 to 5");
        return;
    }

    const data = {
        id: req.params.id,
        review_amt: req.body.review_amt
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateReviewById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send();
        }
    }

    model.updateById(data, callback);
}

// Check if the user_id and the creator_id matches. Only the creator of the review can modify it
module.exports.reviewUserCheck = (req, res, next) => {

    if(req.params.id == undefined)
        {
            res.status(400).send("Error: id is undefined");
            return;
        }

    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questionUserCheck:", error);
            res.status(500).json(error);
        } else {
            if (results[0].user_id != res.locals.userId) {
                res.status(403).json({
                    message: "Forbidden. You are not the owner of this Review."
                });
            }
            else next();
        }
    }

    model.selectById(data, callback);
}


module.exports.deleteReviewById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteReviewById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Review not found"
                });
            }
            else {
                res.status(204).send();
            }
        }
    }

    model.deleteById(data, callback);
}