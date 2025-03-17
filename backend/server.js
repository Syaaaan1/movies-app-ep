require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 5000; // Берем порт из .env или 5000
const MONGO_URI = process.env.MONGO_URI; // URI для MongoDB

// Подключение к MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
