const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerAll = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `tracker` WHERE `user_id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(400).json({
        status : "failed",
        message: "Data tidak ditemukan",
        idUser: null,
  });
    }

    res.status(200).json({
        status : "success",
        message: "Data berhasil ditemukan",
        idUser: row[0].user_id,
        output: row[0],
    });

  } catch (err) {
    next(err);
  }

};