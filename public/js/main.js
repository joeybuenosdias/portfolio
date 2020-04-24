console.log('You have discovered a secret client side message')
console.log('Please call 1-800-555-1234 to claim your prize')

const contactForm = document.getElementById('contact-form')

const joey = { name: 'joey' }

contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: 'hello world'
    }).then(data => console.log(data))
})