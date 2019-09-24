var model = require('../models/models');

exports.getLocationByName = function(req, res) {
    model.Location.find().select('district -_id').exec(function(err, resp) {
        res.send(resp);
    })
}
var fs = require('fs');
//superadmin adding user uses this code to generate super user for the first time
exports.postSuperadmin = function(req, res) {
    var newUser = model.SuperAdmin({
        username: 'himalayanodysseys',
        password: 'admin'
    });
    newUser.save(function(err, response) {
        if (err) {
            res.json({
                error: err
            })
        } else {
            res.json({
                message: 'New user Created'
            })
        }
    })
};
//end
//super admin page
exports.getDashboard = function(req, res) {
    if (req.session.status == true) {
        res.render('dashboard', {
            pid: req.params.id,
            data: req.session.data
        })
    } else {
        res.redirect('/login')
    }
}



exports.getHome = function(req, res) {

        res.render('dashboard')

    }
    //end
    //login page 
exports.getLogin = function(req, res) {
        if (req.session.status == true) {
            if (req.session.userType == 'admin') {
                res.redirect('/dashboard/home');
            } else if (req.session.userType == 'user') {
                res.redirect('/');
            }
        } else {
            res.render('login', { user: req.session.data1, loginStatus: req.session.status1 });
        }
    }
    //end
    //left contents crud operation
exports.postImageVideo = function(req, res) {
    req.files.forEach(function(file) {
        var filename = (new Date).valueOf() + '-' + file.originalname.replace(/\s/g, '');
        fs.rename(file.path, './public/uploads/' + filename, function(err) {
            if (err) {
                res.send('File data error. Please Try again');
            } else {
                console.log('requested files of hotels' + req.files);
                var data = req.body;
                var saveImage = model.Images_videos({
                    location_id: req.params.location,
                    file_url: '/uploads/' + filename,
                    file_type: req.params.id,
                    description: data.description,
                    created: Date.now()
                });
                saveImage.save(function(err, response) {
                    if (err) {
                        res.send('File data error. Try again');
                    } else {
                        res.send('Saved Data Successfully');
                    }
                });
            }
        })
    });
}
exports.getImageVideo = function(req, res) {
    model.Images_videos.find({
        location_id: req.params.location
    }, function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
        }
    })
};
// hotel posting
exports.postHotel = function(req, res) {
        // console.log(req.body);
        // console.log(req.headers.data);
        var facilities = JSON.parse(req.headers.data);
        console.log(facilities);


        var fileNames = [];
        var data = req.body;
        // console.log(req.files);

        console.log(data);
        req.files.forEach(function(file) {
            var filename = (new Date).valueOf() + '-' + file.originalname;
            fs.rename(file.path, './public/hotels/' + filename, function(err) {
                if (err) {
                    // res.send('Server error');
                    console.log(err);
                } else {
                    // console.log(filename);
                    fileNames.push(filename)
                }
            })
        });
        setTimeout(function() {
            // console.log(fileNames);
            var hotel = model.Hotel({
                location: data.location,
                description: data.description,
                hotel_name: data.hotel_name,
                exact_address: data.exact_address,
                contact: data.contact,
                price: data.price,
                website: data.address,
                sub: Object.keys(facilities),
                rules: data.rules,
                termsandconditions: data.termsandconditions,
                lat: data.lat,
                lng: data.lng,
                hotel_images: fileNames,
                created: Date.now(),
            });
            hotel.save(function(err, response) {
                if (err) {
                    // res.send('Error while saving');
                    console.log(err);

                } else {
                    // console.log('saved data ' + response);
                    res.send('Save hotels')
                        // res.json('Hotel has been saved.');
                }
            });
        }, 1000)

    }
    //getting hotels single
exports.getHotel = function(req, res) {
    model.Hotel.find({
        location_id: req.params.location
    }, function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
        }
    })
};
//getting hotels
exports.getallHotel = function(req, res) {
    model.Hotel.find(function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
        }
    })
};
//getting hotels page
exports.getHotelPage = function(req, res) {
        model.Hotel.findById(req.params.profileId, function(err, resp) {
            res.render('hotelProfile', { data: resp, user: req.session.data1, loginStatus: req.session.status1 })
        })
    }
    //end
exports.deletehotel = function(req, res) {
    var hotelId = req.params.id;
    console.log(hotelId);

    model.Hotel.findByIdAndDelete(hotelId, function(err, response) {
        if (err) {
            res.send('Error on deleting')
        } else {
            res.send('Deleting hotel successfully.');
        }
    })
}


