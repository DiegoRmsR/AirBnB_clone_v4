$(function() {
    let amenityNamesSet = new Set();
    let amenityIdsSet = new Set();
    let amenityIds = [];
    $(":INPUT[type=checkbox]").click(function() {
	if ($(this).data("id").includes("Amenity")) {
            if($(this).prop("checked") === true) {
		amenityNamesSet.add($(this).data("name"));
		amenityListChecked(amenityNamesSet);
		amenityIdsSet.add($(this).data("id"));
		amenityIdsList(amenityIdsSet);
            } else {
		amenityNamesSet.delete($(this).data("name"));
		amenityListChecked(amenityNamesSet);
		amenityIdsSet.delete($(this).data("id"));
		amenityIdsList(amenityIdsSet);
	    }
	}
    });

    function amenityListChecked(amenityNamesSetLocal){
	let listNames = [];
	let lista = Array.from(amenityNamesSetLocal);
	lista.forEach(function(ameName) {
	    const splitname = ameName.split('.');
	    const name = splitname[1];
	    listNames.push(name);
	});
	$("DIV.amenities").find("H4").text(listNames);
    };

    function amenityIdsList(amenityIdsSetLocal){
	amenityIds = [];
        let lista = Array.from(amenityIdsSetLocal);
        lista.forEach(function(ameId) {
            const splitname = ameId.split('.');
            const id = splitname[1];
            amenityIds.push(id);
        });
	console.log(amenityIds);
    };

    //request for status
    $.getJSON('http://0.0.0.0:5001/api/v1/status/',
	     function(data) {
		 if (data.status === 'OK'){
		     $("#api_status").toggleClass("available")
		     }
		 })

    //funcion para crear el article en html para cada PLACE
    function placesRender(data){
	$('SECTION.places').empty();
	$('SECTION.places').append("<h1>Places</h1>");

	data.forEach(function(place){

	    let titleDiv = "<article><div class=title>" +
		"<h2> " + place.name  + "</h2>" +
		"<div class=price_by_night>"
		+ place.price_by_night +
		"</div>" +
		"</div>";

	    let infoDiv = "<div class=information>" +
		"<div class=max_guest>" +
		"<i class=\"fa fa-users fa-3x\" aria-hidden=true></i>" +
		"<br />" +
		place.max_guest +
		"Guests" +
		"</div>" +
		"<div class=number_rooms>" +
		"<i class=\"fa fa-bed fa-3x\" aria-hidden=true></i>" +
		"<br />" +
		place.number_rooms +
		"Bedrooms" +
		"</div>" +
		"<div class=number_bathrooms>" +
		"<i class=\"fa fa-bath fa-3x\" aria-hidden=true></i>" +
		"<br />" +
		place.number_bathrooms +
		"Bathroom" +
		"</div>" +
		"</div>" +
		"<br />" +
		"<div class=description>" +
		place.description +
		"</div>" +
		"</article>";

	    const placesArticle = titleDiv + infoDiv;

	    $('SECTION.places').append(placesArticle);

	});
    }

    const emptyObj = [];

    function getAmenities(data){
	$.ajax({
	    url: 'http://0.0.0.0:5001/api/v1/places_search/',
	    type: 'POST',
	    data: JSON.stringify(data),
	    contentType:"application/json",
	    dataType:"json"
	}).done(function(data){
	    placesRender(data);
	});
    }

    getAmenities({});

    $('BUTTON').click(function() {
	getAmenities( {"amenities": amenityIds });
    });
});
