const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantList.results)
  console.log('done')
})
