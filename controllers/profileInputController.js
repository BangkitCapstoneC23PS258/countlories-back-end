const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.profileInput = async (req, res, next) => {

  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["height", "weight", "gender", "dob"],
    });
  }

  try {
      
    const [rows] = await conn.execute(
      "INSERT INTO `personaldata`(`height', 'weight', 'gender', 'dob`) VALUES(?, ?, ?, ?)",
      [req.body.name, req.body.email]
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