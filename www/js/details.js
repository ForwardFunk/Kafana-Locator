var id;
var name;

document.addEventListener("deviceready", function() {
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    id = unescape(temp[1]);

    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var obj = JSON.parse(xmlHttp.responseText);
            kafana = obj.kafane[0].kafana;

            name = kafana.Naziv;
            document.getElementById("naziv").innerHTML = kafana.Naziv;
            document.getElementById("adresa").innerHTML = kafana.Adresa;
            document.getElementById("telefon").innerHTML = kafana.Telefon;
        }
    }

    document.getElementById("favorites_add").addEventListener("click", onAddFavorite);
    document.getElementById("favorites_remove").addEventListener("click", onRemoveFavorite);

    if (localStorage[id.toString()] == null) {
        document.getElementById("favorites_remove").disabled = true;
    } else {
        document.getElementById("favorites_add").disabled = true;
    }

    xmlHttp.open("GET", "http://92.60.224.52/~fcfreek1/cgi-bin/vratiKafanu.php?id=" + id, true);
    xmlHttp.send();


}, false);


function onAddFavorite() {
    if (localStorage[id.toString()] == null) {
        localStorage[id.toString()] = name;
        alert(localStorage[id.toString()]);
        document.getElementById("favorites_remove").disabled = false;
    } else {
        alert('exists');
    }

}


function onRemoveFavorite() {
    if (localStorage[id.toString()] != null) {
        localStorage.removeItem(id.toString());
        document.getElementById("favorites_remove").disabled = true;
    }
}
