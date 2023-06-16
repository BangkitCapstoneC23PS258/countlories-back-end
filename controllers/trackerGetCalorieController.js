const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerCalorie = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT SUM(calories) FROM `v_tracker` WHERE `tracker_id`=?",
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
        idUser: row[0].tracker_id,
        output: row,
    });

  } catch (err) {
    next(err);
  }

};