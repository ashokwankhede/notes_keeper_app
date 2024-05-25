import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js';
import notesRoute from './routes/listRoutes.js';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';



dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    dbName: 'keeper_database', 
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to the MongoDB!");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});



const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use("/api/user",userRoute);
app.use("/api/notes",notesRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message  = err.message || "Internal Server Error";
    const status = err.status || false;

    return res.status(statusCode).json({
        status: status,
        message: message
    });
  });