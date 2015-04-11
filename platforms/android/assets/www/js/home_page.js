var map;
var kafanaList;
var userMarker;
var currMarkers;
var longpress = false;
var latLong;
var searchRadius;
var userMarker;

function showErrorLocation(err) {
    alert("Greška: lokacioni servisi na telefonu su isključeni!");
    if (err.code == 1) {
        alert("Greška: lokacioni servisi na telefonu su isključeni!");
    } else if (err.code == 2) {
        alert("Greška: lokacija je nedostupna");
    }
}

function addKafanaMarkers(kafane) {

    // clearing map of current kafana markers
    if (currMarkers !== undefined) {
        for (var i = 0; i < currMarkers.length; i++) {
            currMarkers[i].setMap(null);
        }
    }

    // re-init the current marker array
    currMarkers = [];

    if (searchRadius !== undefined) {
        searchRadius.setMap(null);
    }

    // define two types of kafana markers, system- or user-added
    var pinColorSystem = "34ba46";
    var pinColorUser = "ffff57";
    var pinImageSystem = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorSystem,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    var pinImageUser = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColorUser,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

    // iterating through the kafana array given as param and drawing
    // each kafana on map, with an onClick listener to kafana details
    // and a different icon for each kafana type
    for (var i = 0; i < kafane.length; i++) {
        var id = kafane[i].kafana.Id;
        var marker = new google.maps.Marker({
            'map': map,
            'position': new google.maps.LatLng(kafane[i].kafana.Lat, kafane[i].kafana.Lon),
            'title': kafane[i].kafana.Naziv,
            'shadow': pinShadow
        });

        if (kafane[i].kafana.UserEntry == "1") {
            marker.setIcon(pinImageUser);
        } else {
            marker.setIcon(pinImageSystem);
        }

        currMarkers[i] = marker;

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                var url = "./details.html?id=" + kafane[i].kafana.Id;
                window.location.href = url;
            }
        })(marker, i));
    }
}

function onSearchClicked() {

    var name = document.getElementById("name").value;
    var radius = document.getElementById("radius").value;
    var musicYes = document.getElementById("musicYes").checked;
    var musicNo = document.getElementById("musicNo").checked;
    var open = document.getElementById("open").checked;

    var searchKafanas = [];
    var ind = 0;

    for (var i = 0; i < kafanaList.length; i++) {
        var insertName = false;
        var insertRadius = false;
        var insertMusic = false;
        var insertOpen = false;

        if (name != "") {
            if (kafanaList[i].kafana.Naziv.toLowerCase().indexOf(name.toLowerCase()) != -1)
                insertName = true;
        } else {
            insertName = true;
        }

        if (radius != "") {

            var R = 6371; // km
            var f1 = latLong.lat() * Math.PI / 180;
            var f2 = parseFloat(kafanaList[i].kafana.Lat) * Math.PI / 180
            var df = (parseFloat(kafanaList[i].kafana.Lat) - latLong.lat()) * Math.PI / 180
            var dl = (parseFloat(kafanaList[i].kafana.Lon) - latLong.lng()) * Math.PI / 180


            var a = Math.sin(df / 2) * Math.sin(df / 2) + Math.cos(f1) * Math.cos(f2) *
                Math.sin(dl / 2) * Math.sin(dl / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            var d = R * c;

            if (d <= parseFloat(radius))
                insertRadius = true;



        } else {
            insertRadius = true;
        }

        if (musicYes == true && musicNo == false) {
            if (kafanaList[i].kafana.Muzika == "1")
                insertMusic = true;
        } else if (musicYes == false && musicNo == true) {
            if (kafanaList[i].kafana.Muzika == "0")
                insertMusic = true;
        } else {
            insertMusic = true;
        }

        if (open == true) {
            var currentDate = new Date();

            rvFrom = kafanaList[i].kafana.RVPocetak.split(/\:|\-/g);
            rvTo = kafanaList[i].kafana.RVKraj.split(/\:|\-/g);

            var fromDate = new Date();
            var toDate = new Date();
            fromDate.setHours(rvFrom[0]);
            fromDate.setMinutes(rvFrom[1]);
            fromDate.setSeconds(0);
            toDate.setHours(rvTo[0]);
            toDate.setMinutes(rvTo[1]);
            toDate.setSeconds(0);

            if (currentDate > fromDate && currentDate < toDate)
                insertOpen = true;
        } else {
            insertOpen = true;
        }
        var insert = insertName && insertRadius && insertMusic && insertOpen;
        if (insert) {
            searchKafanas[ind++] = kafanaList[i];
        }


    }
    if (radius != "") {
        var searchRadiusOpts = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: latLong,
            radius: parseFloat(radius) * 1000
        };

        var searchRadius = new google.maps.Circle(searchRadiusOpts);
    }

    if (searchKafanas !== undefined) {
        addKafanaMarkers(searchKafanas);
    }
}

function checkForNoticeAlerts(kafane) {

    for (var i = 0; i < kafane.length; i++) {
        var R = 6371; // km
        var f1 = latLong.lat() * Math.PI / 180;
        var f2 = parseFloat(kafanaList[i].kafana.Lat) * Math.PI / 180
        var df = (parseFloat(kafanaList[i].kafana.Lat) - latLong.lat()) * Math.PI / 180
        var dl = (parseFloat(kafanaList[i].kafana.Lon) - latLong.lng()) * Math.PI / 180


        var a = Math.sin(df / 2) * Math.sin(df / 2) + Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl / 2) * Math.sin(dl / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;

        if (d <= 1)
            alert("Obaveštenje: Na manje od 1km ste od objekta - " + kafane[i].kafana.Naziv + " - " + kafane[i].kafana.Notice);
    }
}

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("btn_search").addEventListener("click", onSearchClicked);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        document.getElementById("name").value = "";
        document.getElementById("radius").value = "";
        document.getElementById("musicYes").checked = false;
        document.getElementById("musicNo").checked = false;
        document.getElementById("open").checked = false;

        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function (position) {
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        latLong = new google.maps.LatLng(latitude, longitude);

        /*if (userMarker !== undefined) {
            userMarker.setPosition(new google.maps.LatLng(latitude, longitude));
            map.setCenter(new google.maps.LatLng(latitude, longitude));
        } else {*/

        var mapOptions = {
            center: latLong,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        google.maps.event.addListener(map, 'click', function (event) {
            if (longpress) {
                var url = "./new_kafana.html?lat=" + event.latLng.lat() + "&lng=" + event.latLng.lng();
                window.location.href = url;
                longpress = false;
            }
        });



        google.maps.event.addListener(map, 'mousedown', function (event) {

            start = new Date().getTime();
        });

        google.maps.event.addListener(map, 'mouseup', function (event) {

            end = new Date().getTime();
            longpress = (end - start < 1000) ? false : true;

        });

        var infowindow = new google.maps.InfoWindow({
            content: 'Trenutna lokacija'
        });

        userMarker = new google.maps.Marker({
            position: latLong,
            map: map,
            title: 'Moja lokacija'
        });

        google.maps.event.addListener(userMarker, 'click', function () {
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
                checkForNoticeAlerts(kafanaList);
            }
        }

        xmlHttp.open("GET", "http://92.60.224.52/~fcfreek1/cgi-bin/vratiKafane.php", true);
        xmlHttp.send();

    },

    onError: function (error) {
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};

app.initialize();
