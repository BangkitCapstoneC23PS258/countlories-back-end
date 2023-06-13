const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.foodName = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `food` WHERE `food_name`=?",
        [req.params.name]
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
        message: "Data berhasil dimasukkan",
        idUser: row[0].user_id,
        output: row[0],
    });

  } catch (err) {
    next(err);
  }

};