let dotenv = require('dotenv');
let express = require('express');
let db = require('./db');
require('./course');
require('./video');
let mongoose = require('mongoose');

dotenv.config();

let app = express();
let PORT = process.env.PORT;

db();

let Curso = mongoose.model('Course');
let Video = mongoose.model('Video');

app.get("/", (req, res) => {
    let page = 0;
    let perPage = 2;

    Curso.find({}, null, {
        limit: perPage,
        skip: page * perPage,
        sort: 'title'
    })
        .then(collection => {
            res.json(collection);
        })
        .catch(error => {
            res.json(error);
        })
});

app.get("/cursos", (req, res) => {
    Curso.find({}).then(docs => {
        res.json(docs);
    })
        .catch(error => {
            res.json(error)
        })
});

app.get("/cursos/:id", (req, res) => {
    let { id } = req.params;
    Curso.findById(id)
        .then(doc => {
            res.json(doc)
        })
        .catch(error => {
            console.error(error);
            res.json(error)
        })
});

app.put("/cursos/:id", (req, res) => {
    let { id } = req.params;
    // 1.  Actualizar multiplez vez 0 a N
    // Curso.updateMany({ numberOfTopics: 0 }, { publishedAt: new Date() })
    //     .then(r => {
    //         res.json(r)
    //     })
    //     .catch(error => {
    //         res.json(error)
    //     })

    //2. findByIdAndUpdate
    Curso.findByIdAndUpdate(id, { publishedAt: new Date() }, { new: true })
        .then(doc => {
            res.json(doc);
        })
        .catch(error => {
            res.json(error);
        })

    // 3. Encontrar primero el documento y luego guardarlo


});

app.delete("/cursos/:id", (req, res) => {
    let { id } = req.params;
    // 1.  Eliminar multiplez a la vez 0 a N
    // Curso.deleteMany({ numberOfTopics: 0 },)
    //     .then(r => {
    //         res.json(r)
    //     })
    //     .catch(error => {
    //         res.json(error)
    //     })

    //2. findByIdAndDelete
    Curso.findByIdAndDelete(id)
        .then(doc => {
            res.json(doc);
        })
        .catch(error => {
            res.json(error);
        })

    // 3. Encontrar primero el documento y luego eliminarlo


});

app.post('/cursos', (req, res) => {

    Curso.create({
        title: "Primer Curso de Java",
        description: 'kjaadsajkdsadhkdsakdjsajajdasdadlsaldsadsakdsalkdsa ola que haces bebe'
    })
        .then(doc => {
            res.json(doc);
        })
        .catch(error => {
            console.error(error);
            res.json(error)
        })
});


app.post('/videos', (req, res) => {
    Video.create({
        title: 'Primer video',
        course: '6561467c3a8fd9420ce660f3',
    })
        .then(video => {
            return Curso.findById('6561467c3a8fd9420ce660f3')
                .then(course => {
                    course.videos.push(video.id);
                    return course.save();
                })
        })
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.json(error);
        })
})


app.get('/videos', (req, res) => {
    Video.find()
        .populate('course')
        .then(videos => {
            res.json(videos);
        })
        .catch(error => {
            res.json(error);
        })
})

app.listen(PORT, () => console.log(`Server started in the port ${PORT}`));