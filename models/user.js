import mongoose from 'mongoose';
const { Schema } = mongoose;
import connection from '../config/index.js';

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /.+@.+/i.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique:true
    },
    dateCreated: { type: Date, default: Date.now },
    image: String,
    password: String
});

const User = connection.model('User', userSchema);
export default User