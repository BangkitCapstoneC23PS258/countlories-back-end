const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.foodName = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `food` WHERE `food_name`=?",
        [req.params.name]
    );

    if (row.length === 0) {
      return res.status(404).json({
        status : "failed",
        message: "No Food Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};