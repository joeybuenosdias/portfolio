const request = require('request');

const fetchGithub = new Promise((resolve, reject) => {
    request({
        headers: {
            'User-Agent': 'mojocodeio'
        },
        url: 'https://api.github.com/users/mojocodeio/repos',
        json: true,
        timeout: 1000,
    }, (err, res) => {
        if (err) {
            reject(err)
        } else if (res.body.message === 'Not Found') {
            reject(err)
        } else {
            resolve(res.body)
        }
    })
})

module.exports = fetchGithub