const getFavorites = (userId) => {
  const url = '/private/' + userId + '/favorite.json';
  return fetch(url)
    .then(response => {
      return response
    }).then(favorites => {
      return favorites.json()
    }).catch((error) => console.error(error));
};

const deleteFavorite = (userId, restaurantId) => {
  const url = `/private/${userId}/favorite/${restaurantId}`;
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => { response })
    .catch((error) => console.error(error));
}

module.exports = { getFavorites, deleteFavorite };
