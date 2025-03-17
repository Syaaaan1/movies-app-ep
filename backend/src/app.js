const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes'); // Підключаемо маршрути фільмів

const app = express();

app.use(cors());
app.use(express.json()); // Обрабатываем JSON-запросы

app.get('/', (request, response) => {
    response.send("Главная страница");
});

app.use('/movies', movieRoutes);//співставляемо роутер з кінцевою точкою 

module.exports = app;
