const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7efda45b1cf3fb37cf067d2a6e5ccb69&query=' + lat +',' + lon
    request( { url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to servers!', undefined)
        } else if(body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                description : body.current.weather_descriptions,
                temperature : body.current.temperature,
                feelslike : body.current.feelslike
            })
        }
    })
}


module.exports = forecast 