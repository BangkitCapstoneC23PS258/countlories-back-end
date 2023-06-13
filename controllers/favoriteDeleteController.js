const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.favDelete = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "DELETE FROM `favorite` WHERE `food_id`=?",
        [req.params.food_id]
    );

    if (row.affectedRows === 0) {
      return res.status(404).json({
        message: "Invalid Food ID (No Food Found!)",
      });
    }

    res.status(200).json({
      message: "The Food has been deleted successfully.",
    });
    
  } catch (err) {
    next(err);
  }

};