const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const port = process.env.PORT || 3000;

dotenv.config();

//Connect to DB
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
)

//Import routes
const usersRoute = require('./routes/users');
const classesRoute = require('./routes/classes');

//Middleware
app.use(express.json());
app.use(cors());

//Route middleware
app.use('/api/users', usersRoute);
app.use('/api/classes', classesRoute);

//Client route
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

//Port listener
app.listen(port, () => console.log("Server is running."));