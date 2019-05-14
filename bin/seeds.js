const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Plan = require("../models/Plan")
const Location = require("../models/Location")

const bcryptSalt = 10

mongoose
  .connect('mongodb://localhost/server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

let users = [
  {
    username: "Enrique",
    password: bcrypt.hashSync("Enrique", bcrypt.genSaltSync(bcryptSalt)),
    image: "https://res.cloudinary.com/dpu9vjx43/image/upload/v1553705083/user1.jpg"
  },
  {
    username: "Raquel",
    password: bcrypt.hashSync("Raquel", bcrypt.genSaltSync(bcryptSalt)),
    image: "https://res.cloudinary.com/dpu9vjx43/image/upload/v1553705083/user2.jpg"
  }
]

let locations = [
  {
    name: "Be Hoppy",
    photo: "https://res.cloudinary.com/dpu9vjx43/image/upload/v1553706519/be-hoppy.png",
    address: "Calle de Almadén, 18, 28014 Madrid, Spain"
  },
  {
    name: "Brew Wild Pizza Bar",
    photo: "https://res.cloudinary.com/dpu9vjx43/image/upload/v1553706517/brew-wild.jpg",
    address: "Calle de Echegeray, 23, 28014 Madrid, Spain"
  },
  {
    name: "Fogg Bar Birras & Cheese",
    photo: "https://res.cloudinary.com/dpu9vjx43/image/upload/v1553706518/fogg-bar.jpg",
    address: "Calle de Moratín, 5, 28014 Madrid, Spain"
  }
]

let plans = [
  {
    planCreator: '5c9c953a7cc60a094fde366b',
    title: "Cervezas artesanales por Madrid Centro",
    description: "Ruta por bares especializados en cervezas artesanales por el centro de Madrid.",
    locations: ['5c9c953a7cc60a094fde366d','5c9c953a7cc60a094fde366e','5c9c953a7cc60a094fde366f'],
    categories: ["drinks", "friends"],
    maxPrice: 40,
    minPeople: 1,
    planDuration: 3,
    imagesUrls: ["https://res.cloudinary.com/dpu9vjx43/image/upload/v1553715099/beer.jpg"]
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

Location.deleteMany()
.then(() => {
  return Location.create(locations)
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

Plan.deleteMany()
.then(() => {
  return Plan.create(plans)
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})