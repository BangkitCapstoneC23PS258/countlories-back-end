const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favID = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `v_favorite` WHERE `user_id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No Favorite Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};