import mongoose from "mongoose";


const numberSchema = new mongoose.Schema({
    countryCode: {
        type: String,
        default: "+91",
        enum: ["+91"],
    },
    value: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
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