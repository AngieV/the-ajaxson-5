

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
        // TODO verify the user is not a robot
    //create section for verification
    
	var verify = $("<div></div>").attr("id", "verify");
	var notice = $("<p></p>").text("Prove you are not a robot by answering this riddle:");
	var riddle = $("<input id='answer' type='text' width='2'/><label>&nbspJacksons are better than 1!</label>");
    var err = $("<p></p>").attr("class", "error").text("No Jackson GIFs for you! Try again!");

	$("#form-gif-request").append(verify);
	$("#verify").append(notice,riddle);

    $("#form-gif-request").submit(function(event){
    	
		var ans = $("#answer").val();
		if(ans == '5'){
			fetchAndDisplayGif(event);
		}else{ 
    		//var err = $("<p id ='err'></p>").attr("class", "error").text("No Jackson GIFs for you! Try again!");
    		$("#verify").append(err);
    		
    	}
		 // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
	});
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
 
function fetchAndDisplayGif(event) {
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    
		// get the user's input text from the DOM
		var searchQuery = $("#tag").val(); // TODO should be e.g. "dance"

		// configure a few parameters to attach to our request
		var params = { 
			api_key: "dc6zaTOxFJmzC", 
			tag : "jackson 5 " + searchQuery // TODO should be e.g. "jackson 5 dance"
		};

		// make an ajax request for a random GIF
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
			data: params, // attach those extra parameters onto the request
			success: function(response) {
				// if the response comes back successfully, the code in here will execute.
			
				// jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
				console.log("we received a response!");
				console.log(response);
			
				// TODO
				// 1. set the source attribute of our image to the image_url of the GIF
				gif_src = response.data['image_url'];
				console.log(gif_src);
				$( "#gif" ).attr("src", gif_src);
				// 2. hide the feedback message and display the image
				setGifLoadedStatus(true);
			
			},
			error: function() {
				// if something went wrong, the code in here will execute instead of the success function
			
				// give the user an error message
				$("#feedback").text("Sorry, could not load GIF. Try again!").attr("class", "error");
				setGifLoadedStatus(false);
			}
		});     
    
		// TODO DONE
		// give the user a "Loading..." message while they wait
		$("#verify").empty();
		$("#feedback").text("Loading ... ");
		setGifLoadedStatus(false);
	}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
	}


	
    