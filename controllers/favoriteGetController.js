const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favID = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `v_favorite` WHERE `user_id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
     return res.status(400).json({
        status : "failed",
        message: "Data tidak berhasil didapat",
        idUser: null,
  });
    }

    res.status(200).json({
        status : "success",
        message: "Data favorite berhasil didapat",
        idUser: row[0].user_id,
        userID: row.insertId,
    });

  } catch (err) {
    next(err);
    
  }

};