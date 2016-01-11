// var api = fetch( 'http://private-6cb65-natuecart.apiary-mock.com/cart' );
var actualPage = 0;
var button = document.getElementsByTagName('button');

function checkStatus( response ) {
  'use strict';
  if ( response.status >= 200 && response.status <= 300 ) {
    return response;
  } else {
    var error = new Error( response.statusText )
    error.response = response
    throw error
  }
}

function parseJSON( response ) {
  'use strict';
  return response.json()
}

function insertPhoto( json ) {
  'use strict';
  var response = json.photos.photo;

  for ( var i = 0; i < response.length; i++ ) {
    var res = response[i];
    var photoURL = 'https://farm' + res.farm + '.staticflickr.com/' + res.server + '/' + res.id + '_' + res.secret + '_c.jpg';
    var pageURL = 'https://www.flickr.com/photos/' + res.owner + '/' + res.id;

    var main = document.getElementById('main');

    var image = document.createElement('img');
    image.dataset.src = photoURL;

    var link = document.createElement('a');
    link.href = pageURL;
    link.target = '_blank';
    link.appendChild( image );
    main.appendChild( link );
  };
}

function apiRequest () {
  actualPage += 1;
  apiCall( actualPage );
}

function apiCall ( page ) {
  var api = fetch( 'https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=1ffb7cd5bf02d184a4695641e21e634f&per_page=10&page=' + actualPage + '&format=json&nojsoncallback=1' );

  api.then( checkStatus )
    .then( parseJSON )
    .then( insertPhoto )
    .then( lazyImageLoader )
    .catch( function( error ) {
      console.log( 'request failed', error );
    })
}

function lazyImageLoader () {
  'use strict';
  var lazyImage = document.querySelectorAll('img[data-src]');

  for (var i = 0; i < lazyImage.length; i++) {
    // var boundaries = lazyImage[i].getBoundingClientRect();
    // if (boundaries.top > 0 && boundaries.top < document.body.offsetHeight) {
      lazyImage[i].setAttribute( 'src', lazyImage[i].dataset.src );
      lazyImage[i].removeAttribute('data-src');
    // }
  };
};

button[0].addEventListener( 'click', apiRequest, false );

