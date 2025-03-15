 const express = require('express');
 const mongoose = require('mongoose');
 require('dotenv').config(); //підключаємо dotenv для доуступу до файлу .env
 const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes'); //підключаємо файл маршрутів фільмів

const app = express();

app.use(cors());
app.use(express.json()); // Обрабатываем JSON-запросы



 mongoose.connect("mongodb://localhost:27017/movies-app-ep-db")
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log("MongoDB connecting error", err))



app.use('/api', movieRoutes);

app.listen(5000, (err) => {
    err ? console.log(`Something went wrong:${err}`) : console.log("Listening in progress")
});


