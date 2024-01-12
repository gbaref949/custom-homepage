import { useState, useEffect, useCallback } from 'react'; //necessary imports

const Search = () => {
  //the var I used for the search, autocomplete, and search history
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  //this is the input function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  //this is the function that will be called when the user types into the search bar and searches
  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(searchUrl, '_blank');

    //updates the search history
    setSearchHistory((prevHistory) => {
      const newHistory = [...prevHistory, searchTerm];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  //fetches the suggestions (autocomplete)
  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await fetch(
        `https://suggestqueries.google.com/complete/search?output=json&client=firefox&q=${searchTerm}`
      );
      const [suggestedTerms] = await response.json();
      setSuggestions(suggestedTerms);
    } catch (error) {
      console.error('Error fetching suggestions:', error);//if it doesn't work it will console.log the error
    }
  }, [searchTerm]);

  //noticed that the user may want the ability to clear search history so I added this function
  const clearSearchHistory = () => {
    // Clear search history in state and local storage
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');//forgot to mention the searches is saved on the user's local storage
  };

  useEffect(() => {
    //created a useEffect hook to fetch the suggestions for the automcomplete
    const fetchData = async () => {
      if (searchTerm !== '') {
        await fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    };

    fetchData();//get data

    //loads the search history from local storage
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [searchTerm, fetchSuggestions]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <label htmlFor='searchInput'>Google Search</label>
      <br />
      <form onSubmit={handleSearch}>
        <input
          type='text'
          id='searchInput'
          name='searchInput'
          maxLength={255}
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type='submit'>Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}

      {searchHistory.length > 0 && (
        <div>
          <h6 style={{margin: '1.5 rem'}}>recent searches</h6>
          <ul>
            {searchHistory.map((historyItem, index) => (
              <li key={index}>{historyItem}</li>
            ))}
          </ul>
          <button onClick={clearSearchHistory}>Clear History</button>
        </div>
      )}
    </div>
  );
};

export default Search;