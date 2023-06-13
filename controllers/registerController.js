const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT `email` FROM `user` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(400).json({
                    status : "failed",
                    message: "Email sudah dipakai",
                    idUser: null,
              });
        }

        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await conn.execute('INSERT INTO `user`(`username`,`email`,`password`) VALUES(?,?,?)',[
            req.body.username,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            res.status(200).json({
                status : "success",
                message: "Data berhasil dimasukkan",
                idUser: row[0].user_id,
                output: row[0],
            });
        }
        
    }catch(err){
        next(err);
    }
}