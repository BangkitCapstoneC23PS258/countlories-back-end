const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbConnection').promise();


exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [selectuser] = await conn.execute(
            "SELECT * FROM `user` WHERE `email`=?",
            [req.body.email]
          );

        if (selectuser.length === 0) {
            return res.status(422).json({
                status : "failed",
                message: "Invalid email address",
                 token: null,
                idUser: null,
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, selectuser[0].password);
        if(!passMatch){
            return res.status(422).json({
                status : "failed",
                message: "Incorrect password",
                token: null,
                idUser: null,
            });
        }

        const theToken = jwt.sign({id:selectuser[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            status : "success",
            message: "Login berhasil",
            token:theToken,
            idUser: selectuser[0].user_id, 
        });

    }
    catch(err){
        next(err);
    }
}