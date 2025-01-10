import app from './app.js';
import connectDB from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 27017, () => {
            console.log(`Server is running on port ${process.env.PORT || 27017}`);
        });
    })
    .catch((error) => {
        console.error('MongoDb connection failed: ', error);
        throw error;
    });