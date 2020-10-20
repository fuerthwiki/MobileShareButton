$(document).ready( function() {

	//var log = console.log;
	var log = function() {};

	function waitAndAppend(targetSelector, $element, timeout = 2000) {
		var checkExist = setInterval(function() {
			var $target = $(targetSelector)
			if ($target.length) {
				clearInterval(checkExist);
				$element.insertAfter($target);
			}
		}, 100);
		setTimeout(function() {
			if (checkExist) {
				clearInterval(checkExist);
			}
		}, timeout);
	}

	function share() {
		const title = document.title;
		const url = document.querySelector('link[rel=canonical]') && document.querySelector('link[rel=canonical]').href || window.location.href;
		navigator.share({
			title,
			text: title,
			url
		})
		.then(() => log('Share was successful.'))
		.catch((error) => log('Sharing failed', error));
	}

	// create new icon button
	var $shareButton = $('<li></li>')
		.addClass('mw-ui-icon')
		.addClass('mw-ui-icon-share')
		.addClass('mw-ui-icon-element')
		.prop('title', 'Teilen');

	$shareButton.on('click', function() {
		log('share button clicked');
		if (navigator.share) {
			log('share API is supported');
			share();
		} else {
			log('share API is NOT supported. Loading polyfill...');
			$.getScript("//unpkg.com/share-api-polyfill/dist/share-min.js", function() {
				log('finished loading Polyfill');
				share();
			});
		}
	});

	// wait for the selector append and append the element
	waitAndAppend('#page-actions li#ca-watch', $shareButton);
});
