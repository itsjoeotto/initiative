const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: String,
    roll: Number,
    foe: Boolean,
    party: Boolean,
    toBeUpdated: Boolean
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;