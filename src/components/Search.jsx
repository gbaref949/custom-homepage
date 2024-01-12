import { useState, useEffect, useCallback } from 'react'; //necessary imports
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  //the var I used for the search, autocomplete, and search history
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true)

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
        `http://suggestqueries.google.com/complete/search?client=firefox&q=YOURQUERY${searchTerm}`
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
    setLoading(false)
    fetchData();//get data

    //loads the search history from local storage
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [searchTerm, fetchSuggestions]);

  if(loading){
        return(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a7"><stop offset="0" stop-color="#17172B" stop-opacity="0"></stop><stop offset="1" stop-color="#17172B"></stop></linearGradient><circle fill="none" stroke="url(#a7)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
        )
    }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem' }}>
      <label htmlFor='searchInput'>Google Search</label>
      <br />
      <form onSubmit={handleSearch}>
        <IoIosSearch />
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
          <h4 style={{margin: '1.5 rem'}}>Recent Searches</h4>
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