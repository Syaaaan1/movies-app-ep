const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    posterUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;