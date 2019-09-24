var app = angular.module('hotel', []);
app.controller('dashboard', function($scope, $interval, $http, $timeout) {
    $scope.loadDash = function() {
        $http.get('/get/size').then(function(response) {
            $scope.size = response.data
        });

    }
});

// adding user dashboard


app.controller('adduser', function($scope, $interval, $http, $timeout) {
    $scope.createUser = function() {
        if ($scope.user.name && $scope.user.password && $scope.user.email && $scope.user.contact && $scope.user.cpassword) {
            if ($scope.user.password != $scope.user.cpassword) {
                $scope.error = 'Please enter same password.'
                $timeout(function() {
                    $scope.error = '';
                }, 3000);
            } else {
                $http.post('/add/user/data', $scope.user).then(function(res) {
                    $scope.error = res.data;
                    $scope.user = {}
                    $timeout(function() {
                        $scope.error = '';
                    }, 3000);
                })
            }
        } else {
            $scope.error = 'All field required to create new user';
            $timeout(function() {
                $scope.error = '';
            }, 3000);
        }
    }
});
app.controller('userSetting', function($scope, $interval, $http, $timeout) {
    $scope.changePass = function() {
        if ($scope.user.oldpass && $scope.user.newpass) {
            $http.post('/change/password', $scope.user).then(function(response) {
                $scope.user = {}
                $scope.message = response.data;
                $timeout(function() {
                    $scope.message = '';
                }, 3000);
            });
        } else {
            $scope.message = 'Please confirm the password.';
            $timeout(function() {
                $scope.message = '';
            }, 3000);
        }
    }
});



// bookinguser
app.controller('ctr1', function($scope, $timeout, $http) {
    $scope.bookinguserLogin = function() {
        if ($scope.bookinguserlog.email && $scope.bookinguserlog.password) {
            $http.post('/login/bookinguser', $scope.bookinguserlog).then(function(response) {
                console.log(response.data);

                if (response.data.status == 'bookinguserlogin') {
                    // console.log(response.data);
                    window.location = ('/');
                } else {
                    $scope.resp = response.data;

                    $scope.message = 'Please confirm the password.';
                    $timeout(function() {
                        $scope.res = '';
                        $scope.message = '';
                    }, 3000);
                }
            });
        } else {
            $scope.resp = 'All field required.';
            $scope.message = 'Enter valid values';
            $timeout(function() {
                $scope.resp = '';
                $scope.message = '';
            }, 3000)
        }
    }
})


app.controller('bookinguserctr', function($scope, $interval, $http, $timeout) {
    $scope.loadBookingNotif = function(id) {
        console.log('userId is ' + id);
        $http.get('/get/booking/notif/' + id).then(function(response) {
            $scope.notif = response.data;
        });
    }
    $scope.bookinguserSignup = function() {
        console.log($scope.bookinguser);

        //  to add booking user registration

        $http.post('/add/bookinguser/', $scope.bookinguser).then(function(res) {
            $scope.error = res.data;
            $scope.bookinguser = {}
            console.log("user saved client");
            $scope.message = res.data;
            $timeout(function() {
                $scope.message = '';
            }, 3000);
            window.location = ('/home')
        })

    }
});


//   front end page 
//controller of all view pages
//1. city controller
app.controller('cityController', function($scope, $http, $timeout) {
        $http.get('/get/images/location').then(function(res) {
            $scope.cities = res.data;
        });
        $http.get('/get/hotel').then(function(res) {
            $scope.hotels = res.data;
        });
        $http.get('/get/all/activity').then(function(res) {
            $scope.activities = res.data;
        });
    })
    // Hotel logo for facility
app.controller('bookingController', function($scope, $http, $timeout) {
    $scope.icon = ['fa-home', 'fa-bell', 'fa-home', 'fa-bell', 'fa-home', 'fa-bars', 'fa-bath', 'fa-bed'];
    $scope.loadHotelActivity = function(name) {
        $http.get('/get/images/hotelbyname/' + name).then(function(res) {
            $scope.hotels = res.data;
        });
        $http.get('/get/images/activitybylocation/' + name).then(function(res) {
            $scope.activities = res.data;
        });
    }


    $scope.checkBooking = function(hotelId, userId) {
        $scope.booking.userId = userId;
        $scope.booking.hotelId = hotelId;
        $http.post('/post/booking/hotel/', $scope.booking).then(function(response) {
            $scope.booking = {}
            console.log(response.data);
            $scope.responseMessage = response.data;
            $timeout(function() {
                $scope.responseMessage = '';
            }, 3000)
        })
    }

    $scope.loadMap = function(lat, lng) {
        console.log(lat, lng);
        mapboxgl.accessToken =
            'pk.eyJ1Ijoia2FtYWxzaGFoaTg5MTAiLCJhIjoiY2pwNmludXJjMTNmaDNvcDdpdDU0Z3VwOSJ9.TBq2M_d_jOH-RTZsMD6_tA';
        var map = new mapboxgl.Map({
            container: 'hotelmap', // container id
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [parseFloat(lng), parseFloat(lat)], // starting position
            zoom: 9 // starting zoom
        });
        new mapboxgl.Marker()
            .setLngLat([parseFloat(lng), parseFloat(lat)])
            .addTo(map);
        map.addControl(new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }), 'top-left')
    }
})