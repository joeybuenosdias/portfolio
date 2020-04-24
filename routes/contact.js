const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

const gmailEmailAddress = process.env.GMAIL_EMAIL_ADDRESS
const gmailPassword = process.env.GMAIL_PASSWORD

/** Set up nodemailer transporter */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmailAddress,
        pass: gmailPassword
    }
});

router.post('/contact', (req, res) => {
    console.log('Contact route hit')
    const { body } = req;
    console.log('BODY: ', body)
    const mailOptions = {
        from: 'sender@email.com', // sender address
        to: 'jschrader@mojocode.io', // list of receivers
        subject: 'Portfolio Inquiry', // Subject line
        html: '<p>Your html here</p>'// plain text body
      }

      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     })
})

module.exports = router

