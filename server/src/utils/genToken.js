import jwt from 'jsonwebtoken'

const genToken = (userId,res)=>{
    const token = jwt.sign( {userId:userId.toString()}, process.env.SECRET_KEY, {expiresIn:'7d'} );
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true,
        // In development, use Lax to allow cookie on localhost without HTTPS
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    });
}

export default genToken