const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.profileUpdate = async (req, res, next) => {
  try {

    const [row] = await conn.execute(
        "SELECT * FROM `user` WHERE `id`=?",
        [req.params.id]
    );z

    if (row.length === 0) {
      return res.status(404).json({
        message: "Invalid User ID",
      });
    }

    if (req.body.username) row[0].username = req.body.username;

    if (req.body.email) row[0].email = req.body.email;

    const [update] = await conn.execute(
      "UPDATE `user` SET `username`=?, `email`=? WHERE `id`=?",
      [row[0].username, row[0].email, req.params.id]
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