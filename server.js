require('dotenv').config();
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const PORT = process.env.PORT || 3001
const projects = require('./data/projects')
const skills = require('./data/skills')
const repos = require('./data/repos')
const fetchGithub = require('./utils/fetchGithub')

const app = express()

/** Define paths */
const publicPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

/** Set handlebars as view engine */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/** Use static assets */
app.use(express.static(publicPath))

app.use('', (req, res) => {
    fetchGithub('https://api.github.com/users/mojocodeio/repos')

    res.render('index', {
        title: 'Home page',
        name: 'Joey Schrader',
        projects,
        skills,
        repos,
    })
})

app.use('/blog', (req, res) => {

})

app.use('/blog/:title', (req, res) => {

})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})