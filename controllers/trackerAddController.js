const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerAdd = async (req, res, next) => {

  if (!req.body.tracker_id || !req.body.user_id || !req.body.trackertime) {
    return res.status(404).json({
      status : "failed",
      message: "Please fill in all the required fields.",
      fields: ["tracker_id", "user_id", "trackertime"],
        idUser: null,
    });
  }

  try {
      
    const [rows] = await conn.execute(
      "INSERT INTO `tracker`(`tracker_id`, `user_id`, `trackertime`) VALUES (?, ?, ?)",
      [req.body.tracker_id, req.body.user_id, req.body.trackertime]
    );

    if (rows.affectedRows === 1) {
      res.status(200).json({
            status : "success",
            message: "Data berhasil dimasukkan",
            idUser: row[0].user_id,
            output: row[0],
        });
    }

  } catch (err) {
    next(err);
  }
  
};