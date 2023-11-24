let mongoose = require("mongoose");

//  1. Definir el esquema


let courseSchema = new mongoose.Schema({

});



// 2. Definir el modelo

mongoose.model("Course", courseSchema);

console.log(":D");

