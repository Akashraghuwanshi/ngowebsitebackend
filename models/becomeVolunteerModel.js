import mongoose from 'mongoose';

const becomeVolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    areaOfInterest: { type: String, required: true },
    contactNumber: { type: String, required: true, validate: {
        validator: function(v) {
            return /\d{10}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
    }},
    district: { type: String, required: true },
    gender: { type: String, required: true },
    state: { type: String, required: true },
    image:{
        type:String,
        required:true,
    },
});

const BecomeVolunteer = mongoose.model('BecomeVolunteer', becomeVolunteerSchema);

export default BecomeVolunteer;
