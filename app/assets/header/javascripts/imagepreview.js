this.themeScreenshotPreview = function() {	
	$("#theme_list a.screenshot").hover(function(e) {
		var c = (this.t != "") ? "<br/>" + this.t : "";
		$("#theme_list").append("<p id='themescreenshot'><img src='"+ $(this).data('img') +"' alt='' /></p>");								 
		$("#themescreenshot").fadeIn("fast");						
    },
	function() {
		$("#themescreenshot").remove();
    });			
};

//Starting the script on page load
$(document).ready(function() {
	themeScreenshotPreview();
});