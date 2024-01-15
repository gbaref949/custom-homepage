import { useState, useEffect } from 'react'; //necessary imports
import { FaSearch, FaHistory, FaTrash } from 'react-icons/fa';//import icons from react-icons library
import { MdClear } from 'react-icons/md';
import bckg from '../images/bckg.png';
import bckg1 from '../images/bckg(1).png';
import bckg2 from '../images/bckg(2).png';
import bckg3 from '../images/bckg(3).png';
import bckg4 from '../images/bckg(4).png';
import bckg5 from '../images/bckg(5).png';


const Search = () => {
  //the var I used for the search, autocomplete, and search history
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  // const [loading, setLoading] = useState(true);

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

  //noticed that the user may want the ability to clear search history so I added this function
  const clearSearchHistory = () => {
    // Clear search history in state and local storage
    setSearchHistory([]);
    localStorage.removeItem('searchHistory'); //forgot to mention the searches is saved on the user's local storage
  };

  useEffect(() => {
    // setLoading(false);

    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [searchTerm]);

  // if (loading) {
  //   return (
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a7"><stop offset="0" stop-color="#17172B" stop-opacity="0"></stop><stop offset="1" stop-color="#17172B"></stop></linearGradient><circle fill="none" stroke="url(#a7)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>
  //   );
  // }

  return (
    <div className='container'>
      <img src={bckg} alt='zero background' />
      <img src={bckg1} alt='first background' />
      <img src={bckg2} alt='second background' />
      <img src={bckg3} alt='third background' />
      <img src={bckg4} alt='fourth background' />
      <img src={bckg5} alt='fifth background' />

      <div className='search-container'>
        <label htmlFor='searchInput' className='title'>
          Google
        </label>
        <form onSubmit={handleSearch} className='search-form'>
          <div className='search-input-container'>
            <FaSearch size='3.5rem' color='grey' className='search-icon' />
            <input
              type='text'
              id='searchInput'
              name='searchInput'
              maxLength={255}
              value={searchTerm}
              onChange={handleInputChange}
              className='search-input'
              placeholder='Type To Search...'
            />
            <MdClear size='3.5rem' color='grey' className='search-clear' />
            <button type='submit' className='search-button'>
              Search
            </button>
          </div>
        </form>

        {searchHistory.length > 0 && (
          <div className='search-history-container'>
            <h4 className='search-history-title'>Recent Searches</h4>
            {/* <FaHistory size={'3rem'}> */}
            <ul className='search-history-list'>
              {searchHistory.map((historyItem, index) => (
                <li key={index}>{historyItem}</li>
              ))}
            </ul>
            {/* </FaHistory> */}
            <button
              onClick={clearSearchHistory}
              className='clear-history-button'
            >
              <FaTrash className='clear-history-icon' size='4rem' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
