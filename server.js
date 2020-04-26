require('dotenv').config();
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001

/** data */
const social = require('./data/social')
const projects = require('./data/projects')
const skills = require('./data/skills')
const staticRepos = require('./data/repos')

/** utils */
const fetchGithub = require('./utils/fetchGithub')

/** Route Variables */
const contactRoute = require('./routes/contact')

const app = express()

/** Define paths */
const publicPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

/** Set handlebars as view engine */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

/** Use static assets */
app.use(express.static(publicPath))

/** Routes Middleware */
app.use(contactRoute)

app.get('', (req, res) => {
    fetchGithub.then(repos => {
        res.render('index', {
            title: 'Home page',
            name: 'Joey Schrader',
            social,
            projects,
            skills,
            repos,
        })
    }).catch(err => {
        res.render('index', {
            title: 'Home page',
            name: 'Joey Schrader',
            social,
            projects,
            skills,
            repos: staticRepos,
        })
    })
})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})