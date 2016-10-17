/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
	"use strict";
	
    $('form').submit(function (event) {
        event.preventDefault();
        var titleInput = $('#search').val(),
			omdbTitle = '',
			omdbAPI = "https://www.omdbapi.com/?s=" + encodeURI(titleInput) + "&type=movie";
   
        function displayTitle(response) {
            var titleHTML = "";
            $.each(response.Search, function (i, head) {
                var title = head.Title,
					year = head.Year;
                omdbTitle = "https://omdbapi.com/?t=" + title;
                titleHTML += '<a class="link" href="' + omdbTitle + '"</a>' + '<h1>' + title + '</h1>';
                titleHTML += '<p>' + year + '</p>';
			});
     
			$('.movie-list').html(titleHTML);
		}
		$.getJSON(omdbAPI, displayTitle);
	});
    
    var $overlay = $('<div class="overlay"></div>'),
		$details = $('<ul class="details"></ul>'),
		$image = $('<img class="movie-poster">'),
		$title = $('<h1></h1>'),
		$plot = $('<p></p>'),
		$runTime = $('<li></li>'),
		$actors = $('<li></li>'),
		$directors = $('<li></li>'),
		$year = $('<li></li>'),
		$genre = $('<li></li>'),
		$tomato = $('<li></li>'),
		$imdb = $('<li></li>'),
		$info = $('<ul class="head"></ul>'),
		$rated = $('<li></li>'),
		$span = $("<span class='close'></span>"),
		$flex = $('<div class="flex"></div>'),
		$writer = $('<li></li>'),
		$lang = $('<li></li>'),
		$awards = $('<li></li>');
    
    $info.append($rated);
    $info.append($year);
    $info.append($runTime);
    $info.append($genre);
    $info.append($imdb);
    $details.append($directors);
    $details.append($writer);
    $details.append($actors);
    $details.append($lang);
    $details.append($awards);
    $details.append($tomato);
    $flex.append($image);
    $flex.append($plot);
    $flex.append($details);
    $overlay.append($span);
    $overlay.append($title);
    $overlay.append($info);
    $overlay.append($flex);
    $("body").append($overlay);
	
	$(document).on('click', 'a', function (e) {
		e.preventDefault();
		var omdbAPI = encodeURI($(this).attr('href'));
		
		function displayOverlay(response) {
			var title = response.Title,
				poster = response.Poster,
				runTime = response.Runtime,
				plot = response.Plot,
				actors = "Stars: " + response.Actor,
				year = response.Released,
				genre = response.Genre,
				tomato = "Metascore: " + response.Metascore,
				imdb = response.imdbRating + " / 10",
				rating = response.Rated,
				awards = "Awards: " + response.Awards,
			
			//Functions determining whether their statements are plural/singular
			
				directors = function () {
					if (response.Director.split(",").length > 1) {
						return "Directors: " + response.Director;
					} else {
						return "Director: " + response.Director;
					}
				},
				writer = function () {
					if (response.Writer.split(",").length > 1) {
						return "Writers: " + response.Writer;
					} else {
						return "Writer: " + response.Writer;
					}
				},
				lang = function () {
					if (response.Writer.split(",").length > 1) {
						return "Languages: " + response.Language;
					} else {
						return "Language: " + response.Language;
					}
				};
  
			$image.attr("src", poster);
			$runTime.text(runTime);
			$plot.text(plot);
			$title.text(title);
			$actors.text(actors);
			$directors.text(directors);
			$genre.text(genre);
			$tomato.text(tomato);
			$imdb.text(imdb);
			$year.text(year);
			$rated.text(rating);
			$writer.text(writer);
			$lang.text(lang);
			$awards.text(awards);
		}
		$.getJSON(omdbAPI, displayOverlay);
		$overlay.show();
		$('.container').css('opacity', '0.2');
		$('body').css('overflow', 'hidden');
	});
	
    function $closeOverlay() {
        $('.container').css('opacity', 1);
        $('body').css('overflow', 'auto');
        $overlay.hide();

    }
    $span.click($closeOverlay);
    document.onkeydown = function (event) {
        if (event.keyCode === 27 || event.keyCode === 8) {
            event.preventDefault();
		    $closeOverlay();
		}
	};
});

