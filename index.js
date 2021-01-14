let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models') // We created a database called blogpulse_dev
let moment = require('moment')
let rowdy = require('rowdy-logger')
let app = express()

// npm install ...to download all our npm module dependencies listed in package.json
// createdb blogpulse_dv ...to create a database that all our models can be sent to, according to the config.json file that has our 'database name' 
// sequelize db:migrate ...to run migrations using the files under models (to create tables from our models) and the files under migrations (to know what has or hasn't yet been migrated)
// sequelize db:seed:all ...to populate our database with 2 authors and 2 articles (to upload data to our tables)

rowdy.begin(app) // Just shows us a table of all our routes in our terminal.

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false })) // Middleware that allows us to view information submitted through a form. (i.e. req.body.name)
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

// GET / - display all articles and their authors
app.get('/', (req, res) => {
  db.article.findAll({
    include: [db.author] // Including the table called author.
  }).then((articles) => {
    res.render('main/index', { articles: articles })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// I wanted to see what the 404 page looked like so I created a get route for it lol.
app.get('/404', (req, res) => {
  res.render('main/404')
})

// bring in authors and articles controllers
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))

var server = app.listen(process.env.PORT || 3000, () => {
  rowdy.print()
})

module.exports = server
