const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes'); // Подключаем маршруты фильмов

const app = express();

app.use(cors());
app.use(express.json()); // Обрабатываем JSON-запросы

// Маршрут для главной страницы
app.get('/', (request, response) => {
    response.send("Главная страница");
});

// Маршруты для фильмов
app.use('/movies', movieRoutes);

module.exports = app;
