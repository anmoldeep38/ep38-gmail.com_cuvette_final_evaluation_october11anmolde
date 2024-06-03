import { Schema, model } from 'mongoose'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ACCESS_TOKEN_SECRET } from '../utils/constant.js';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 character'],
        maxLength: [15, 'Name should be less than 15 character'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Please Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 character '],
        match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be contains at least one uppercase and one lowercase and one digit and one special character'],
        select: false
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
    isPasswordCorrect: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    generateAccessToken: async function () {
        return JWT.sign({
            _id: this._id,
            name: this.name,
            email: this.email
        }, ACCESS_TOKEN_SECRET
        )
    }
}

const User = model("User", userSchema);

export default User;