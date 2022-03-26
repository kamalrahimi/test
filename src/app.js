const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: "Weather App",
        name: 'kamal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'kamal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hello this is a message for you',
        title: 'Message',
        name: 'kamal'
    })
})
app.use(express.static(path.join(__dirname, '../public')))

app.use('/help' , express.static(path.join(__dirname, '../public/help.html')))

app.use('/about', express.static(path.join(__dirname, '../public/about.html')))

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error }) 
        } else {
            forecast(latitude, longitude, (error, {description, temperature, feelslike}) =>{
                if(error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    description: description + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.',
                    address: req.query.address
                })
            
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'kamal',
        message: 'Help article nort found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'kamal',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})