const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test")


const testSchema= new mongoose.Schema({
    name: String,
    number: Number

})

const Test= new mongoose.model("test",testSchema)


const test= new Test({
    name: "test",
    number: 1
})


test.save()