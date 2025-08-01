import jwt from 'jsonwebtoken'

const genToken = (userId,res)=>{
    const token = jwt.sign( {userId:userId.toString()}, process.env.SECRET_KEY, {expiresIn:'7d'} );
    res.cookie("token",token,{
        maxAge: 7*24*60*60*1000, //ms
        httpOnly:true,
        sameSite: "none",
        secure: process.env.NODE_ENV !== "development"
    });
}

export default genToken