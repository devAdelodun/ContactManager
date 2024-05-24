import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email has already been used"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
