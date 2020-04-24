console.log('You have discovered a secret client side message')
console.log('Please call 1-800-555-1234 to claim your prize')

const contactForm = document.getElementById('contact-form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const message = document.getElementById('message')
const submitButton = document.getElementById('submit-button')

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nameValue = name.value
    const emailValue = email.value
    const messageValue = message.value

    fetch('/contact', {
        method: 'POST',
        body: JSON.stringify({ nameValue, emailValue, messageValue }),
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(res => res.json())
    .then(data => {
        if (data.accepted.length) {
            name.value = ''
            email.value = ''
            message.value = ''
            submitButton.textContent = 'Message Sent!'
            submitButton.style.backgroundColor = 'white'
            submitButton.style.color = '#0a8054'
            submitButton.style.border = '#0a8054'
            submitButton.disabled = true
        } else {
            submitButton.textContent = 'Oops!'
            submitButton.style.backgroundColor = 'white'
            submitButton.style.color = 'red'
            submitButton.style.border = 'red'
            submitButton.disabled = true
        }
    })
    .catch(err => {
        submitButton.textContent = 'Oops!'
        submitButton.style.backgroundColor = 'white'
        submitButton.style.color = 'red'
        submitButton.style.border = 'red'
        submitButton.disabled = true
    })
})