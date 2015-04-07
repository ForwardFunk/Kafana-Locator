document.addEventListener("deviceready", function() {
    var parameters = location.search.substring(1).split("&");
    var tmpLat = parameters[0].split("=");
    var tmpLng = parameters[1].split("=");

    var lat = unescape(tmpLat[1]);
    var lng = unescape(tmpLng[1]);


    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;


    document.getElementById("kafana_add").addEventListener("click", onAddKafana);




}, false);


function onAddKafana() {
    var name = document.getElementById("naziv").value;
    var phone = document.getElementById("telefon").value;
    var address = document.getElementById("adresa").value;
    var music = document.getElementById("muzika").value;
    var rv_from = document.getElementById("rv_od").value;
    var rv_to = document.getElementById("rv_do").value;

    alert(name + phone + address + music + rv_from + rv_to);

}

