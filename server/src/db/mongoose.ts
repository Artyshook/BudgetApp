import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = 'mongodb+srv://user:mkjbhg123@flascarddb.rjinsex.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch((err: Error) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err)
    process.exit();
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
