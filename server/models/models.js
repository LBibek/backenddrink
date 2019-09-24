var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/DrinkNepal').then(function(err) {
    console.log('Drink Nepal Mongodb Connect..Successfully.');
});
//models for super admin login
var super_admin = new Schema({
    username: {
        type: String,
        default: 'admin'
    },
    password: {
        type: String,
        default: 'admin'
    },
    created: Date,
});
exports.SuperAdmin = mongoose.model('SuperAdmin', super_admin);
//end
//models for admin login
var admin = new Schema({
    name: String,
    address: String,
    contact: Number,
    username: String,
    password: String,
    created: Date
});
exports.Admin = mongoose.model('Admin', admin);
//end
// models of location
var location = new Schema({
    district: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sub_category: [
        String
    ],
    tourism_area: String,
    location_description: String,
    created: Date
});
exports.Location = mongoose.model('Location', location);
//end

// models of map
var map = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    created: Date
})
exports.Map = mongoose.model('Map', map);
// end

// guiders model
var guiders = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    name_of_guider: String,
    description: String,
    image_url: String,
    address: String,
    Contact: Number,
    Created: Date
});
exports.Guiders = mongoose.model('Guiders', guiders);
// end
// MOdel for images and videos
var images_videos = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    file_url: String,
    file_type: String,
    description: String,
    created: Date
});
exports.Images_videos = mongoose.model('Images_videos', images_videos);
// end

// Hotel model
var hotel = new Schema({
    bookingStatus: {
        type: Boolean,
        default: false,

    },
    location: { type: String, ref: 'Location' },
    created: Date,
    description: String,
    hotel_name: String,
    exact_address: String,
    contact: String,
    price: Number,
    website: String,
    sub: [],
    rules: String,
    termsandconditions: String,
    lat: String,
    lng: String,
    hotel_images: [String],

})
exports.Hotel = mongoose.model('Hotel', hotel);
//end
// to add activity
var Activity = new Schema({
    bookingStatus: {
        type: Boolean,
        default: false,

    },
    name: String,
    exact_address: String,
    location: String,
    contact: String,
    description: String,
    highlights: String,
    lat: String,
    lng: String,
    duration: String,
    included: String,
    notincluded: String,
    activity_images: [String],
    price: String
});
exports.Activity = mongoose.model('Activity', Activity);
//model for special food 
var special_food = new Schema({
    food_name: String,
    occasion: String,
    location_id: {
        type: String,
        ref: 'Location'
    },
    image_url: String,
    description: String,
    created: String
});
exports.Special_food = mongoose.model('Special_food', special_food);
//end
//festivals of the locale
var festival = new Schema({
    festival_name: String,
    fall_on: Date,
    location_id: {
        type: String,
        ref: 'Location'
    },
    image_url: String,
    description: String,
    created: Date
});
exports.Festival = mongoose.model('Festival', festival);
//end of 
// models of the season (which season suit)
var season = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    safe_on: {
        from: Date,
        to: Date
    },
    risk_on: {
        from: Date,
        to: Date
    },
    description: String,
    created: Date
});
exports.Season = mongoose.model('Season', season);
// end of model
// model for problem faced
var problem = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    description: String,
    created: Date
});
exports.Problem = mongoose.model('Problem', problem);
//end of problem faced

// model for the cast and culture
var cast_culture = new Schema({
    location_id: {
        type: String,
        ref: 'Location'
    },
    casts: String,
    cultures: String,
    created: Date
});
exports.Cast_culture = mongoose.model('Cast_culture', cast_culture);
// end

// for client side user

var bookingusr = new Schema({

    fname: String,
    lname: String,
    email: String,
    address: String,
    contact: String,
    password: String,
    created: Date
});
exports.bookingusr = mongoose.model('Bookinguser', bookingusr);

// to book activity
var BookingActivity = new Schema({
    act_id: {
        type: String,
        ref: 'Activity'
    },
    location_id: {
        type: String,
        ref: 'Location'
    },
    Bookinguser_id: {
        type: String,
        ref: 'Bookinguser'
    },
    price: Number,
    nooftraveller: Number,
    bookingactdate: String,
    bookingStatus: {
        type: Boolean,
        default: false,

    },
    created: Date
});
// Booking activity
exports.BookingActivity = mongoose.model('BookingActivity', BookingActivity);

var hotel_booking = new Schema({
    hotelId: {
        type: String,
        ref: 'Hotel'
    },
    userId: {
        type: String,
        ref: 'Bookinguser'
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date,
    },
    adult: Number,
    children: Number,
    num_room: Number,
    bookingstatus: {
        type: Boolean,
        default: null
    },
    created: Date
});
exports.Booking = mongoose.model('Booking', hotel_booking);