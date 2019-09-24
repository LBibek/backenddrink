var pageController = require('../controllers/controllers');
var router = require('express').Router();
var multer = require('multer');
var uploads = multer({
    dest: './public/uploads'
});
var hotels = multer({
    dest: './public/hotels'
});
var activity = multer({
    dest: './public/activity'
});
// for login
router.get('/login', pageController.getLogin);
//end
//logout page 
router.get('/logout/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login')
});
// for backend logout
router.get('/user/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/')
});
// root redirecting to home
router.get('/', function(req, res) {
    res.redirect('/login');
});
//end
// getting actvity location
router.get('/activity/location', pageController.allLocationView);
// posting superadmin use this in postman
router.post('/post/new/user/admin', pageController.postSuperadmin);
//end
//posting location data
router.post('/post/location', pageController.postLocation);
// getting location data
router.get('/get/location', pageController.getLocation);
// to get location image
router.get('/get/images/location', pageController.getImagesByLocation);
// to delete location
router.post('/delete/location/:id', pageController.deleteLocation);
// to get location
router.get('/get/location/:locationid', pageController.getActivityPage);

//end
//api for posting login credentials
router.post('/login/newuser', pageController.postLogin);
// to get login
router.get('/login/newuser/app/:user/:name', pageController.postLogin1);
//end
//super admin dashboard
router.get('/dashboard/:id', pageController.getDashboard);
// home page ejs
router.get('/home', pageController.getHomePage);
//end
// to get location fy name
router.get('/get/location/by/name', pageController.getLocationByName)
    //saving images part of left content
router.post('/post/image/:id/:location', uploads.any(), pageController.postImageVideo);
// to get location image
router.get('/get/image/:location', pageController.getImageVideo);
// router.delete('/delete/left/image/:deleteId', pageController.deleteLeftImage);
// activity
// end
// saving hotel
router.post('/post/hotel/', hotels.any(), pageController.postHotel);
// to get data of hotel with location
router.get('/get/hotel/:location', pageController.getHotel);
// to get all hotel
router.get('/get/hotel', pageController.getallHotel);
// to get hotel with its id

router.get('/hotel/:profileId', pageController.getHotelPage);
// activity
router.post('/post/activity/', activity.any(), pageController.postActivity);
// to get all activity
router.get('/get/all/activity', pageController.getallActivity);
// router.get('/get/activity/', pageController.getActivity);
router.get('/activity/:activityId', pageController.getActivityPage);



//api of food
router.post('/post/food/:location', uploads.any(), pageController.postFood);
// to get food
router.get('/get/food/:location', pageController.getFood);
//end

// end
// router.get('/get/left/images/:eid', pageController.getSingleLeftImage);
//end
//dashboard router
// to add user backend
router.post('/add/user/data', pageController.addUser);
// to get user backend
router.get('/get/user/data', pageController.getUser);
//end
//changing user password
router.post('/change/password', pageController.changePass);
//end
//map to post and show location map
router.post('/post/weather/latlng', pageController.postMap);
router.get('/get/weather/latlng/:location', pageController.getMap);
//end
//getting user for editing
router.get('/edit/user/:id', pageController.editUser);
router.post('/update/user/:id', pageController.updateUser);
router.delete('/delete/user/:id', pageController.deleteUser);
//end

//for bookinguser
router.post('/add/bookinguser/', pageController.bookinguserSignup);


//for activity
router.post('/add/activity/data', pageController.addActivity);



// to add booking for activity
router.post('/add/bookingactivity/data', pageController.addBookingActivity);

// client side login
router.post('/login/bookinguser', pageController.postbookuserLogin);

// get hotel by location

router.get('/get/images/hotelbyname/:location', pageController.getHotelbyLocations);
//  get activity by location
router.get('/get/images/activitybylocation/:location', pageController.getActivityByLocation);
// to post hotel booking
router.post('/post/booking/hotel/', pageController.postBooking);
// to get booking
router.get('/get/booking/users/', pageController.getBookings);
// to get all users
router.get('/get/all/users/', pageController.getAlluser);
// to get booking notification
router.get('/get/booking/notif/:userId', pageController.getBookingNotif);

// end
router.post('/delete/hotel/:id', pageController.deletehotel);
router.post('/delete/activity/:id', pageController.deleteactivity);
// for accepting hotel booking
router.post('/accept/booking/:id', pageController.acceptBooking);
// for rejecting hotel booking
router.post('/reject/booking/:id', pageController.rejectBooking);

module.exports = router;