import mongoose from "mongoose";


const numberSchema = new mongoose.Schema({
    countryCode: {
        type: String,
        default: "+91",
    },
    value: {
        type: Number,
        required: [true, "Phone number is required"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
},
    { _id: false }
);

export default numberSchema;