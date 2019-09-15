const getDataArea = (userId) => {
  const url = '/private/' + userId + '/dashboard.json';
  console.log(url)
  return fetch(url)
    .then(response => {
      return response.json()
    }).catch((error) => console.error(error));
};

module.exports = { getDataArea };
