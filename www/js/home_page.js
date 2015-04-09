var map;
var kafanaList;
var userMarker;
var currMarkers;

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    const MY_LOC = new plugin.google.maps.LatLng(latitude, longitude);

    if (typeof userMarker === 'undefined') {
        // if marker is not set yet, animate to the located user position
        map.animateCamera({
            'target': MY_LOC,
            'zoom': 13
        });
    } else {
        // if marker is set, just remove it
        userMarker.remove();
    }

    // draw marker on user location
    map.addMarker({
        'icon': 'blue',
        'position': MY_LOC,
        'title': "Moja lokacija"
    }, function (marker) {
        userMarker = marker;
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




function addKafanaMarkers(kafane) {

    currMarkers = [];
    for (var i = 0; i < kafane.length; i++) {
        // adding marker to map
        map.addMarker({
            'position': new plugin.google.maps.LatLng(kafanaList[i].kafana.Lat, kafanaList[i].kafana.Lon),
            'title': kafanaList[i].kafana.Naziv,
            'myMsg': kafanaList[i].kafana.Id
        }, function (marker) {
            currMarkers[i] = marker;
            var id = marker.get("myMsg");
            marker.addEventListener(plugin.google.maps.event.MARKER_CLICK, function () {
                var url = "./details.html?id=" + id;
                window.location.href = url;

            });
        });
    }

}

function onMapReady() {
    setInterval(getUserLocation, 5000);
    alert("onMapReady");
    // Get kafanas from server
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

    var evtName = plugin.google.maps.event.MAP_LONG_CLICK;
    map.on(evtName, function (latLng) {

        var url = "./new_kafana.html?lat=" + latLng.lat + "&lng=" + latLng.lng;
        window.location.href = url;
    });

}

document.addEventListener("deviceready", function () {
    var div = document.getElementById("map_canvas");

    // Initialize the map view
    map = plugin.google.maps.Map.getMap(div);

    // Wait until the map is ready status.
    map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);

}, false);