exports.deleteactivity = function(req, res) {
    var activityId = req.params.id;
    console.log(activityId);

    model.Activity.findByIdAndDelete(activityId, function(err, response) {
        if (err) {
            res.send('Error on deleting')
        } else {
            res.send('Deleting activity successfully.');
        }
    })
}



// activity posting
exports.postActivity = function(req, res) {
        var _fileName = [];
        var data = req.body;
        req.files.forEach(function(file) {
            var filename = (new Date).valueOf() + '-' + file.originalname;
            fs.rename(file.path, './public/activity/' + filename, function(err) {
                if (err) {
                    // res.send('Server error');
                    console.log(err);
                } else {
                    // console.log(filename);
                    _fileName.push(filename)
                }
            })
        });
        setTimeout(function() {
            console.log(_fileName);
            var activity = model.Activity({
                name: data.name,
                exact_address: data.exact_address,
                location: data.location,
                contact: data.contact,
                description: data.description,
                highlights: data.highlights,
                lat: data.lat,
                lng: data.lng,
                duration: data.duration,
                included: data.included,
                notincluded: data.notincluded,
                activity_images: _fileName,
                price: data.price
            });
            activity.save(function(err, response) {
                if (err) {
                    res.send('Error while saving');
                } else {
                    // console.log('saved data ' + response);
                    res.send('Save Activity')
                        // res.json('Hotel has been saved.');
                }
            });
        }, 1000)
    }
    // getting activity
exports.getActivity = function(req, res) {
    model.Activity.find({
        location_id: req.params.location
    }, function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
        }
    })
};
// to get all activity

exports.getallActivity = function(req, res) {
    model.Activity.find(function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
        }
    })
};
// to get all activity


exports.getActivityPage = function(req, res) {
    model.Activity.findById(req.params.activityId, function(err, resp) {
        res.render('activityProfile', { data: resp, user: req.session.data1, loginStatus: req.session.status1 })
    })
}

// for home page


exports.getHomePage = function(req, res) {
    res.render('home', { data: '', user: req.session.data1, loginStatus: req.session.status1 })
}
exports.allLocationView = function(req, res) {
    // model.Activity.findById(req.params.activityId, function(err, resp){
    res.render('allLocation', { data: '', user: req.session.data1, loginStatus: req.session.status1 })
        // })
}

//posting food
exports.postFood = function(req, res) {
        var data = req.body;
        req.files.forEach(function(file) {
            var filename = (new Date).valueOf() + '-' + file.originalname.replace(/\s/g, '');
            fs.rename(file.path, './public/uploads/' + filename, function(err) {
                if (err) {
                    res.send('File data error. Try again');
                } else {
                    var saveImage = model.Special_food({
                        location_id: req.params.location,
                        food_name: data.food_name,
                        occasion: data.occasion,
                        image_url: '/uploads/' + filename,
                        description: data.description,
                        created: Date.now()
                    });
                    saveImage.save(function(err, response) {
                        if (err) {
                            res.send('File data error. Try again');
                        } else {
                            res.send('Saved Food Successfully');
                        }
                    });
                }
            })
        });

    }
    //getting food
exports.getFood = function(req, res) {
    model.Special_food.find({
        location_id: req.params.location
    }, function(err, response) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(response);
            console.log(response);

        }
    })
};
//end
// super admin login
exports.postLogin = function(req, res) {
    var data = req.body;
    if (data.username && data.password) {
        model.SuperAdmin.findOne({
            username: data.username,
            password: data.password
        }, function(err, response) {
            if (err) {
                req.session.status = false;
                res.send('Database error');
            } else if (!response) {
                req.session.status = false;
                res.send('Username and password not matched.');
            } else {
                req.session.status = true;
                req.session.data = response;
                res.send({
                    data: response,
                    status: 'admin_login'
                });
            }
        });
    } else {
        res.send('Username and password required.');
    }
}

// to post booking user login

exports.postbookuserLogin = function(req, res) {
        var data = req.body;
        console.log("hit");
        if (data.email && data.password) {
            model.bookingusr.findOne({
                email: data.email,
                password: data.password
            }, function(err, response) {
                if (err) {
                    req.session.status = false;
                    res.send('Database error');
                } else if (!response) {
                    req.session.status = false;
                    res.send('Username and password not matched.');
                } else {
                    req.session.status1 = true;
                    req.session.data1 = response;
                    res.send({
                        data: response,
                        status: 'bookinguserlogin'
                    });
                }
            });
        } else {
            res.send('Username and password required.');
        }
    }
    //normal user login
