require('dotenv').config();
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const gmailEmailAddress = process.env.GMAIL_EMAIL_ADDRESS
const gmailPassword = process.env.GMAIL_PASSWORD
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

/** Set up nodemailer transporter */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmailAddress,
        pass: gmailPassword
    }
});

/** Set handlebars as view engine */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/** Use static assets */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(publicPath))

app.post('/contact', (req, res) => {
    console.log('Contact route hit')
    const { body } = req;
    console.log('BODY: ', body)
    const mailOptions = {
        from: 'sender@email.com', // sender address
        to: 'jschrader@mojocode.io', // list of receivers
        subject: 'Portfolio Inquiry', // Subject line
        html: '<p>Your html here</p>'// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });

})

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