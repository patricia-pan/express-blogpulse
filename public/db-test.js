const db = require('../models')

// db.comment.create({
//     name: 'Nick Quandt',
//     content: 'This is really neat! Thanks for posting.',
//     articleId: 1
// }).then(comment => {
//     console.log(comment)
//     process.exit()
// })

db.article.findOne({
    where: {id: 1},
    include: [db.comment]
}).then(article => {
    console.log(article.comments)
    process.exit()
})





// const db = require('./models') // So we know which models we're pushing data into.

// db.comment.create({
//     name: 'Nick Quandt',
//     content: 'This is really neat! Thanks for writing this',
//     articleId: 1
// }).then(comment => {
//     console.log(comment)
//     process.exit()
// })



// db.article.findOne({
//     whee: {id: 1},
//     include: [db.comment]
// }).then(article => {
//     console.log(article.comments)
//     process.exit()
// })