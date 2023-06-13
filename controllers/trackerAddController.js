const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerAdd = async (req, res, next) => {

  if (!req.body.tracker_id || !req.body.user_id || !req.body.trackertime) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["tracker_id", "user_id", "trackertime"],
    });
  }

  try {
      
    const [rows] = await conn.execute(
      "INSERT INTO `tracker`(`tracker_id`, `user_id`, `trackertime`) VALUES (?, ?, ?)",
      [req.body.tracker_id, req.body.user_id, req.body.trackertime]
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