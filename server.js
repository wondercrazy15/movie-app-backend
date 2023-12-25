const express = require('express')
const app = express()
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
require("dotenv").config()
const port = process.env.PORT || 5000;
const listEndpoints = require('express-list-endpoints')
const cors = require('cors')
const corsOpts = require('./helpers/corsOptions')

app.use(cors(corsOpts));
connectDb()
app.use(express.json())
app.use(errorHandler)
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/movies", require("./routes/movieRoutes"))

const Intro = (req, res) => {
    const endpoints = listEndpoints(app);
    res.json({
        'title': 'Movies-DB node api',
        'info': 'This Web app developed for adding, editing & listing movies.',
        'authorization': 'required',
        'endpoints': endpoints
    });
}
app.get('/', Intro);

app.listen(port, () => {
    console.log(`Server Running On Port ${port}`)
})