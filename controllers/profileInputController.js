const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.profileInput = async (req, res, next) => {

  if (!req.body.user_id || !req.body.height || !req.body.weight || !req.body.gender || !req.body.dob) {
    return res.status(401).json({
        status : "failed",
      message: "Please fill in all the required fields.",
      fields: ["user_id", "height", "weight", "gender", "dob"],
    });
  }

  try {
      
    const [row] = await conn.execute(
      "INSERT INTO `personaldata`(`user_id`,`height`,`weight`,`gender`,`dob`) VALUES (?, ?, ?, ?, ?)",
      [req.body.user_id, req.body.height, req.body.weight, req.body.gender, req.body.dob]
    );

    if (row.affectedRows === 1) {
      res.status(200).json({
        status : "success",
        message: "Data berhasil dimasukkan",
        output: row[0],
    });
    }

  } catch (err) {
    next(err);
      return res.status(400).json({
        status : "failed",
        message: "Data tidak berhasil diamsukkan",
        idUser: null,
    });
  }
  
};