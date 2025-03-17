const express = require('express')
const router = express.Router();
const Movie = require('../models/movieModel');
//const { request } = require('../app');

router.get('/all', async (request, response) => {
    try{
        const movies = await Movie.find(); //find() для пошуку, без колбеку(для фільтрування) тому що отримуємо всі фільми
        response.json(movies);  
    }catch(err){
        response.status(500).json({message: err.message});
    }
});

router.get('/search', async (request, response) => {
    try{
        const searchingName = request.query.title;
        if(!searchingName){
            return response.status(400).json({message: "Title query parameter is required"})
        }
        const movie = await Movie.find({
            title: { $regex: searchingName, $options: 'i' }  // $regex для пошуку по частковому співпадінню, $options: 'i' для ігнорування регістру
        })
        if(movie.length === 0){
            return response.status(404).json({message: "Movie not found"})
        }
        response.json(movie)
    }catch(err){
        response.status(500).json({message: err.message})
    }
});

router.get('/:id', async(request, response) => {
    try{
        const movie = await Movie.findById(request.params.id)
        if(!movie){
            response.sendStatus(404).json({message: "Movie not found"});
        }
        response.json(movie);
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

