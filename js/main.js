'use strict';

(function () {

var title = ['Милая, уютная квартирка в центре Токио', 'Уютное гнездышко для молодоженов', 'Квартира-студия в центре Токио', 'Двухкомнатная квартира'];
var price = [1000, 2000, 3000, 4000, 5000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_WIDTH = 1200;
var MAP_PIN_WIDTH = 50;
var HEIGHT = {
  min: 130,
  max: 630
};


var usedNumber = [];

var getRandomAvatar = function (text, n) {
  
  var number = '0' + Math.ceil(Math.random() * n);

  if (usedNumber.includes(number)) {
    return getRandomAvatar(text, n);
  } else {
    usedNumber.push(number);
  }
  return text + number + '.png';
};

var getRamdomIndex = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return  arr[randomIndex];
   
};

var adress = function () {
  var randomX = Math.floor(Math.random() * 1001);
  var randomY = Math.floor(Math.random() * 1001);

  return {
    locX: randomX,
    locY: randomY
  }
};

var getRandomGuest = function () {
  var randomGuest = Math.floor(Math.random() * 4);

  if (randomGuest === 0) {
    return 'not guest';
  } else {
    return randomGuest;
  } 
};

var getRandomRoom = function () {
  var randomRoom = Math.floor(1 + Math.random() * 3);
  
  return randomRoom;
};

var getRandomLength = function (arr) {
  var arr1 = arr.slice(0, Math.floor(1 + Math.random() * arr.length));
  
  return arr1;
};

var getRandomLocation = function (width, pinWidth, min, max) {
  var coordX = Math.floor(Math.random() * (width + 1 - pinWidth)) ;
  var coordY = min + Math.floor( Math.random() * (max + 1 - min)) ;

  return {
    x: coordX,
    y: coordY
  };
};

var getRandomMock = function () {
  var avar = getRandomAvatar('img/avatars/user', 8);
  

  var offerTitle =  getRamdomIndex(title);
  
  var offerAdress = adress();

  var offerPrice = getRamdomIndex(price);

  var offerType = getRamdomIndex(type);

  var offerGuest = getRandomGuest();
 
  var offerRoom = getRandomRoom();
 
  var offerCheckin = getRamdomIndex(checkin);
 
  var offerCheckout = getRamdomIndex(checkout);
 
  var offerFeatures = getRandomLength(features);

  var offerPhotos = getRandomLength(photos);
 
  var offerLocation = getRandomLocation(MAX_WIDTH, MAP_PIN_WIDTH, HEIGHT.min, HEIGHT.max);
 
  return {
      author: {
        avatar: avar
        },
      offer: {
        title: offerTitle,
        address: offerAdress,
        price: offerPrice,
        type: offerType,
        rooms: offerRoom,
        guests: offerGuest,
        checkin: offerCheckin,
        checkout: offerCheckout,
        features: offerFeatures,
        description: 'Some description',
        photos: offerPhotos,
      },

      location: {
        x: offerLocation.x,
        y: offerLocation.y
      }
    };
};

var orders = [];

for (var j = 0; orders.length < 8; j++) {
  orders[j] = getRandomMock();
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var renderOrder = function (order) {
  var orderTemplate = document.querySelector('#pin').content;
  var newElement = orderTemplate.cloneNode(true);
  var mapPin = newElement.querySelector('.map__pin');
  mapPin.style.left = order.location.x + 'px';
  mapPin.style.top = order.location.y + 'px';
  mapPin.querySelector('img').src = order.author.avatar;
  mapPin.querySelector('img').alt = order.offer.title;

  return mapPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < orders.length; i++) {
  fragment.appendChild(renderOrder(orders[i]));
};

map.appendChild(fragment);

})();
