var map;
var kafanaList;

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    const MY_LOC = new plugin.google.maps.LatLng(latitude, longitude);

    // zoom to location
    map.animateCamera({
        'target': MY_LOC,
        'zoom': 13
    });

    // draw marker on user location
    map.addMarker({
        'icon': 'blue',
        'position': MY_LOC,
        'title': "Moja lokacija"
    }, function (marker) {
        marker.showInfoWindow();
    });
}

function showErrorLocation(err) {
    alert("Greška: lokacioni servisi na telefonu su isključeni!");
    if (err.code == 1) {
        alert("Greška: lokacioni servisi na telefonu su isključeni!");
    } else if (err.code == 2) {
        alert("Greška: lokacija je nedostupna");
    }
}

function getUserLocation() {
    var options = {
        timeout: 60000
    };
    navigator.geolocation.getCurrentPosition(showLocation,
        showErrorLocation,
        options);
}




function addKafanaMarkers() {

    // Creating AJAX request to the server
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var obj = JSON.parse(xmlHttp.responseText);
            kafanaList = obj.kafane;
            for (var i = 0; i < kafanaList.length; i++) {
                // adding marker to map
                map.addMarker({
                    'position': new plugin.google.maps.LatLng(kafanaList[i].kafana.Lat, kafanaList[i].kafana.Lon),
                    'title': kafanaList[i].kafana.Naziv,
                    'myMsg': kafanaList[i].kafana.Id
                }, function (marker) {

                    var id = marker.get("myMsg");
                    marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
                        var url = "./details.html?id=" + id;
                        //alert(url);
                        window.location.href = url;

                    });
                });
            }
        }
    }

    xmlHttp.open("GET", "http://92.60.224.52/~fcfreek1/cgi-bin/vratiKafane.php", true);
    xmlHttp.send();

}

function onMapReady() {
    setInterval(getUserLocation, 5000);
    addKafanaMarkers();
}

document.addEventListener("deviceready", function () {
    var div = document.getElementById("map_canvas");

    // Initialize the map view
    map = plugin.google.maps.Map.getMap(div);

    // Wait until the map is ready status.
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

}, false);

function getSearchParametars() {
    var kafaneMatch;
    var numMatches = 0;
    var name = document.getElementById("search").value;
    var radius = document.getElementById("radius").value;
    var musicYes = document.getElementById("musicYes").checked;
    var musicNo = document.getElementById("musicNo").checked;
    var working = document.getElementById("working").checked;

    for (var i = 0; i < kafanaList.length; i++) {
        if (name != "") {
            if (name == kafanaList[i].kafana.Naziv)
                kafaneMatch[numMatches] = kafanaList[i];


        }
    }
}

$(document).ready(function () {
    getSearchParametars();
});
