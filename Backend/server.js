const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const schoolRoutes = require('./routes/schoolRoute')
const userRoutes = require('./routes/userRoute')
const connectDB = require('./DB/db')
dotenv.config();
const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("School management API is running");
});

app.use('/api/schools', schoolRoutes);
app.use('/api/users', userRoutes)

const PORT = process.env.PORT
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
