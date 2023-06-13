const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.foodID = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `food` WHERE `food_id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
        return res.status(400).json({
        status : "failed",
        message: "Data tidak berhasil diamsukkan",
        idUser: null,
  });
    }
 
     res.status(200).json({
        status : "success",
        message: "Data berhasil diambil",
        idUser: row[0].user_id,
        output: row[0],
    });

  } catch (err) {
    next(err);
  }

};