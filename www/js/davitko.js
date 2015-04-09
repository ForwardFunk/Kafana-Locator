// Swipe Functions
// Map - Index Page
$(document).on("pagecreate", "#index", function () {
	$(".ui-content").on("swipeleft", function () {
		$.mobile.changePage("./details.html", 'slide');
	});
});
$(document).on("pagecreate", "#index", function () {
	$(".ui-content").on("swiperight", function () {
		$.mobile.changePage("./favorites.html", 'slide');
	});
});
// Details Page
$(document).on("pagecreate", "#details", function () {
	$(".ui-content").on("swipeleft", function () {
		$.mobile.changePage("./favorites.html", 'slide');
	});
});
$(document).on("pagecreate", "#details", function () {
	$(".ui-content").on("swiperight", function () {
		$.mobile.changePage("./index.html", 'slide');
	});
});
// Favourites Page
$(document).on("pagecreate", "#favourite", function () {
	$(".ui-content").on("swipeleft", function () {
		$.mobile.changePage("./index.html", 'slide');
	});
});
$(document).on("pagecreate", "#favourite", function () {
	$(".ui-content").on("swiperight", function () {
		$.mobile.changePage("./details.html", 'slide');
	});
});
// Add New Kafana
$(document).on("pagecreate", "#add_kafana", function () {
	$(".ui-content").on("swipeleft", function () {
		$.mobile.changePage("./index.html", 'slide');
	});
});
$(document).on("pagecreate", "#add_kafana", function () {
	$(".ui-content").on("swiperight", function () {
		$.mobile.changePage("./index.html", 'slide');
	});
});


$.backstretch([
	"http://dl.dropbox.com/u/515046/www/outside.jpg"
	, "http://dl.dropbox.com/u/515046/www/garfield-interior.jpg"
	, "http://dl.dropbox.com/u/515046/www/cheers.jpg"
], {
duration: 3000,
fade: 750
});


//$('#index').live("swipeleft", function () {
//	var nextpage = $('#details');
//	// swipe using id of next page if exists
//	alert("Levo");
//	if (nextpage.length > 0) {
//		$.mobile.changePage(nextpage, 'slide');
//	}
//});
//$('#index').live("swiperight", function () {
//	var prevpage = $('#details');
//	alert("Levo");
//	// swipe using id of next page if exists
//	if (prevpage.length > 0) {
//		$.mobile.changePage(prevpage, 'slide', true);
//	}
//});









//$(".search-advance").hide();
//$(".advance-search-open").show();
//$(document).ready(function () {
//	$(".advance-search-open").click(function () {
//		$(".search-advance").Toggle();
//	});
//});

//$(document).ready(function () {
//
//	$(".search-advance").hide();
//	$(".advance-search-open").show();
//
//	$('.advance-search-open').toggle(function () $(".search-advance").slideDown();
//
//		},
//		function () {
//			$(".search-advance").slideUp();
//		});
//
//});


//$(function () { // DOM READY shorthand
//
//	$(".search-advance").hide();
//
//	$('.advance-search-open').click(function (e) {
//		// e.preventDefault(); // If you use anchors
//		var SH = this.SH ^= 1; // "Simple toggler"
//		$(this).text(SH ? 'Hide' : 'Show')
//			.css({
//				backgroundPosition: '0 ' + (SH ? -18 : 0) + 'px'
//			})
//			.next(".search-advance").slideToggle();
//	});
//
//});

//$(document).ready(function () {
//
//	$(".search-frame-advance-item-label").click(function () {
//		$(".search-frame-advance-item").Toggle();
//	});
//
//
//	$(".advance-search-open").click(function () {
//		$(".search-advance").hide();
//	});
//	$(".advance-search-open").click(function () {
//		$(".search-advance").show();
//	});

//	$(".search-frame-advance-item-label").click(function () {
//
//		$header = $('.search - frame - advance - item - label');
//		//getting the next element
//		$content = $('.search - frame - advance - item');
//		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
//		$content.slideToggle(500, function () {
//			//execute this after slideToggle is done
//			//change text of header based on visibility of content div
//			$header.text(function () {
//				//change text based on condition
//				return $content.is(":visible") ? "Collapse" : "Expand";
//			});
//		});
//
//	});