exports.postLogin1 = function(req, res) {
        var data = req.params;
        model.Admin.findOne({
            username: data.user,
            password: data.name
        }, function(err, response) {
            if (err) {
                res.send('Database error');
            } else if (!response) {
                res.send('Username and password not matched.')
            } else {
                res.send(response);
            }
        });
    }
    //adding user 
exports.addUser = function(req, res) {
        var data = req.body;
        var dd = model.Admin({
            name: data.name,
            address: data.address,
            username: data.email,
            password: data.password,
            created: Date.now()
        });
        dd.save(function(err, response) {
            if (err) {
                res.send('Error on creating user.');
            } else {
                res.send('Successfully created user.');
            }
        });
    }
    //end
    //adding bookinguser 
exports.bookinguserSignup = function(req, res) {
        var data = req.body;
        console.log(data);
        var bookingusr = model.bookingusr({
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            address: data.address,
            contact: data.contact,
            password: data.password,
            created: Date.now()
        });
        bookingusr.save(function(err, response) {
            if (err) {
                res.send('Error on creating user.');
            } else {
                res.send('Successfully created user.');
            }
        });
    }
    //end

//getting all the user data for super admin
exports.getUser = function(req, res) {
        model.Admin.find(function(err, response) {
            if (err) {
                res.send('Error on getting data.')
            } else {
                res.send(response);
            }
        });
    }
    //end
    // /changing admin password
exports.changePass = function(req, res) {
        var data = req.body;
        model.SuperAdmin.findOneAndUpdate({
            password: data.oldpass
        }, {
            password: data.newpass
        }, function(err, response) {
            if (!response) {
                res.send('Incorrect password.')
            } else {
                res.send('Changed password')
            }
        })
    }
    // end
    //end
    //end
    // for editing user
exports.editUser = function(req, res) {
    model.bookingusr.findById(req.params.id, function(err, data) {
        if (err) {
            res.send('File data error. Try again');
        } else {
            res.send(data);
        }
    });
};
//end
// for updating user
exports.updateUser = function(req, res) {
    var data = req.body;
    model.bookingusr.findByIdAndUpdate(req.params.id, {
        fname: data.fname,
        lname: data.lname,
        address: data.address,
        contact: data.contact,
        email: data.email,
        password: data.password,
        userType: data.userType,
        created: Date.now()
    }, function(err, response) {
        if (err) {
            res.send('Error try again');
        } else {
            res.send('Update Data');
        }
    });
};
// for deleting user
exports.deleteUser = function(req, res) {
        model.bookingusr.findByIdAndRemove(req.params.id, function(err, resp) {
            if (err) {
                res.send('Error on deleting')
            } else {
                res.send('User Deleted');
            }
        });
    }
    // location adding
exports.postLocation = function(req, res) {
        var data = req.body;
        console.log(req.body);
        console.log(Object.keys(data.sub));
        var location = model.Location({
            district: data.district,
            category: data.category,
            sub_category: Object.keys(data.sub),
            tourism_area: data.tourism_area,
            location_description: data.area_description,
            created: Date.now()
        });
        location.save(function(err, result) {
            if (err) {
                res.send({
                    message: 'Server error',
                })
                console.log(err);
            } else {
                res.send('Saved Successfully location.')
            }
        })
    }
    // end

//getting location of the 
exports.getLocation = function(req, res) {
        model.Location.find(function(err, result) {
            // res.render('home', {data: resp})
            if (err) {
                res.json({
                    message: 'Error on getting data',
                    error: err
                })
            } else {
                res.send(result)
                    //custom model
            }
        });
    }
    // images of location
exports.getImagesByLocation = function(req, res) {
    model.Images_videos.find()
        .populate('location_id ', 'tourism_area')
        .select('file_url')
        .exec(function(err, result) {
            // res.render('home', {data: resp})
            if (err) {
                res.json({
                    message: 'Error on getting data',
                    error: err
                })
            } else {
                res.send(result)
                    //custom model
            }
        })
}

//end
//deleting location
exports.deleteLocation = function(req, res) {
        var locationId = req.params.id;
        console.log(locationId);

        model.Location.findByIdAndDelete(locationId, function(err, response) {
            if (err) {
                res.send('Error on deleting')
            } else {
                res.send('Deleting location successfully.');
            }
        })
    }
    //end
    //posting map
