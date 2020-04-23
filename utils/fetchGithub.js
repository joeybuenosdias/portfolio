const request = require('request');

const fetchGithub = new Promise((resolve, reject) => {
    request({
        headers: {
            'User-Agent': 'mojocodeio'
        },
        url: 'https://api.github.com/users/mojocodeio/repos',
        json: true,
    }, (err, { body }) => {
        if (err) {
            reject(err)
        } else if (body.message === 'Not Found') {
            reject(err)
        } else {
            resolve(body)
        }
    })
})

module.exports = fetchGithub