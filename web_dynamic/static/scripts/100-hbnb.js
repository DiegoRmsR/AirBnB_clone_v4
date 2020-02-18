$(function () {
  const amenityNamesSet = new Set();
  const amenityIdsSet = new Set();
  let amenityIds = [];
  const locationsNamesSet = new Set();
  const stateIdsSet = new Set();
  let stateIds = [];
  const cityIdsSet = new Set();
  let cityIds = [];
  let that = this;
  $(':INPUT[type=checkbox]').click(function () {
    that = this;
    if ($(this).data('id').includes('Amenity')) {
      // amenities
      if ($(this).prop('checked') === true) {
        amenityIds = addNameId(amenityNamesSet, amenityIdsSet, 'amenities', that);
        console.log(amenityIds);
      } else {
        amenityIds = deleteNameId(amenityNamesSet, amenityIdsSet, 'amenities', that);
        console.log(amenityIds);
      }
    } else if ($(this).data('id').includes('State')) {
      // states
      if ($(this).prop('checked') === true) {
        stateIds = addNameId(locationsNamesSet, stateIdsSet, 'locations', that);
        console.log(stateIds);
      } else {
        stateIds = deleteNameId(locationsNamesSet, stateIdsSet, 'locations', that);
        console.log(stateIds);
      }
    } else if ($(this).data('id').includes('City')) {
      // cities
      if ($(this).prop('checked') === true) {
        cityIds = addNameId(locationsNamesSet, cityIdsSet, 'locations', that);
        console.log(cityIds);
      } else {
        cityIds = deleteNameId(locationsNamesSet, cityIdsSet, 'locations', that);
        console.log(cityIds);
      }
    }
  });

  function addNameId (namesSet, idsSet, type, that) {
    namesSet.add($(that).data('name'));
    const nameList = checkedList(namesSet);
    updateList(nameList, type);
    idsSet.add($(that).data('id'));
    return checkedList(idsSet);
  }

  function deleteNameId (namesSet, idsSet, type, that) {
    namesSet.delete($(that).data('name'));
    const nameList = checkedList(namesSet);
    updateList(nameList, type);
    idsSet.delete($(that).data('id'));
    return checkedList(idsSet);
  }

  function checkedList (localSet) {
    const returnList = [];
    const initList = Array.from(localSet);
    initList.forEach(function (i) {
      const splitItem = i.split('.');
      const item = splitItem[1];
      returnList.push(item);
    });
    return returnList;
  }

  function updateList (namesList, type) {
    $('DIV.' + type).find('H4').text(namesList);
  }

  // request for status
  $.getJSON('http://0.0.0.0:5001/api/v1/status/',
    function (data) {
      if (data.status === 'OK') {
        $('#api_status').toggleClass('available');
      }
    });

  // funcion para crear el article en html para cada PLACE
  function placesRender (data) {
    $('SECTION.places').empty();
    $('SECTION.places').append('<h1>Places</h1>');

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

  function getAmenities (data) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json'
    }).done(function (data) {
      placesRender(data);
    });
  }

  getAmenities({});

  $('BUTTON').click(function () {
    getAmenities({ amenities: amenityIds, states: stateIds, cities: cityIds });
  });
});
