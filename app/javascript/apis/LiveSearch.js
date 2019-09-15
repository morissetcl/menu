const autoCompleteResult = (term) => {
  const searchTerm = (term.length > 3) ? term : ''
  const url = `/private/:user_id/search/recherche?q=${searchTerm}`;
  return fetch(url)
    .then(response => {
      return response
    }).then(result => {
      return result.json()
    }).catch((error) => console.error(error));
};

module.exports = { autoCompleteResult };
