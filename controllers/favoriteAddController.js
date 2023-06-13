const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favAdd = async (req, res, next) => {

  if (!req.body.user_id || !req.body.food_id) {
    return res.status(404).json({
      status : "failed",
      message: "Please fill in all the required fields.",
      fields: ["user_id", "food_id"],
        idUser: null,
    });
  }

  try {
      
    const [row] = await conn.execute(
      "INSERT INTO `favorite`(`user_id`,`food_id`) VALUES (?, ?)",
      [req.body.user_id, req.body.food_id]
    );

    if (row.affectedRows === 1) {
      res.status(200).json({
        status : "success",
        message: "Data favorite berhasil dimasukkan",
        output: row[0],
    });
    }

  } catch (err) {
    next(err);
    return res.status(400).json({
        status : "failed",
        message: "Data favorite tidak berhasil dimasukkan",
        idUser: null,
  });
}
  
};