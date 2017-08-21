		




		$(document).ready(function(){
			var weatherApi="http://api.openweathermap.org/data/2.5/forecast/daily?q=";
		    $(window).on('load',function(){
		        $(".load-screen").fadeOut(2000, function() {
				    $( this ).remove();
				  });//remove the first screen and place the small logo at the top
		  		   $(".logosmall").show();
		    });
		    		//event handling for enter
		     $('.searchTerm').on('keypress',function(e) {
					if(e.which===13 ){
				    var city = $(".searchTerm").val().split(',')[0];
				    $('.wrap').hide('fast');
					weatherbyName(city,weatherApi);
		     	 }
		     });//event handling for search button click 
		     $('.searchButton').one('click',function() {
		     		var city = $(".searchTerm").val().split(',')[0];

		     		 $('.wrap').hide('fast');
					weatherbyName(city,weatherApi);//call the function for the weather
			 });
		     	//event handling for access button click 
			  $('.btn-labeled').one('click',function() {
			    	   // get the city based on ip
		     		$.getJSON("https://freegeoip.net/json/?callback=?").done(function(data) {
  					  city = data.time_zone; // get city data(comes Country/city)
  					  city = city.substring(city.indexOf("/") + 1);// extract city name
							
							 $('.wrap').hide('slow');
							weatherbyName(city,weatherApi);//call the function for the weather
			  					
					   }).fail(function() {//if it cant locate 
						    alert( "Sorry we cannnot access your location at the moment" );
						  });

								
				 });
			function weatherbyName(city,api){
					// get the city
					if(!city){
						alert("Please enter the city name");
					 location.reload();
					}
				$.getJSON(api+city+'&units=metric' + '&type=accurate' +'&APPID=fc9eff099bf0a65f7673379198dc16fe')
					.done(function(data) {
					 $('.fav').show('fast');
  					 $("body").css("background", "#bf80ff");
  					var country=city+" "+data.city.country;
  					var icon=getWeatherId(data.list[0].weather[0].id); // function for getting id (needed for the icon)
  			
  					var tempmax=Math.floor(data.list[0].temp.max);//max temp
  					var tempmin=Math.floor(data.list[0].temp.max);//min temp

					$(".city").html(country);
					$(".icontoday").attr("data-icon",icon);
					$(".tempmax").html(tempmax+' <img class="cels" src="img/celsius2.png" alt="" />');
					$(".tempmin").html(tempmin+' <img class="cels" src="img/celsius2.png" alt="" />');
					$(".today").text("Today");
						
					for(var i=1;i<6 ;i++){// generating the forecast for 5 days as well
						$('<div />').addClass('col-lg-2 col-md-4 col-sm-6 col-xs-10 forecast item-'+i).appendTo($( ".date-results" ));
						//getting date in milliseconds and converting in day name with moment.js
						 $('<div />').addClass("datetime").html(moment(data.list[i].dt*1000).format('dddd').substring(0,3)).appendTo($( '.item-'+i ));
						 $('<div />').addClass("icons").attr("data-icon",getWeatherId(data.list[i].weather[0].id)).appendTo($( '.item-'+i ));
	   			    	$('<div />').addClass("tempmax-fore").html(Math.floor(data.list[i].temp.max)+' <img class="cels" src="img/celsius2.png" alt="" />').appendTo($( '.item-'+i ));
						 $('<div />').addClass("tempmin-fore").html(Math.floor(data.list[i].temp.min)+' <img class="cels" src="img/celsius2.png" alt="" />').appendTo($( '.item-'+i ));
						}

						$('<i />').addClass("fa fa-arrow-left fa-3x").html("back").appendTo($( '.weat' ));
 						$('.fa-arrow-left').one('click',function() {
						 	 location.reload();
						 });						
  				});
			}


	// sidebar collapsing 
		  $("#demo").on("hide.bs.collapse", function(){
		    $(".one").html('<i class="fa fa-bars nav-toggle" aria-hidden="true"></i>');
		    $("aside").css("background", "inherit");
		  });
		  $("#demo").on("show.bs.collapse", function(){
		    $(".one").html('<i class="fa fa-times nav-toggle" aria-hidden="true"></i>');
		    $("aside").css("background", "#80ffaa");
 
});


  $('[data-js="twitter-share"]').on("click", function(e){
  e.preventDefault();
  var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
  if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;
  }
  	);


  $('[data-js="facebook-share"]').on("click", function(e){

  e.preventDefault();
  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
}
  	);
    $('[data-js="google-share"]').on("click", function(e){
 
  e.preventDefault();
  var facebookWindow = window.open('https://plus.google.com/share?url=' + document.URL, 'google-popup', 'height=350,width=600');
  if(facebookWindow.focus) { facebookWindow.focus(); }
    return false;
}
  	);








		});


function getWeatherId(id){// checking what id is being returned from the the weather api and returns the proper letter to be
	switch(true) {								// for weather icons
	    case (id <=232):
	        return "Z";
	        break;
	    case (id<=321):
	        return "R";
	        break;
	    case id<=531:
	        return "Q";
	        break;
	    case id<=622:
	        return "W";
	        break;
	    case id<=781:
	        return "E";
	        break;
	    case id== 800:
	        return "B";
	        break;
	    case id<=802:
	        return "H";
	        break;
	    case id<=804:
	        return "Y";
	        break;
	    case id>900:
	        return "F";
	        break;
		}
}








		