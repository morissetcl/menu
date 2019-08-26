const getComments = (userId, restaurantId) => {
  const url = `/private/${userId}/restaurant/${restaurantId}/comments`;
  return fetch(url)
    .then(response => {
      return response
    }).then(result => {
      return result.json()
    }).catch((error) => console.error(error));
};

module.exports = { getComments };
