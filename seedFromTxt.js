const fs = require('fs')
const mongoose = require('mongoose')
const Restaurant = require("./models/Restaurant")
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI


const seedFromTxtFile = async() => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Connected to MongoDB")

        const data = fs.readFileSync("Restaurant-Seed-Data.txt", "utf8")

        const restaurants = JSON.parse(data);

        await Restaurant.insertMany(restaurants);

        console.log("Database seeded successfully from Restaurant-Seed-Data.txt")
        mongoose.connection.close()

    } catch (error) {
        console.error("Error seeding database", error)
        mongoose.connection.close()
    }
}

seedFromTxtFile()