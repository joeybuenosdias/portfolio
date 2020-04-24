const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

const gmailTransport = process.env.GMAIL_TRANSPORT_ACCOUNT
const gmailPassword = process.env.GMAIL_PASSWORD
const gmailAccount = process.env.GMAIL_MOJO

/** Set up nodemailer transporter */
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailTransport,
        pass: gmailPassword
    }
});

router.post('/contact', (req, res) => {
    const { body } = req;
    const mailOptions = {
        from: `${body.emailValue}`, // sender address
        to: gmailAccount, // list of receivers
        subject: 'Portfolio Inquiry', // Subject line
        html: `<section><h1>Sender Email: ${body.emailValue}</h1><h1>Sender Email: ${body.nameValue}</h1><p>${body.messageValue}</p></section>`
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if(err)
          res.send(err)
        else
          res.send(info)
     })
})

module.exports = router

