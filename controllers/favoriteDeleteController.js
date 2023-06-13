const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favDelete = async (req, res, next) => {

  try {  
    const [row] = await conn.execute(
        "DELETE FROM `favorite` WHERE `user_id`=? AND `food_id`=?",
        [req.params.user_id, req.params.food_id]
    );


    if (row.affectedRows === 0) {
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