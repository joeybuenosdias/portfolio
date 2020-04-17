const request = require('request');

const fetchGithub = (url) => {
    request({
        headers: {
            'User-Agent': 'mojocodeio'
        },
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