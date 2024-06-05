const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Career = new Schema({
    name: { type: String },
    code: { type: String},
    description: { type: String }
});

module.exports = mongoose.model('Career', Career);