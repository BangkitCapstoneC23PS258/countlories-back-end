const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.profileUpdate = async (req, res, next) => {
  try {
    const [row] = await conn.execute(
        "SELECT * FROM `personaldata` WHERE `user_id`=?",
        [req.params.user_id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        status : "failed",
        message: "Data user ID invalid",
        idUser: null,
    });
    }

    const [update] = await conn.execute(
      "UPDATE `personaldata` SET `height`=?, `weight`=? WHERE `user_id`=?",
      [req.body.height, req.body.weight, req.params.user_id]
    );
      
    return res.status(200).json({
        status : "success",
        message: "Data berhasil diubah",
        idUser: row[0].user_id,
        output: row[0],
    });

  } catch (err) {
    next(err);
  }

};