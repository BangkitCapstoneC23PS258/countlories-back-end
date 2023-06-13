const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favAdd = async (req, res, next) => {

  if (!req.body.user_id || !req.body.food_id) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["user_id", "food_id"],
    });
  }

  try {
      
    const [rows] = await conn.execute(
      "INSERT INTO `favorite`(`user_id`,`food_id`) VALUES (?, ?)",
      [req.body.user_id, req.body.food_id]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The data has been successfully inserted.",
        userID: rows.insertId,
      });
    }

  } catch (err) {
    next(err);
  }
  
};