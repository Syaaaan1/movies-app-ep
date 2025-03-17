const express = require('express')
const router = express.Router();
const Movie = require('../models/movieModel');
//const { request } = require('../app');

router.get('/all', async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    try{
        const movies = await Movie.find()
            .skip(skip)
            .limit(limit) //find() для пошуку, без колбеку(для фільтрування) тому що отримуємо всі фільми
        response.json(movies);  
    }catch(err){
        response.status(500).json({message: err.message});
    }
});

router.get('/search', async (request, response) => {
    try {
        if (!request.query.title && !request.query.genre && !request.query.rating && !request.query.releaseDate) {
            return response.status(400).json({ message: "At least one search parameter is required (title, genre, rating, or releaseDate)" });
        }//перевірка чи наявний хоч один параметр після search

        const filters = {};

        if (request.query.title) {
            filters.title = { $regex: request.query.title, $options: 'i' }; //$options: 'i' для ігнорування регістру
        }

        if (request.query.genre) {
            filters.genre = { $regex: request.query.genre, $options: 'i' };
        }

        if (request.query.rating) {
            filters.rating = { $gte: parseFloat(request.query.rating) };
        }

        if (request.query.releaseDate) {
            const releaseYear = new Date(request.query.releaseDate).getFullYear();//з дати отримаемо тільки рік

            if (!releaseYear) {
                return response.status(400).json({ message: "Invalid release date format" });
            }

            filters.releaseDate = { $gte: new Date(releaseYear, 0, 1), $lt: new Date(releaseYear + 1, 0, 1) };
        }

        const movies = await Movie.find(filters);

        if (movies.length === 0) {
            return response.status(404).json({ message: "Movies not found" });
        }

        response.json(movies);
    } catch (err) {
        response.status(500).json({ message: err.message });
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

router.delete('/delete/:id', async (request, response) => {
    try{
        const movieId = request.params.id;

        const movie = await Movie.findByIdAndDelete(movieId);

        if(!movie){
            response.status(404).json({message: "Movie not found"})
        }

        response.json({message: `Movie with ID ${movieId} successfully deleted`})
    }catch(err){
        response.status(500).json({message: err.message});
    }
})

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

