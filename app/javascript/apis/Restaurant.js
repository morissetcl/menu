const getRestaurant = (restaurantId) => {
  const url = '/restaurant/' + restaurantId + '.json';
  return fetch(url)
    .then(response => {
      return response;
    }).then(restaurant => {
      return restaurant.json();
    }).catch((error) => console.error(error));
};

module.exports = { getRestaurant };
