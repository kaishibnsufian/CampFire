const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62e6675a90f01e933cd4c223',
            location: `${cities[rand1000].city} ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, eveniet et? Ab quaerat illo, fuga delectus, eveniet quo quia impedit voluptates minima laboriosam quod? Magnam numquam error eaque alias ut.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ 
                    cities[rand1000].longitude,
                    cities[rand1000].latitude,
                ] 
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dr1ts3kut/image/upload/v1663040918/YelpCamp/vj0fhqpugwrfrw1fqw4a.jpg',
                  filename: 'YelpCamp/vj0fhqpugwrfrw1fqw4a'
                },
                {
                  url: 'https://res.cloudinary.com/dr1ts3kut/image/upload/v1663040918/YelpCamp/neujxxu0kys2xqc6ubby.jpg',
                  filename: 'YelpCamp/neujxxu0kys2xqc6ubby'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then( () => {
    mongoose.connection.close();
});