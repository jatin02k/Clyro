import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullName:{
            type: String,
            required:true,
        },
        email:{
            type: String,
            required:true,
            unique: true,
        },
        password:{
            type: String,
            required:true,
            minlenght:6
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          }
    },
    {timestamps:true}
);
const User= mongoose.model("User", userSchema);
export default User;