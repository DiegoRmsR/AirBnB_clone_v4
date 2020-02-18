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
});
