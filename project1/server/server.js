require("dotenv").config();
const express = require("express");
const app = express();
const contactRouter = require('./router/contact-router');
const authRouter = require('./router/auth-router');
const serviceRouter = require('./router/service-router');
const adminRouter = require('./router/admin-router');
const cors = require('cors');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');

// Since your forntend server is running on 5000 and frontend is running on 5173
const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE,PATCH,HEAD",
    credentials: true
}
app.use(cors(corsOption))
// If the application wants to use or give json can easily give the json file we use
app.use(express.json())
/*
Parses JSON: The express.json() middleware is used to parse the body of incoming HTTP requests that have a Content-Type of application/json.
Adds Parsed Data to req.body: Once the JSON is parsed, it is stored in req.body, making it easily accessible in your route handlers.
*/

// The nodemon module is constantly using server.js to make it use other file include `use`
// Tecnical word: Mount the router
app.use('/api/auth',authRouter);
app.use('/api/form',contactRouter);
app.use('/api/data',serviceRouter);
app.use('/api/admin',adminRouter);
app.use(errorMiddleware)

// route the person visiting which page
// app.get("/",(req,res)=>{
//     // 200 is for success
//     res.status(200).send("Hello Omar to the Mern Stack Journey");
// })

// app.get("/registeration",(req,res)=>{
//     // 200 is for success
//     res.status(200).send("Hello Omar Welcome to Registeration page");
// })

// Run the server on the specific ports
const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`);
    });
})