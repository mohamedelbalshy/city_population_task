const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    state: {
        type: String,
        name: 'state',
        required: true
    },
    city: {
        type: String,
        name: 'city',
        required: true
    },
    populations: {
        type: Number,
        name: 'population',
        required: true
    }
});

// unique index for city and state combinations
schema.index({ city: 1, state: 1}, { unique: true });

const CityPopulationModel = mongoose.model('CityPopulation', schema);

module.exports = {
    CityPopulationModel
}