//	$(".search-frame-advance-item-label").click(function () {
//
//		$header = $(this);
//		//getting the next element
//		$content = $header.next();
//		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
//		$content.slideToggle(500, function () {
//			//execute this after slideToggle is done
//			//change text of header based on visibility of content div
//			$header.text(function () {
//				//change text based on condition
//				return $content.is(":visible") ? "Collapse" : "Expand";
//			});
//		});
//
//	});

//	$('.search-frame-advance-item-label').click(function () {
//
//		if ($(this).text() == 'Expand') {
//			$('.search - frame - advance - item').show();
//			$(this).text('Colapse');
//		} else {
//			$('.search - frame - advance - item').hide();
//			$(this).text('Expand');
//		}
//
//	});

});







document.addEventListener("deviceready", function () {
	//Dropdown plugin data
	var ddData = [
		{
			text: "Facebook",
			value: 1,
			selected: false,
			description: "Description with Facebook",
			imageSrc: "http://dl.dropbox.com/u/40036711/Images/facebook-icon-32.png"
		},
		{
			text: "Twitter",
			value: 2,
			selected: false,
			description: "Description with Twitter",
			imageSrc: "http://dl.dropbox.com/u/40036711/Images/twitter-icon-32.png"
		},
		{
			text: "LinkedIn",
			value: 3,
			selected: true,
			description: "Description with LinkedIn",
			imageSrc: "http://dl.dropbox.com/u/40036711/Images/linkedin-icon-32.png"
		},
		{
			text: "Foursquare",
			value: 4,
			selected: false,
			description: "Description with Foursquare",
			imageSrc: "http://dl.dropbox.com/u/40036711/Images/foursquare-icon-32.png"
		}
	];

	$('#myDropdown').ddslick({
		data: ddData,
		selectText: "Select your favorite social network",
		onSelected: function (data) {
			displaySelectedData("3: Callback Function on Dropdown Selection", data);
		}
	});
}, false);

function getSearchParametars() {
	var kafaneMatch;
	var numMatches = 0;
	var name = document.getElementById("search").value;
	var radius = document.getElementById("radius").value;
	var musicYes = document.getElementById("musicYes").checked;
	var musicNo = document.getElementById("musicNo").checked;
	var working = document.getElementById("working").checked;
	var date = new Date();
	var hour = date.getHours();
	var min = date.getMinutes();
	//var seconds = date.getSeconds();
	debugger;
	for (var i = 0; i < kafanaList.length; i++) {
		// Name, Radius, MusicYes, Working
		if (name != "" && radius != "" && musicYes == true && working == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.Muzika == 0 && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name, Radius, MusicNO, Working
		if (name != "" && radius != "" && musicNo == true && working == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.Muzika == 1 && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name, Radius, MusicNo
		if (name != "" && radius != "" && musicNo == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.Muzika == 1)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name, Radius, MusicNo
		if (name != "" && radius != "" && musicYes == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.Muzika == 0)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name, Radius, Working
		if (name != "" && radius != "" && working == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name, Working
		if (name != "" && working == true) {
			if (name == kafanaList[i].kafana.Naziv && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Radius, MusicYes, Working
		if (radius != "" && musicYes == true && working == true) {
			if (kafanaList[i].kafana.Muzika == 0 && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// MusicYes, Working
		if (musicYes == true && working == true) {
			if (kafanaList[i].kafana.Muzika == 0 && kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Working
		if (working == true) {
			if (kafanaList[i].kafana.RVPocetak < hour && kafanaList[i].kafana.RVKraj > hour)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// Name
		if (name != "") {
			if (name == kafanaList[i].kafana.Naziv)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// MusicYes
		if (musicYes == true) {
			if (kafanaList[i].kafana.Muzika == 0)
				kafaneMatch[numMatches] = kafanaList[i];
			numMatches = numMatches + 1;
		}
		// MusicNo
		if (musicYes == true)
			if (kafanaList[i].kafana.Muzika == 1)
				kafaneMatch[numMatches] = kafanaList[i];
		numMatches = numMatches + 1;
	}

	alert(kafaneMatch);
	console.log(kafaneMatch);
}
