import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
        country: {
            type: String,
            default: "India",
            enum: ["India"],
            required: [true, "Country is required"],
        },
        address: {
            type: String,
            maxlength: [60, "Address cannot be more than 60 characters"],
            required: [true, "Address is required"],
        },
        landmark: {
            type: String,
            maxlength: [30, "Landmark cannot be more than 30 characters"],
        },
        pincode: {
            type: Number,
            validate: {
                validator: function (v) {
                    return /^\d{6}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid pincode!`,
            },
            required: [true, "Pincode is required"],
        },
        city: {
            type: String,
            required: [true, "City is required"],
        },
        state: {
            type: String,
            required: [true, "State is required"],
        },
    },
    { 
        _id: false 
});

export default addressSchema;