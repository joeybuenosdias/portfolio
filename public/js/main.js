console.log('You have discovered a secret client side message')
console.log('Please call 1-800-555-1234 to claim your prize')

const contactForm = document.getElementById('contact-form')
const name = document.getElementById('name')
const email = document.getElementById('email')
const message = document.getElementById('message')

const joey = { name: 'joey' }

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nameValue = name.value;
    const emailValue = email.value;
    const messageValue = message.value;
    console.log('nameValue', nameValue)
    console.log('emailValue', emailValue)
    console.log('messageValue', messageValue)



    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: JSON.stringify({ nameValue, emailValue, messageValue }),
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(data => console.log(data))
})