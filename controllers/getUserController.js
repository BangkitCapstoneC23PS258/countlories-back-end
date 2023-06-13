const jwt = require('jsonwebtoken');
const conn = require('../dbConnection').promise();

exports.getUser = async (req,res,next) => {

    try{

        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(401).json({
                status : "failed",
                message: "Tidak ada Token",
                idUser: null,
          });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

        const [row] = await conn.execute(
            "SELECT `id`,`username`,`email` FROM `user` WHERE `id`=?",
            [decoded.id]
        );

        if(row.length > 0){
            res.status(200).json({
                status : "success",
                message: "Data berhasil dimasukkan",
                idUser: row[0].user_id,
                output: row[0],
            });
        }

        res.json({
            status : "failed",
            message: "Data user tidak ada",
            idUser: null,
        });        
    }
    catch(err){
        next(err);
    }
}