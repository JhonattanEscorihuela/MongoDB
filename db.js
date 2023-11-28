let express = require('express');
let mongoose = require('mongoose');
let dotenv = require('dotenv');

dotenv.config();

let MONGODB_URL = process.env.URL_MONGODB;

let db = async () => {
    try {
        let con = await mongoose.connect(MONGODB_URL)
        console.log(`mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = db;



