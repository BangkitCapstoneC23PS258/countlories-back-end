const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.foodAll = async (req, res, next) => {
  try {

    const [row] = await conn.execute("SELECT * FROM `food`");

    if (row.length === 0) {
      return res.status(400).json({
        status : "failed",
        message: "Data tidak berhasil diambil",
        idUser: null,
    });
    }

    res.status(200).json({
        status : "success",
        message: "Data berhasil diambil",
        output: row,
    });

  } catch (err) {
    next(err);
  }

};