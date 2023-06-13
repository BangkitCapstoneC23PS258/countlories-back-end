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
        message: "Invalid User ID",
      });
    }

    const [update] = await conn.execute(
      "UPDATE `personaldata` SET `height`=?, `weight`=?  WHERE `user_id`=?",
      [req.body.height, req.body.weight, req.params.user_id]
    );

    if (update.affectedRows === 1) {
      return res.json({
        message: "The User has been successfully updated.",
      });
    }

  } catch (err) {
    next(err);
  }

};