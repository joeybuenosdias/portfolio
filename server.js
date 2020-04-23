require('dotenv').config();
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const PORT = process.env.PORT || 3001
const social = require('./data/social')
const projects = require('./data/projects')
const skills = require('./data/skills')

/** should be able to remove this */
const staticRepos = require('./data/repos')
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
    fetchGithub.then(repos => {
        console.log('repos hit', social)
        res.render('index', {
            title: 'Home page',
            name: 'Joey Schrader',
            social,
            projects,
            skills,
            repos,
        })
    }).catch(err => {
        console.log('error hit', err)
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

app.use('/blog', (req, res) => {

})

app.use('/blog/:title', (req, res) => {

})

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})