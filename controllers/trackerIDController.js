const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerID = async (req, res, next) => {

  try {

    const [row] = await conn.execute(
        "SELECT * FROM `tracker` WHERE `tracker_id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No Tracker Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};