require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 5000; // Беремо порт из .env фбо 5000
const MONGO_URI = process.env.MONGO_URI; // mongodb

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
