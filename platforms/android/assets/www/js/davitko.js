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

	$(".search-frame-advance-item-label").click(function () {
		$(".search-frame-advance-item").Toggle();
	});


	$(".advance-search-open").click(function () {
		$(".search-advance").hide();
	});
	$(".advance-search-open").click(function () {
		$(".search-advance").show();
	});

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

	$(".search-frame-advance-item-label").click(function () {

		$header = $(this);
		//getting the next element
		$content = $header.next();
		//open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
		$content.slideToggle(500, function () {
			//execute this after slideToggle is done
			//change text of header based on visibility of content div
			$header.text(function () {
				//change text based on condition
				return $content.is(":visible") ? "Collapse" : "Expand";
			});
		});

	});

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
