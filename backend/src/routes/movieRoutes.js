const express = require('express')
const router = express.Router();
const Movie = require('../models/movieModel');

router.get('/all', async (request, response) => {
    try{
        const movies = await Movie.find(); //find() для пошуку, без колбеку(для фільтрування) тому що отримуємо всі фільми
        response.json(movies);  
    }catch(err){
        response.status(500).json({message: err.message});
    }
});

router.post('/add', async (request, response) => {
    const movie = new Movie({
        title: request.body.title,
        description: request.body.description,
        releaseDate: request.body.releaseDate,
        genre: request.body.genre,
        rating: request.body.rating,
        posterUrl: request.body.posterUrl,
        videoUrl: request.body.videoUrl,
    })

    try{
        const newMovie = await movie.save(); // Сохраняем новый фильм
        response.status(201).json(newMovie); // Отправляем ответ с новым фильмом
    }catch(err){
        response.status(400).json({ message: err.message }); // Обработка ошибки
    }
})


module.exports = router;

