const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/contact-type', function (req, res) {
  res.render('contact-type')
})

router.post('/contact-type', function (req, res) {
  const answer = req.session.data['contact-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-type': 'Select what type of contact you had' }
    return res.render('contact-type')
  }
  res.redirect('/witness-present')
})

router.get('/witness-present', function (req, res) {
  res.render('witness-present')
})

router.post('/witness-present', function (req, res) {
  const answer = req.session.data['witness-present']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'witness-present': 'Select yes if someone else was present' }
    return res.render('witness-present')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-witness-present')
  }
  res.redirect('/contact-location')
})

router.get('/ineligible-witness-present', function (req, res) {
  res.render('ineligible-witness-present')
})

router.get('/contact-location', function (req, res) {
  res.render('contact-location')
})

router.post('/contact-location', function (req, res) {
  const answer = req.session.data['contact-location']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-location': 'Enter where the contact happened' }
    return res.render('contact-location')
  }
  res.redirect('/alien-description')
})

router.get('/alien-description', function (req, res) {
  res.render('alien-description')
})

router.post('/alien-description', function (req, res) {
  const answer = req.session.data['alien-description']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'alien-description': 'Enter a description of what the alien looked like' }
    return res.render('alien-description')
  }
  res.redirect('/your-name')
})

router.get('/your-name', function (req, res) {
  res.render('your-name')
})

router.post('/your-name', function (req, res) {
  const answer = req.session.data['your-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'your-name': 'Enter your full name' }
    return res.render('your-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('AC')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
