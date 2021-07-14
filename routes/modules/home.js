const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

const sortList = {
  _id: {
    value: '_id',
    item: '新增時間',
    order: { _id: 'asc' }
  },
  nameAsc: {
    value: 'nameAsc',
    item: 'A -> Z',
    order: { name_en: 'asc' }
  },
  nameDesc: {
    value: 'nameDesc',
    item: 'Z -> A',
    order: { name_en: 'desc' }
  },
  category: {
    value: 'category',
    item: '類別',
    order: { category: 'asc' }
  },
  location: {
    value: 'location',
    item: '地區',
    order: { location: 'asc' }
  }
}

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants, sortList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sortBy = req.query.sortBy
  Restaurant.find()
    .lean()
    .sort(sortList[sortBy].order)
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants, sortList, keyword, sortBy })
    })
    .catch(error => console.error(error))
})

module.exports = router
