const mongoose = require('mongoose');


const todoData = new mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    description : String,
    status :{
        type:Boolean,
        default:false
    }
    },
    {
        timestamps: true
    })

const todo = mongoose.model('todo',todoData);

module.exports = todo;