var map;
var kafanaList;
var userMarker;
var currMarkers;
var longpress = false;

function showErrorLocation(err) {
    alert("Greška: lokacioni servisi na telefonu su isključeni!");
    if (err.code == 1) {
        alert("Greška: lokacioni servisi na telefonu su isključeni!");
    } else if (err.code == 2) {
        alert("Greška: lokacija je nedostupna");
    }
}

function addKafanaMarkers(kafane) {

    currMarkers = [];
    for (var i = 0; i < kafane.length; i++) {
        // adding marker to map
        var id = kafanaList[i].kafana.Id;
        var marker = new google.maps.Marker({
            'map': map,
            'position': new google.maps.LatLng(kafanaList[i].kafana.Lat, kafanaList[i].kafana.Lon),
            'title': kafanaList[i].kafana.Naziv
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var url = "./details.html?id=" + kafanaList[i].kafana.Id;
                window.location.href = url;
            }
        })(marker, i));
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');
       navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position){
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        google.maps.event.addListener(map,'click', function (event) {
            if (longpress) {
                var url = "./new_kafana.html?lat=" + event.latLng.lat() + "&lng=" + event.latLng.lng();
                window.location.href = url;
                longpress = false;
            }
        });



        google.maps.event.addListener(map, 'mousedown', function(event){

            start = new Date().getTime();
        });

        google.maps.event.addListener(map, 'mouseup', function(event){

            end = new Date().getTime();
            longpress = (end - start < 500) ? false : true;

        });

        var infowindow = new google.maps.InfoWindow({
            content: 'Trenutna lokacija'
        });

        var marker = new google.maps.Marker({
              position: latLong,
              map: map,
              title: 'Moja lokacija'
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var obj = JSON.parse(xmlHttp.responseText);
                kafanaList = obj.kafane;
                addKafanaMarkers(kafanaList);
            }
        }

        xmlHttp.open("GET", "http://92.60.224.52/~fcfreek1/cgi-bin/vratiKafane.php", true);
        xmlHttp.send();

    },

    onError: function(error){
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};

app.initialize();
