const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("../backend/config/dbconnection")

const cors = require('cors');


const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

connectDb();
app.use(express.json());
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});