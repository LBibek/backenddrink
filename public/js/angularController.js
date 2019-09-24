  //getting map api lat and longititude

  //end
  var app = angular.module('sinageApp', []);
  app.directive('ckEditor', function() {
      return {
          require: '?ngModel',
          link: function($scope, elm, attr, ngModel) {

              var ck = CKEDITOR.replace(elm[0]);

              ck.on('instanceReady', function() {
                  ck.setData(ngModel.$viewValue);
              });

              ck.on('pasteState', function() {
                  $scope.$apply(function() {
                      ngModel.$setViewValue(ck.getData());
                  });
              });

              ngModel.$render = function(value) {
                  ck.setData(ngModel.$modelValue);
              };
          }
      };
  })
  app.controller('leftContentController', function($scope, $interval, $http, $timeout) {
      function readURL(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();

              reader.onload = function(e) {
                  $('#blah').attr('src', e.target.result);
              }

              reader.readAsDataURL(input.files[0]);
          }
      }

      $("#file").change(function() {
          readURL(this);
      });
      //left part of sinage
      $scope.saveLeftImage = function(id, uid) { //crud of saving left images
              $scope.loading = true;
              if ($scope.left.text) {
                  console.log($scope.left);

                  $http.post('/post/left/' + id + '/' + uid, $scope.left).then(function(res) {
                      $scope.success = res.data;
                      $scope.loading = false;
                      $scope.left = {};
                  });
              } else {
                  var formData = new FormData;
                  for (key in $scope.left) {
                      formData.append(key, $scope.left[key]);
                  }
                  var file = $('#file')[0].files[0];
                  formData.append('image', file);
                  console.log(formData);
                  $http.post('/post/left/' + id + '/' + uid, formData, {
                      transformRequest: angular.identity,
                      headers: {
                          'Content-Type': undefined
                      }
                  }).then(function(res) {
                      $scope.success = res.data;
                      $scope.loading = false;
                      $scope.left = {};
                  });
              }
          }
          //getting img inside form
      $scope.load = function(uid) {
              $http.get('/get/left/image/' + uid).then(function(res) {
                  $scope.left = res.data;
              });
              $interval(function() {
                  $http.get('/get/left/image/' + uid).then(function(res) {
                      $scope.left = res.data;
                  });
              }, 1000)
          }
          //crud of image contents
      $scope.loadd = function(uid) {
              $http.get('/get/left/image/' + uid).then(function(res) {
                  console.log(res.data);

                  $scope.dat = res.data[0];
                  $scope.text = new Array();
                  for (var k = 0; k < res.data.length; k++) {
                      if (res.data[k].type == 'text') {
                          $scope.text = res.data[k].text;
                      } else {
                          $scope.text = 'No data yet'
                      }
                  }
                  var time = [1000, 2000, 4000];
                  var length = res.data.length;
                  var i = 0;
                  $interval(function() {
                      if (i >= length - 1) {
                          i = 0;
                      } else {
                          i = i + 1;
                      }
                      if (res.data[i].type == 'image') {
                          $scope.dat = res.data[i];
                      }
                      if (res.data[i].type == 'video') {
                          $scope.dat = res.data[i];
                      }
                  }, 3000);
              });
          }
          // deleting img

      $scope.deleteLeftImage = function(id) {
          $scope.sure = function() {
              $http.delete('/delete/left/image/' + id).then(function(resData) {
                  $scope.success = resData.data;
                  $timeout(function() {
                      $scope.success = ''
                  }, 3000)
              });
          }
      };
      $scope.editLeftImage = function(id) {
          $http.get('/get/left/images/' + id).then(function(resData) {
              $scope.getData = resData.data;
          });
      };
      //end
      //updating image
      $scope.updateLeftImage = function(id) {
          var formData = new FormData;
          for (key in $scope.getData) {
              formData.append(key, $scope.getData[key]);
          }
          var file = $('#file')[0].files[0];
          formData.append('image', file);
          if (!file) {
              $http.post('/post/lefts/images/' + id, $scope.getData).then(function(res) {
                  $scope.success = res.data;
                  $timeout(function() {
                      $scope.success = ''
                  }, 3000)
                  $scope.getData = {};
              });
          } else {
              $http.post('/post/lefts/images/' + id, formData, {
                  transformRequest: angular.identity,
                  headers: {
                      'Content-Type': undefined
                  }
              }).then(function(res) {
                  $scope.success = res.data;
                  $timeout(function() {
                      $scope.success = ''
                  }, 3000)
                  $scope.getData = {};
              });
          }
      }; //end of images
  });
  //end
  //login of the dashboard code admin pannel
  app.controller('loginController', function($scope, $http, $interval, $timeout) {
      $scope.Login = function() {
          if ($scope.login.username && $scope.login.password) {
              $http.post('/login/newuser', $scope.login).then(function(response) {
                  console.log(response.data);

                  if (response.data.status == 'admin_login') {
                      window.location = '/dashboard/product';
                  } else {
                      $scope.resp = response.data;
                      $timeout(function() {
                          $scope.resp = '';
                      }, 3000);
                  }
              });
          } else {
              $scope.resp = 'All field required.';
              $timeout(function() {
                  $scope.resp = '';
              }, 3000)
          }
      }
  });



  // booking user login
  //header user profile controler
  app.controller('userProfile', function($scope, $interval, $http, $timeout) {
      $scope.saveSetting1 = function(id) {
          if ($scope.user.password == $scope.user.oldPass) {
              $http.post('/post/user/setting1/' + id, $scope.user).then(function(response) {
                  $scope.error = response.data;
                  $timeout(function() {
                      $scope.error = '';
                  }, 3000)
                  $scope.user = {};
              });

          } else {
              $scope.error = 'Password not matched'
              $timeout(function() {
                  $scope.error = '';
              }, 3000)
          }

      }
      $scope.saveSetting = function(id) {
          $http.post('/post/user/setting/' + id, $scope.user).then(function(response) {
              $scope.error = response.data;
              $timeout(function() {
                  $scope.error = '';
              }, 3000)
              $scope.user = {};
          });
      }
  });
  //end
  //location controller
  app.controller('locationController', function($scope, $http, $interval, $timeout) {
      // all users and their booings 
      $scope.title = "All bookings and requests";
      $scope.activeBookings = true;
      $scope.activateBookings = function() {
          $scope.title = "All bookings and requests";
          $scope.activeBookings = true;
      }
      $scope.activateUsers = function() {
          $scope.title = "All registered users";
          $scope.activeBookings = false;
      }
      $http.get('/get/all/users/').then(function(response) {
          $scope.user = response.data;
      });
      $scope.editUser = function(id) {
              $http.get('/edit/user/' + id).then(function(res) {
                  $scope.single = res.data;
              })
          }
          //    request accept and rejection
      $scope.acceptBooking = function(id) {
          $http.post('/accept/booking/' + id).then(function(res) {
              $scope.success = res.data;
              $http.get('/get/booking/users').then(function(response) {
                  $scope.bookings = response.data;
              });
              $timeout(function() {
                  $scope.success = '';
              }, 4000);
          })
      }
      $scope.rejectBooking = function(id) {
              $scope.sureReject = function() {
                  $http.post('/reject/booking/' + id).then(function(res) {
                      $scope.success = res.data;
                      $http.get('/get/booking/users').then(function(response) {
                          $scope.bookings = response.data;
                      });
                      $timeout(function() {
                          $scope.success = '';
                      }, 4000);
                  })
              }
          }
          // end

      //for client side booking user value
      $http.get('/get/booking/users').then(function(response) {
          $scope.bookings = response.data;
      });
      $scope.updateUser = function(id) {
          console.log(id);
          console.log($scope.single);
          $http.post('/update/user/' + id, $scope.single).then(function(res) {
              $scope.success = res.data;
              $scope.single = {}
              $http.get('/get/all/users/').then(function(response) {
                  $scope.user = response.data;
              });
              $timeout(function() {
                  $scope.success = '';
              }, 3000);
          })
          $scope.error = 'All field required to create new user';
          $timeout(function() {
              $scope.error = '';
          }, 3000);
      }
      $scope.deleteId = function(id) {
              console.log(id);
              $scope.deleteUser = function() {
                  $http.delete('/delete/user/' + id).then(function(resp) {
                      $scope.success = resp.data;
                      $http.get('/get/all/users/').then(function(response) {
                          $scope.user = response.data;

                      });
                      $timeout(function() {
                          $scope.success = '';
                      }, 3000);
                  });
              }
          }
          // end
          // location actions add
      $scope.addLocation = function() {
              console.log('hitting');
              $http.post('/post/location', $scope.location).then(function(resp) {
                  $scope.successMessage = resp.data;
                  $scope.location = {}
                  $timeout(function() {
                      $scope.successMessage = ''
                  }, 3000);
                  $http.get('/get/location').then(function(resp) {
                      $scope.locationData = resp.data;
                  });
              })
          }
          // location actions delete
      $scope.deleteLocation = function(id) {
              console.log('clicked delete');
              console.log(id);
              $scope.sure = function() {
                  console.log('clicked sure');

                  $http.post('/delete/location/' + id).then(function(resp) {
                      $scope.successMessage = resp.data;
                      $timeout(function() {
                          $scope.successMessage = ''
                      }, 3000);
                      $http.get('/get/location').then(function(resp) {
                          $scope.locationData = resp.data;
                      });
                  });
              }
          }
          // location actions getting location value
      $http.get('/get/location').then(function(resp) {
          console.log('hit');

          $scope.locationData = resp.data;
          console.log(resp.data);

      });

      // of the map locations
      $scope.loadMap = function(location) {
          $http.get('/get/weather/latlng/' + location).then(function(response) {
              $scope.weather = response.data;
              console.log('data is' + response.data);
              mapboxgl.accessToken =
                  'pk.eyJ1Ijoia2FtYWxzaGFoaTg5MTAiLCJhIjoiY2pwNmludXJjMTNmaDNvcDdpdDU0Z3VwOSJ9.TBq2M_d_jOH-RTZsMD6_tA';
              if ($scope.weather.length == 0) {
                  var map = new mapboxgl.Map({
                      container: 'map', // container id
                      style: 'mapbox://styles/mapbox/streets-v9',
                      center: [85.32218736312808, 27.692527008783514], // starting position
                      zoom: 9 // starting zoom
                  });
                  new mapboxgl.Marker()
                      .setLngLat([85.32218736312808, 27.692527008783514])
                      .addTo(map);
              } else {

                  var map = new mapboxgl.Map({
                      container: 'map', // container id
                      style: 'mapbox://styles/mapbox/streets-v9',
                      center: [parseFloat($scope.weather.lng), parseFloat($scope.weather.lat)], // starting position
                      zoom: 12 // starting zoom
                  });
                  new mapboxgl.Marker()
                      .setLngLat([parseFloat($scope.weather.lng), parseFloat($scope.weather.lat)])
                      .addTo(map);
              }
              map.on('click', function(e) {
                  document.getElementById('lng').innerHTML = JSON.stringify(e.lngLat.lng);
                  document.getElementById('lat').innerHTML = JSON.stringify(e.lngLat.lat);
                  $scope.lng = JSON.stringify(e.lngLat.lng);
                  $scope.lat = JSON.stringify(e.lngLat.lat);
                  new mapboxgl.Marker()
                      .setLngLat([parseFloat($scope.lng), parseFloat($scope.lat)])
                      .addTo(map);
                  $scope.saveMap = function() {
                          console.log('Clicked');
                          $http.post('/post/weather/latlng', {
                              location: location,
                              lat: $scope.lat,
                              lng: $scope.lng
                          }).then(function(resp) {
                              $scope.message = resp.data;
                              $timeout(function() {
                                  $scope.message = '';
                              }, 3000)
                          })
                      }
                      // e.point is the x, y coordinates of the mousemove event relative
                      // to the top-left corner of the map
                      //   JSON.stringify(e.point) + '<br />' +
                      // e.lngLat is the longitude, latitude geographical position of the event

              });

          });
      }


      // for hotel map load

      $scope.loadImage = function(location) {
              //saving images
              $scope.saveImage = function(id) { //crud of saving left images
                      var formData = new FormData;
                      for (key in $scope.left) {
                          formData.append(key, $scope.left[key]);
                      }
                      var file = $('#file')[0].files[0];
                      formData.append('image', file);
                      console.log(formData);
                      $http.post('/post/image/' + id + '/' + location, formData, {
                          transformRequest: angular.identity,
                          headers: {
                              'Content-Type': undefined
                          }
                      }).then(function(res) {
                          $scope.success = res.data;
                          $scope.loading = false;
                          $scope.left = {};
                      });
                  }
                  //end
                  //loading image
              $http.get('/get/image/' + location).then(function(res) {
                  $scope.left = res.data;
              });
              //end
          }
          //end
          //adding hotel
      $scope.loadFood = function(location) {
              //saving images
              $scope.saveFood = function() { //crud of saving left images
                      console.log($scope.food);
                      var formData = new FormData;
                      for (key in $scope.food) {
                          formData.append(key, $scope.food[key]);
                      }
                      var file = $('#food')[0].files[0];
                      formData.append('image', file);
                      $http.post('/post/food/' + location, formData, {
                          transformRequest: angular.identity,
                          headers: {
                              'Content-Type': undefined
                          }
                      }).then(function(res) {
                          $scope.success = res.data;
                          $scope.loading = false;
                          $scope.food = {};
                      });
                  }
                  //end
                  //loading image
              $http.get('/get/food/' + location).then(function(res) {
                  $scope.foods = res.data;
              });
              //end
          }
          //end
          //adding hotel
          //   $scope.loadHotel = function (location) {
          //saving images

      //end
      //   }
      //end

      //end
  });
  //end
  app.controller('actbookController', function($scope, $http, $timeout) {
      $scope.statuscheckActivity = function() {
          console.log($scope.actbook);
          var formData = new FormData;



      }
  });


  app.directive('fileModel', ['$parse', function($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function() {
                  var files = [];
                  angular.forEach(element[0].files, function(file) {
                      files.push(file);
                  })
                  scope.$apply(function() {
                      modelSetter(scope, files);
                  });
              });
          }
      };
  }]);
  app.controller('hotelController', function($scope, $http, $timeout) {
      $scope.removeActivity = function(id) {
          console.log(id);
          $http.post('/delete/activity/' + id).then(function(resData) {
              $scope.success = resData.data;
              $timeout(function() {
                  $scope.success = ''
              }, 3000)
          })
      }
      $scope.removeHotel = function(id) {
          console.log(id);
          $http.post('/delete/hotel/' + id).then(function(resData) {
              $scope.success = resData.data;
              $timeout(function() {
                  $scope.success = ''
              }, 3000)
          })
      }

      function previewImages() {
          var $preview = $('#preview').empty();
          if (this.files) $.each(this.files, readAndPreview);

          function readAndPreview(i, file) {
              if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                  return alert(file.name + " is not an image");
              } // else...
              var reader = new FileReader();

              $(reader).on("load", function() {
                  $preview.append($("<img/>", { src: this.result, height: 100, width: 200 }));
              });

              reader.readAsDataURL(file);
          }
      }
      $('#file-input').on("change", previewImages);
      mapboxgl.accessToken = 'pk.eyJ1Ijoia2FtYWxzaGFoaTg5MTAiLCJhIjoiY2pwNmludXJjMTNmaDNvcDdpdDU0Z3VwOSJ9.TBq2M_d_jOH-RTZsMD6_tA';
      var map1 = new mapboxgl.Map({
          container: 'hotelmap', // container id
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [85.32218736312808, 27.692527008783514], // starting position
          zoom: 12 // starting zoom
      });
      var lng = 85.32218736312808;
      var lat = 27.692527008783514;
      new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map1);
      map1.on('click', function(e) {
          document.getElementById('lng').innerHTML = JSON.stringify(e.lngLat.lng);
          document.getElementById('lat').innerHTML = JSON.stringify(e.lngLat.lat);
          $scope.lng = parseFloat(e.lngLat.lng);
          $scope.lat = parseFloat(e.lngLat.lat);
          new mapboxgl.Marker()
              .setLngLat([$scope.lng, $scope.lat])
              .addTo(map1);
      });

      function loadHotel() {
          $http.get('/get/hotel').then(function(response) {
              $scope.hotelData = response.data;
          })
      }
      loadHotel();

      function loadActivity() {
          $http.get('/get/all/activity').then(function(response) {
              $scope.activityData = response.data;
          })
      }
      loadActivity();
      $scope.saveHotel = function(data, type, lat, lng) { //crud of saving left images
          if (type == 'hotel') {
              saveHotelData(lat, lng);
          } else if (type == 'activity') {
              $scope.activity.lat = lat;
              $scope.activity.lng = lng;
              $scope.activity.contact = data.contact
              $scope.activity.description = data.description
              $scope.activity.duration = data.duration
              $scope.activity.exact_address = data.exact_address
              $scope.activity.highlights = data.highlights
              $scope.activity.included = data.included
                  //   $scope.activity.lat = data.
                  //   $scope.activity.lng = data.
              $scope.activity.location = data.location
              $scope.activity.name = data.name
              $scope.activity.notincluded = data.notincluded
              $scope.activity.price = data.price;
              var formData = new FormData;
              angular.forEach($scope.activityFiles, function(val, key) {
                  formData.append('file' + key, val);
              });
              angular.forEach($scope.activity, function(val, key) {
                  formData.append(key, val);
              });
              console.log(formData);
              $http.post('/post/activity/', formData, {
                  transformRequest: angular.identity,
                  headers: {
                      'Content-Type': undefined,
                  }
              }).then(function(res) {
                  $scope.successMessage = res.data;
                  loadActivity()
                  $timeout(function() {
                      $scope.successMessage = ''
                  }, 5000)
                  $scope.activity = {};
              });
          }
      }

      function saveHotelData(lat, lng) {
          $scope.hotels.lat = lat;
          $scope.hotels.lng = lng;
          console.log($scope.hotel);
          var formData = new FormData;
          angular.forEach($scope.files, function(val, key) {
              formData.append('file' + key, val);
          });
          angular.forEach($scope.hotels, function(val, key) {
              formData.append(key, val);
          });
          angular.forEach($scope.hotel, function(val, key) {
              formData.append(key, val);
          });
          console.log(formData);
          $http.post('/post/hotel/', formData, {
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined,
                  'data': JSON.stringify($scope.hotel)
              }
          }).then(function(res) {
              $scope.successMessage = res.data;
              loadHotel()
              $timeout(function() {
                  $scope.successMessage = ''
              }, 5000)
              $scope.hotels = {};
              $scope.hotel = {};
          });
      }
      // });


      //end
      //loading image hotel
      $http.get('/get/hotel/' + location).then(function(res) {
          $scope.hotels = res.data;
          console.log(res.data);
      });



  })