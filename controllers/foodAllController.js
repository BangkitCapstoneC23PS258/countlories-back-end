const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.foodAll = async (req, res, next) => {
  try {

    const [rows] = await conn.execute("SELECT * FROM `food`");

    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "No Food Found",
      });
    }

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};