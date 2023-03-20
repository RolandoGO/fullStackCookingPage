const mongoose = require('mongoose');

//collection for all deleted users
const deletedUserSchema = new mongoose.Schema({
    name: {
        type: String

    },
    role: {
        type: String,
    },

    email: {
        type: String,
    },

    password: {
        type: String,
    },

    createdAt: {
        type: Date
    },

    deletedAt: {
        type: Date,
        default: Date.now
    }
});




const deletedUser = mongoose.model('deletedUser', deletedUserSchema);

module.exports = deletedUser;