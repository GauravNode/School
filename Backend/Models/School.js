const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

// schoolSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();

const School = mongoose.model('School', schoolSchema);
module.exports = School;
