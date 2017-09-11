$(document).ready(function(){
	
/*	// init controller
	var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

	// build scenes
	new ScrollMagic.Scene({triggerElement: "#parallex-1"})
					.setTween("#parallex-1 > div#header-bar", {y: "60%", ease: Linear.easeNone})
					.addIndicators()
					.addTo(controller);
*/

	$(function(){
		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 0
		});
	});



});