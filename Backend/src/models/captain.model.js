import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { Blacklist } from "./blacklistToken.model.js";

const captainSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true
        },
        plateNumber: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        vehicleType: {
            type: String,
            enum: ['bike', 'car', 'auto'],
            required: true
        }
    },

    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})


captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token
}

captainSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

captainSchema.methods.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
    
}



export const Captain = mongoose.model('Captain', captainSchema)