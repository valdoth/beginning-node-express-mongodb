const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database')

// create
// BlogPost.create({
//     title: "The mythes's Guide to Saving Time on Energy Bills",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonigh to dispense a masterclass in saving money\
//     topics, because once you get past the the boring bullet-point lists, a whole new world of thrifty nerdery opens up. \
//     You start spotting them everything at this time of year. They go like this:"
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })

// reading data
// select document
BlogPost.find({}, (error, blogpost) => {
    console.log(error, blogpost)
})

// filter document
BlogPost.find({
    title: "The Mythbuster's Guide to Saving Money on Energy Bills"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// regex
BlogPost.find({
    title: /The/
}, (error, blogpost) => {
    console.log(error, blogpost)
})


// find by unique id
let id = "62e0261adbdc7c01e663bc4b"
BlogPost.findById(id, (error, blogpost) => {
    console.log(error, blogpost)
})


// update
BlogPost.findByIdAndUpdate(id, {
    title: 'Update title'
}, (error, blogpost) => {
    console.log(error, blogpost)
})


// delete
// BlogPost.findByIdAndDelete(id, (error, blogpost) => {
//     console.log(error, blogpost)
// })
