const express = require('express')
const planRoutes = express.Router()
const axios = require('axios')
const Location = require("../models/Location")
const Plan = require('../models/Plan')
const User = require('../models/User')


planRoutes.get('/getAllPlans', (req, res) => {
  Plan.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.post("/postNewPlan", (req, res) => {
    console.log(req.body.planCreator)

    const planCreator = req.body.planCreator
    const title = req.body.title
    const description = req.body.description
    const locations = req.body.locations
    const categories = req.body.categories
    const maxPrice = req.body.maxPrice
    const minPeople = req.body.minPeople
    const imagesUrls = req.body.imagesUrls
    const planDuration = locations.length

    const newPlan = new Plan({
        planCreator: planCreator,
        title: title,
        description: description,
        locations: locations,
        categories: categories,
        maxPrice: maxPrice,
        minPeople: minPeople,
        planDuration: planDuration,
        imagesUrls: imagesUrls, 
        likes: 0
    })

    Plan.create(newPlan)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.get("/getOnePlan/:id", (req, res) => {
    Plan.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.post("/getSearchResults", (req, res) => {
    const search = req.body.search
    axios
    .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${process.env.APIKEY}&sessiontoken=1c1ad85a-6167-47b1-81ea-6f827c654dac
    `)
    .then(response => {
        res.json(response.data.predictions)
    })
    .catch(err => console.log(err))
})

planRoutes.post("/getPlaceInfo", (req, res) => {
    const place_id = req.body.place_id
    axios
    .get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&fields=name,rating,formatted_address,price_level,website,photos&key=${process.env.APIKEY}`)
    .then(response => {
        let imgRef = (response.data.result.photos[0].photo_reference)
        axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference=${imgRef}&key=${process.env.APIKEY}`)
        .then(image =>{
            console.log(image.request.res.responseUrl)
            res.json(response.data)

        })
    })
    .catch(err => console.log(err))
})

planRoutes.post("/getPlacePhoto", (req, res) => {
    const ref = req.body.ref
    axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=700&photoreference=${ref}&key=${process.env.APIKEY}`)
    .then(image =>{
        console.log(image.request.res.responseUrl)
        res.json(image.request.res.responseUrl)

    })
    .catch(err => console.log(err))
})

planRoutes.post("/postNewLocation", (req, res) => {
    const name = req.body.name
    const address = req.body.address
    const photo = req.body.photo
    const rating = req.body.rating
    const website = req.body.website
    const price_level = req.body.price_level

    const newLocation = new Location({
        name: name,
        address: address,
        photo: photo,
        rating: rating,
        website: website,
        price_level: price_level
    })

    Location.create(newLocation)
    .then(data => res.json(data.id))
    .catch(err => console.log(err))
})

planRoutes.get("/getLocations/:id", (req, res) => {
    Location.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.post("/getUser", (req, res) => {
    const userId = req.body.userId
    User.findById(userId)
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.post("/increaseLikes", (req, res) => {
    const planId = req.body.planId
    Plan.findByIdAndUpdate(planId, {$inc: {likes: 1}}, {new: true})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

planRoutes.post("/setLikeInUser", (req, res) => {
    const planId = req.body.planId
    const userId = req.body.userId

    console.log(planId)
    console.log("user " + userId)


    User.findByIdAndUpdate(userId, {$push: {likedPlans: planId}}, {new: true})
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

module.exports = planRoutes