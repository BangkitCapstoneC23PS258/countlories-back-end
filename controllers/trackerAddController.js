const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.trackerAdd = async (req, res, next) => {

    if (!req.body.user_id || !req.body.food_id) {
        return res.status(404).json({
          status : "failed",
          message: "Please fill in all the required fields.",
          fields: ["user_id", "food_id"],
        });
      }
    
    try{
        console.log(req.body.user_id);
        console.log(req.body.food_id);

        const [row] = await conn.execute(
            "SELECT * FROM `tracker` WHERE DATE(`trackertime`)= CURRENT_DATE() && `user_id`=?",
            [req.body.user_id]
          );

        if (row.length === 0) {
            const [rows] = await conn.execute('INSERT INTO `tracker`(`user_id`,`trackertime`) VALUES(?,CURRENT_TIMESTAMP())',[
                req.body.user_id,
            ]);
        }
        
        const [select] = await conn.execute(
                "SELECT * FROM `tracker` WHERE DATE(`trackertime`)= CURRENT_DATE() && `user_id`=?",
                [req.body.user_id]
            );
            
        let user_id = select[0].user_id;
            
        const [insert] = await conn.execute('INSERT INTO `tracker_item`(`tracker_id`,`food_id`) VALUES(?,?)',[
            select[0].tracker_id,
            req.body.food_id,
        ]);

        if (insert.affectedRows === 1) {
            res.status(200).json({
                status : "success",
                message: "Data berhasil dimasukkan",
                output: insert[0],
            });
        }
        
    }catch(err){
        next(err);
    }
};