const useFetch = () => {

  const fetchTransactions = async (url) => {
    
    const result = await fetch(`${url}`)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log('fetch error', err);
        return [];
      })

    return result;

  };

  return { fetchTransactions };

};

export { useFetch };
