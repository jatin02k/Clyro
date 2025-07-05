import mongoose from "mongoose";
<<<<<<< HEAD

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
=======
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
>>>>>>> 92a5e80fda19eba95b7eec5bc3ca412243c1203f
export default User;