var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default:null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {Todo};

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String
//     },
//     completed:{
//         type: Boolean
//     },
//     completedAt: {
//         type: Number
//     }
// });

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true

//     },
//     completed:{
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default:null
//     }
// });


// var newTodo = new Todo({
//     text:'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
    
// }, (e) => {
//     console.log('Unable to save Todo',e);
    
// });

// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed:true,
//     completedAt:123
// });
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
    
// }, (e) => {
//     console.log('Unable to Add otherTodo', e);
    
// })

// var otherTodo2 = new Todo({
//     text: 'Edit the video',
// });
// otherTodo2.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
    
// }, (e) => {
//     console.log('Unable to Add otherTodo', e);
    
// });