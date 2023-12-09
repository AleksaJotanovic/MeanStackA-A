import mongoose, { Schema } from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String, required: false, default: 'https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg' },
        isAdmin: { type: Boolean, default: false },
        roles: { type: [Schema.Types.ObjectId], required: true, ref: "Role" }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);