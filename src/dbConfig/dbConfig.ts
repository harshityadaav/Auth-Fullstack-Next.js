import mongoose from 'mongoose';

export async function connect() {
    try {
        const MONGO_URL = 'mongodb+srv://harshityadav:Harshit1234@cluster0.pbkxn2f.mongodb.net/'
        mongoose.connect(MONGO_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}