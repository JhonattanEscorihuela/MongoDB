let dotenv = require('dotenv');
let express = require('express');
let db = require('./db')

dotenv.config();

let app = express();
let PORT = process.env.PORT ;

db();

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.listen(PORT, () => console.log(`Server started in the port ${PORT}`));