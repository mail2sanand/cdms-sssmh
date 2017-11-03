var theme_list_open = false;

$(document).ready(function() {
	
	//Window resize
	function fixHeight() {					
		var headerHeight = $("#switcher").height();							
		$("#iframe").height($(window).height()-headerHeight);					
	}
	
	$(window).resize(function() {						
		fixHeight();					
	}).resize();
	
	//Select theme
	$("#theme_select").click(function() {					
		if (theme_list_open) {		
			$(this).removeClass("active");					
			$(".center #theme_list ul").fadeOut("fast");							
			theme_list_open = false;
		} else {
			$(this).addClass("active");						
			$(".center #theme_list ul").fadeIn("fast");       		
			theme_list_open = true;				
		}
								
		return false;					
	});
	
	$("#theme_list ul li a").click(function() {					
		var theme_data = $(this).attr("rel").split(",");
		var theme_title = $(this).data("title");
		var responsive = $(this).data("responsive")!="" ? true : false;	
		
		$(".purchase a").attr("href", theme_data[1]+"?ref=AthenaStudio");
		$(".remove_frame a").attr("href", theme_data[0]);
		$("#iframe").attr("src", theme_data[0]);
		$(document).attr('title', theme_title+" | AthenaStudio");		
		$("#theme_list a#theme_select").attr("title", theme_title);				
		$("#theme_list a#theme_select span").text(theme_title);
		$("#theme_list ul").hide();
		$("#plugin_list a#plugin_select").text("Select A Plugin");
		
		//Active
		$("#theme_list ul li").removeClass("active");	
		$(this).parent().addClass("active");					
		
		theme_list_open = false;						
		
		return false;					
	});
	
	//Close dropdown on document click
	$(document).click(function(e) {
		//Theme list
		$("#theme_select").removeClass("active");	
		$(".center #theme_list ul").fadeOut("fast");							
		theme_list_open = false;
	});
	
	//Rollbar
	$(".dropdown").rollbar();

});