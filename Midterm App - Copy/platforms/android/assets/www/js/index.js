var app = {
    name: "My App",
    version: "1.2.3",
    pages: [],
    people: [],  
    init: function () {
        
        //s4-1

        document.addEventListener("deviceready", function () {            
            
            app.pages.push(document.getElementById("home"));
            app.pages.push(document.getElementById("login"));

            var button1 = document.querySelector(".homebutton");

//            var singleTap = new Hammer.Tap({ event: 'tap' });
//            var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
//            doubleTap.requireFailure(singleTap);
        
            var hammertime = new Hammer(button1).on("tap", function() {
                app.pages[0].className = "";
                app.pages[1].className = "active";
            });

            if (navigator.geolocation) {
                var params = {
                    enableHighAccuracy: true,
                    timeout: 4000000,
                    maximumAge: 0
                };
                navigator.geolocation.getCurrentPosition(watchPosition, gpsError, params);
            } else {
                console.log("fail");
            }


            /***********************************
                        GOOGLEMAP
            ************************************/
            function watchPosition(position) {

                var latlat = position.coords.latitude;
                var longlong = position.coords.longitude;

                var mapOptions = {
                    center: new google.maps.LatLng(latlat, longlong),
                    zoom: 14,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("theMap"), mapOptions);
                var marker = new google.maps.Marker({
                    position: map.getCenter(),
                    map: map,
                    title: 'Your Here!'
                });
                google.maps.event.addListener(marker, 'click', function () {
                    map.setZoom(16);
                    map.setCenter(marker.getPosition());
                });
            }

            function gpsError(error) {
                var errors = {
                    1: 'Permission denied',
                    2: 'Position unavailable',
                    3: 'Request timeout'
                };
                alert("Error: " + errors[error.code]);
            }

            /***********************************
                        EndMap
            ***********************************/
            /***********************************
                Contact fetch/manipulation
            ***********************************/
            var options = new ContactFindOptions();
            var filter = ["displayName", "phoneNumbers"];
            options.filter = "";
            options.multiple = true;
            navigator.contacts.find(filter, successFunc, errFunc, options);

                    //var LAT = JSON.stringify(matches[i].position[0].value);
                    //var LONG = JSON.stringify(matches[i].postion[1].value);


            function successFunc(matches) {
                console.log(matches);
                for (i = 0; i < 12; i++) {
                    var contactdudes = {};
                    contactdudes.id = i;
                    contactdudes.displayName = matches[i].displayName;
                    contactdudes.numbers = [];
                    for (x = 0; x < matches[i].phoneNumbers.length; x++){
                        contactdudes.numbers.push(matches[i].phoneNumbers[x]);
                    }
                    contactdudes.lat = '';
                    contactdudes.long = '';
                    //console.log(contact[i]);
                    
                    app.people.push(contactdudes);
                }

                    localStorage.setItem('people', JSON.stringify(app.people));
                    //console.log(JSON.parse(localStorage.getItem('people')));
                                console.log(app.people);
                InsertPeople();
            }

            
            function errFunc(error) {
                alert("error finding contacts");
            }


            function InsertPeople() {
                var output = document.querySelector(".inputcontact");
                var html = '';
                for (var i = 0; i < app.people.length; i++){
                    var clickcontact = document.querySelector(".linkdink");                    
                    //output.innerHTML += "<li class='listpeople'><a class='linkdink' href='#openboxie'>" + app.people[i].displayName + "</a></li>";
                    html += "<li data-id='" + app.people[i].id + "' class='listpeople'>" + app.people[i].displayName + "</li>";
                    if (i == 11){
                        i = app.people.length;
                    }
                    
                }
                output.innerHTML = html;
                var listPeople = document.querySelectorAll(".listpeople");
                if (localStorage.getItem('people')) {
                    var localPeople = JSON.parse(localStorage.getItem('people'));
                }
                for (var j=0; j< listPeople.length; j++){                   
                    var hammertime2 = new Hammer(listPeople[j]).on('tap', function(ev) {
                        var SelectedNumber = localPeople[ev.target.attributes[0].value];
                        var selectedPerson = localPeople[ev.target.attributes[0].value].displayName;
                        console.log(selectedPerson);
                        var homeNumber = SelectedNumber.numbers[0].value;
                        var mobileNumber = SelectedNumber.numbers[1].value;
                        console.log(homeNumber);
                        console.log(mobileNumber);

                        var thebox = document.getElementById("openboxie");
                        thebox.style.display = "block";
                        thebox.style.opacity = 1;
                        thebox.style.pointerEvents = "auto";
                    var theboxpart2 = document.getElementById("fillmeup");
                        theboxpart2.innerHTML = "<h1>" + selectedPerson + "</h1>";
                        theboxpart2.innerHTML += "<p>" + homeNumber + "</p>";
                        theboxpart2.innerHTML += "<p>" + mobileNumber + "</p>";
                        theboxpart2.innerHTML += "<div class='closing'>close</div>";
                        
                        setTimeout(function () {
                        var closebutton = document.querySelector(".closing");
                        
             var hammertime4 = new Hammer(closebutton).on('tap', function () {
                        
                        var thebox = document.getElementById("openboxie");                            
                            
                            thebox.style.display = "none";
                            thebox.style.opacity = 0;
                            thebox.style.pointerEvents = "none";
                            
                        });
                        }, 350);
                        
                        
                        //console.log (localPeople[ev.target.attributes[0].value]);
                        //console.log (selectedPerson);
                    });
                    
                var hammertime3 = new Hammer(listPeople[j]).on('press', ivebeenpressed);                                                                
                                                                                             
                                                                                             
                                                                                                 
                }
                
            function ivebeenpressed() {
                        
                        app.pages[0].className = "active";
                        app.pages[1].className = "";
                        
                
                        placecontact();
                        
                };
                
            }
            
            function placecontact() {
                
            google.maps.event.addListener('click', function () {

                });
                
                
                var marker = new google.maps.Marker({
                    position: map.getCenter(),
                    map: map,
                    title: 'Your Here!'
                });
                
                
                
                
                
                
            };
        });

    }

};
app.init();