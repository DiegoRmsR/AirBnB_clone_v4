$(function () {
  const amenityChecks = {};
  let amenityNames = new Set();
  $(':INPUT[type=checkbox]').click(function () {
    if ($(this).data('id').includes('Amenity')) {
      if ($(this).prop('checked') === true) {
        amenityChecks[$(this).data('name')] = $(this).data('id');
        amenityNames = new Set();
        for (const key of Object.keys(amenityChecks)) {
          const splitname = key.split('.');
          const name = splitname[1];
          amenityNames.add(name);
        }
        const lista = Array.from(amenityNames);
        $('DIV.amenities').find('H4').text(lista);
      } else {
        delete amenityChecks[$(this).data('name')];
        amenityNames = new Set();
        console.log(amenityChecks);
        for (const key of Object.keys(amenityChecks)) {
          const splitname = key.split('.');
          const name = splitname[1];
          amenityNames.add(name);
        }
        const lista = Array.from(amenityNames);
        $('DIV.amenities').find('H4').text(lista);
      }
    }
  });

  // request for status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/',
    function (data) {
      if (data.status === 'OK') {
        $('#api_status').toggleClass('available');
      }
    });

  // funcion para crear el article en html para cada PLACE
  function placesRender (data) {
    data.forEach(function (place) {
      const titleDiv = '<article><div class=title>' +
                '<h2> ' + place.name + '</h2>' +
                '<div class=price_by_night>' +
                place.price_by_night +
                '</div>' +
                '</div>';

      const infoDiv = '<div class=information>' +
                '<div class=max_guest>' +
                '<i class="fa fa-users fa-3x" aria-hidden=true></i>' +
                '<br />' +
                place.max_guest +
                'Guests' +
                '</div>' +
                '<div class=number_rooms>' +
                '<i class="fa fa-bed fa-3x" aria-hidden=true></i>' +
                '<br />' +
                place.number_rooms +
                'Bedrooms' +
                '</div>' +
                '<div class=number_bathrooms>' +
                '<i class="fa fa-bath fa-3x" aria-hidden=true></i>' +
                '<br />' +
                place.number_bathrooms +
                'Bathroom' +
                '</div>' +
                '</div>' +
                '<br />' +
                '<div class=description>' +
                place.description +
                '</div>' +
                '</article>';

      const placesArticle = titleDiv + infoDiv;

      $('SECTION.places').append(placesArticle);
    });
  }

  const emptyObj = [];

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function (data) {
    placesRender(data);
  });
});
