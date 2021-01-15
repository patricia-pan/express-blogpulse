let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /articles - create a new post
router.post('/', (req, res) => {
  db.article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.authorId
  })
  .then((post) => {
    res.redirect('/')
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/new - display form for creating new articles
router.get('/new', (req, res) => {
  db.author.findAll()
  .then((authors) => {
    res.render('articles/new', { authors: authors })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /articles/:id - display a specific post, its author, and all its comments.
router.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [ db.author, db.comment ]
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article, author: article.author, comments: article.comments }) // If we only passed in { article: article }, we would still have access to its author and comments, but I'm aliasing them as 'author' and 'comments' for ease of grabbing it in my .ejs file.
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
  // process.exit()
})

module.exports = router
