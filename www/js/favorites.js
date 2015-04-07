document.addEventListener("deviceready", function() {
    alert("favorites");
    var div = document.getElementById("favorites");

    var ul = document.createElement('ul');
    for (var i = 0; i < localStorage.length; i++) {

        var li = document.createElement('li');

        var a = document.createElement('a');
        a.setAttribute("href", "./details.html?id=" + localStorage.key(i));
        var node = document.createTextNode(localStorage[localStorage.key(i)]);
        a.appendChild(node);

        li.appendChild(a);
        ul.appendChild(li);
    }

    div.appendChild(ul);
}, false);

