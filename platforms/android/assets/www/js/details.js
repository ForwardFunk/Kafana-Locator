document.addEventListener("deviceready", function() {

    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    var id = unescape(temp[1]);

    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var obj = JSON.parse(xmlHttp.responseText);
            kafana = obj.kafane[0].kafana;

            document.getElementById("naziv").innerHTML = kafana.Naziv;
            document.getElementById("adresa").innerHTML = kafana.Adresa;
            document.getElementById("telefon").innerHTML = kafana.Telefon;
        }
    }

    xmlHttp.open("GET", "http://92.60.224.52/~fcfreek1/cgi-bin/vratiKafanu.php?id=" + id, true);
    xmlHttp.send();

}, false);
