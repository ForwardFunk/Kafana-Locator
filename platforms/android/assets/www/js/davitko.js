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

$(document).ready(function () {
	$(".advance-search-open").click(function () {
		$(".search-advance").hide();
	});
	$(".advance-search-open").click(function () {
		$(".search-advance").show();
	});
});
