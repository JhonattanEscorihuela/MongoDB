let mongoose = require("mongoose");
let slugify = require("slugify");
let isMail = require('validator');


//  1. Definir el esquema


let courseSchema = new mongoose.Schema({
    // id: ObjectId -> Identificador unico de tu documento
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: [50, 'No se cumple la longitud minima de 50'],
        maxlength: 300,

    },
    numberOfTopics: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    publishedAt: {
        type: Date,
        select: false,
    },
    slug: {
        type: String,
        require: true,
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
        }
    ]
});

courseSchema.virtual('info')
    .get(function () {
        // this => documento
        return `${this.description}. Temas: ${this.numberOfTopics}. Fecha de lanzamiento: ${this.publishedAt}`
    })


/*
validate
save
remove
updateOne
deleteOne
init => sync
*/


courseSchema.pre('validate', function (next) {
    //Curso profesional de Moongose
    // curso-profesional-moongose
    this.slug = slugify(this.title);
    next();
});


// 2. Definir el modelo

mongoose.model("Course", courseSchema);

console.log(":D");