exports.postMap = function(req, res) {
        console.log(req.body);
        var data = req.body;
        model.Map.findOne({
            location_id: data.location
        }, function(err, resp) {
            if (!resp) {
                var map = model.Map({
                    location_id: data.location,
                    lat: data.lat,
                    lng: data.lng,
                    created: Date.now()
                });
                map.save(function(err, resp) {
                    if (err) {
                        res.send('Error on saving Map.')
                    } else {
                        res.send('Saved Map Successfully');
                    }
                })
            } else {
                model.Map.findOneAndUpdate({
                    location_id: data.location
                }, {
                    latitude: data.lat,
                    longitude: data.lng,
                    created: Date.now()
                }, function(err, resp) {
                    if (err) {
                        res.send('Error on saving map.')
                    } else {
                        res.send('update map successfully.');
                    }
                });
            }
        });
    }
    //end
    //getting map of the user
exports.getMap = function(req, res) {
        console.log(req.params.location);

        model.Map.findOne({
            location_id: req.params.location
        }, function(err, resp) {
            if (err) {
                res.send('error on getting weather.')
            } else {
                res.send(resp);
                console.log(resp);

            }
        });
    }
    //end

// to add activity
exports.addActivity = function(req, res) {
    var data = req.body;
    console.log(data);
    var act = model.Activity({
        act_name: data.act_name,
        location_id: data.location_id,
        bookinguser_id: data.bookinguser_id,
        price: data.price,
        bookingactdate: data.bookingactdate,
        nooftraveller: data.nooftraveller,
        created: Date.now()
    });
    act.save(function(err, response) {
        if (err) {
            res.send('Error on creating activity.');
        } else {
            res.send('Successfully created activity.');
        }
    });
}


// to add booking

exports.addBookingActivity = function(req, res) {
        var data = req.body;
        var act = model.BookingActivity({
            act_name: data.act_name,
            location_id: data.locationId,
            bookinguser_id: data.bookinguser_id,
            price: data.price,
            bookingactdate: data.bookingactdate,
            bookingstatus: data.bookingstatus,
            nooftraveller: data.nooftraveller,
            created: Date.now()
        });
        act.save(function(err, response) {
            if (err) {
                res.send('Error on posting.');
            } else {
                res.send('Successfully Checking.');
            }
        });
    }
    //booking activity
exports.addUser = function(req, res) {
    var data = req.body;
    var dd = model.Admin({
        name: data.name,
        address: data.address,
        username: data.email,
        password: data.password,
        created: Date.now()
    });
    dd.save(function(err, response) {
        if (err) {
            res.send('Error on creating user.');
        } else {
            res.send('Successfully created user.');
        }
    });
}


// hotel by location
exports.getHotelbyLocations = function(req, res) {
    model.Hotel.find({ location: req.params.location }, function(err, response) {
        res.send(response);
        console.log(response);

    })
}
exports.getActivityByLocation = function(req, res) {
        model.Activity.find({ location: req.params.location }, function(err, response) {
            res.send(response);
            console.log(response);
        })
    }
    // end
    // post booking

exports.postBooking = function(req, res) {
        var data = req.body;
        var booking = model.Booking({
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            adult: data.adult,
            children: data.children,
            num_room: data.num_room,
            userId: data.userId,
            hotelId: data.hotelId,
            created: Date.now()
        });
        booking.save(function(err, response) {
            if (err) {
                res.send("Error on booking")
            } else {
                res.send('Checking booking request. You will be notified soon.')
            }
        })
    }
    // for getting booking
exports.getBookings = function(req, res) {
        model.Booking.find()
            .populate('hotelId')
            .populate('userId')
            .exec(function(err, response) {
                if (err) {
                    console.log(err);

                    res.send("Error on getting booking")
                } else {
                    res.send(response)
                }
            })
    }
    // to get all user
exports.getAlluser = function(req, res) {
    model.bookingusr.find()
        .exec(function(err, response) {
            if (err) {
                console.log(err);

                res.send("Error on getting booking")
            } else {
                res.send(response)
            }
        })
}

// accept aand reject hotel booking
exports.acceptBooking = function(req, res) {
        model.Booking.findByIdAndUpdate(req.params.id, {
            bookingstatus: true
        }, function(err, response) {
            if (err) {
                res.send('Server error')
            } else {
                res.send('Booking accepted.')
            }
        })
    }
    // to rejecct booking from admin dashboard
exports.rejectBooking = function(req, res) {
        model.Booking.findByIdAndUpdate(req.params.id, {
            bookingstatus: false
        }, function(err, response) {
            if (err) {
                res.send('Server error')
            } else {
                res.send('Booking reject.')
            }
        })
    }
    // end
    // for booking notification

exports.getBookingNotif = function(req, res) {
    model.Booking.find({ userId: req.params.userId })
        .populate('hotelId')
        .exec(function(err, response) {
            if (err) {
                res.send('error')
            } else {
                res.send(response);
            }
        })
}