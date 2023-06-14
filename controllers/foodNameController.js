const jwt = require('jsonwebtoken');
const conn = require('../dbConnection')

exports.foodName = async (req, res, next) => {
let name = req.params.name;
  conn.query(
    `SELECT * FROM food WHERE food_name LIKE '%${name}%'`,
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
        status : "success",
        message: "Data berhasil dimasukkan",
        output: rows,
    });
      } else {
            return res.status(400).json({
                status : "failed",
                message: "Data tidak berhasil ditemukan",
        });
      }
    }
  );
};
