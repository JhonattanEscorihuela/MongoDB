const { default: mongoose } = require('mongoose');
let moongose = require('mongoose');

let videoSchema = new moongose.Schema({
    title: {
        type: String,
    },
    course: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
});

mongoose.model('Video', videoSchema);