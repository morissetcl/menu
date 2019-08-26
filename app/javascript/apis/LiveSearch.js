const autoCompleteResult = (term) => {
  const url = `/private/:user_id/dashboard/recherche?q=${term}`;
  return fetch(url)
    .then(response => {
      return response
    }).then(result => {
      return result.json()
    }).catch((error) => console.error(error));
};

module.exports = { autoCompleteResult };
