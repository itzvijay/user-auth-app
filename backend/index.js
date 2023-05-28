const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/register",register);
app.use("/api/login",login);

const connectionString = process.env.DB_URL;
mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology: true})
.then(() => console.log("database connected succesfully"))
.catch((err) => console.log(err));

app.get("/",(req,res) =>{
    res.send("the server is used to authenticate the user data")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`the server is Listening on port ${PORT}`)
})