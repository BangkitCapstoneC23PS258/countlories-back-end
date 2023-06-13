const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.profileInput = async (req, res, next) => {

  if (!req.body.user_id || !req.body.height || !req.body.weight || !req.body.gender || !req.body.dob) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["user_id", "height", "weight", "gender", "dob"],
    });
  }

  try {
      
    const [rows] = await conn.execute(
      "INSERT INTO `personaldata`(`user_id`,`height`,`weight`,`gender`,`dob`) VALUES (?, ?, ?, ?, ?)",
      [req.body.user_id, req.body.height, req.body.weight, req.body.gender, req.body.dob]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        status : "failed",
        message: "The data has been successfully inserted.",
        userID: rows.insertId,
      });
    }

  } catch (err) {
    next(err);
  }
  
};