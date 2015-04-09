document.addEventListener("deviceready", function() {
    var parameters = location.search.substring(1).split("&");
    alert(parameters);
    var tmpLat = parameters[0].split("=");
    var tmpLng = parameters[1].split("=");

    var lat = unescape(tmpLat[1]);
    var lng = unescape(tmpLng[1]);
    alert(lat);
    alert(lng);

    document.getElementById("lat").value = lat;
    document.getElementById("lng").value = lng;

    document.getElementById("kafana_add").addEventListener("click", onAddKafana);


}, false);


function onAddKafana() {
    var name = document.getElementById("naziv").value;
    var phone = document.getElementById("telefon").value;
    var address = document.getElementById("adresa").value;
    var music = document.getElementById("muzika").value == "on" ? "1" : "0";
    var rv_from = document.getElementById("rv_od").value;
    var rv_to = document.getElementById("rv_do").value;
    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;



    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            //alert('ok');
            alert(xmlHttp.responseText);
            /*kafana = obj.kafane[0].kafana;

            name = kafana.Naziv;
            document.getElementById("naziv").innerHTML = kafana.Naziv;
            document.getElementById("adresa").innerHTML = kafana.Adresa;
            document.getElementById("telefon").innerHTML = kafana.Telefon;*/
        }
    }

    var url = "http://92.60.224.52/~fcfreek1/cgi-bin/dodajKafanu.php?naziv=" + name + "&adresa=" + address + "&telefon=" + phone
    + "&rv_od=" + rv_from + "&rv_do=" + rv_to + "&muzika=" + music + "&lat=" + lat + "&lng=" + lng;

    alert(url);
    xmlHttp.open("GET", url, true);
    xmlHttp.send();

}
