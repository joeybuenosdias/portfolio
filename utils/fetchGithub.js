const request = require('request');

const fetchGithub = (url) => {
    console.log('hello')
    request({
        url,
        json: true,
    }, (err, { body }) => {
        if (err) {
            console.log(err)
        } else {
            console.log(body)
        }
    })
}

module.exports = fetchGithub