const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

router.get('/restaurants', async (req, res) => {
    const {sortBy} = req.query;

    const sortOrder = sortBy && sortBy.toUpperCase() === 'DESC' ? -1 : 1


    try{
        const restaurants = await Restaurant.find({}, 'id cuisine name city restaurant_id')
            .sort({restaurant_id: sortOrder});
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/restaurants/cuisine/Japanese', async (req, res) => {
    try{
        const restaurants = await Restaurant.find({cuisine: 'Japanese'})
        res.json(restaurants)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/restaurants/cuisine/Bakery', async (req, res) => {
    try{
        const restaurants = await Restaurant.find({cuisine: 'Bakery'})
        res.json(restaurants)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/restaurants/cuisine/Italian', async (req, res) => {
    try{
        const restaurants = await Restaurant.find({cuisine: 'Italian'})
        res.json(restaurants)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.get('/restaurants/Delicatessan', async (req, res) => {
    try{
        const restaurants = await Restaurant.find(
            {cuisine: 'Delicatessen', city: {$ne: 'Brooklyn'}},
            'cuisine name city'
        )
        .sort({name: 1})

        res.json(restaurants)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router;