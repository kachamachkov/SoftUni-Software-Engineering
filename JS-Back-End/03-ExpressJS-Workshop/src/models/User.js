const { Schema, model, MongooseError } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// hash pw before saving to db (GDPR)
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 12);

    this.password = hash;
});


userSchema.virtual('rePassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new MongooseError('Password mismatch!');
        }
    });

    
const User = model('User', userSchema);

module.exports = User;