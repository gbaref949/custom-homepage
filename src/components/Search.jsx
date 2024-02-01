import { useState, useEffect } from 'react'; //necessary imports
import { FaSearch, FaTrash } from 'react-icons/fa'; //import icons from react-icons library
import { CiCircleRemove } from 'react-icons/ci';
import { BiHistory } from 'react-icons/bi';
import { MdClear } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

import bckg from '../images/bckg.jpeg';
import bckg1 from '../images/bckg1.jpeg';
import bckg2 from '../images/bckg2.jpeg';
import bckg3 from '../images/bckg3.jpeg';
import bckg4 from '../images/bckg4.jpeg';
import bckg5 from '../images/bckg5.jpeg';

const Search = () => {
  //the var I used for the search, autocomplete, and search history
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  //this is the input function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  //this is the function that will be called when the user types into the search bar and searches
  const handleSearch = (e) => {
    e.preventDefault();

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    window.open(searchUrl, '_blank');

    //updates the search history
    setSearchHistory((prevHistory) => {
      const newHistory = [...prevHistory, searchTerm];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });

    setSearchTerm(''); //clears whjat's left
  };

  const clearSearchTerm = () => {
    setSearchTerm(''); //clears the search input field
  };

  const handleSearchHistoryClick = (historyItem) => {
    setSearchTerm(historyItem);

    //perform the search
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      historyItem
    )}`;
    window.open(searchUrl, '_blank');
  };

  //noticed that the user may want the ability to clear search history so I added this function
  const clearSearchHistory = () => {
    //clear search history in state and local storage
    setSearchHistory([]);
    localStorage.removeItem('searchHistory'); //forgot to mention the searches is saved on the user's local storage
  };

  const clearOneSearchHistory = (indexToRemove) => {
    //remove the specified item from search history
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(indexToRemove, 1);

    //update state and local storage
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, [searchTerm]);

  return (
    <div className='container'>
      <div className='image-slider'>
        <img src={bckg} alt='zero background' className='overlay' />
        <img src={bckg1} alt='first background' className='overlay' />
        <img src={bckg2} alt='second background' className='overlay' />
        <img src={bckg3} alt='third background' className='overlay' />
        <img src={bckg4} alt='fourth background' className='overlay' />
        <img src={bckg5} alt='fifth background' className='overlay' />
      </div>
      <div className='search-container'>
        <h1 className='title'>Georgi Search</h1>
        <form onSubmit={handleSearch} className='search-form'>
          <div className='search-input-container'>
            <FaSearch size='2rem' color='#969697' className='search-icon' />
            <input
              type='text'
              id='searchInput'
              name='searchInput'
              value={searchTerm}
              onChange={handleInputChange}
              className='search-input'
              placeholder='Type To Search...'
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              autoComplete='off'
            />
            {searchTerm && searchHistory.length > 0 && (
              <div className='search-history-container'>
                <ul>
                  {searchHistory.map((historyItem, index) => (
                    <li
                      key={index}
                      className='search-history-item'
                      onClick={() => handleSearchHistoryClick(historyItem)}
                    >
                      <BiHistory
                        size={'1.75rem'}
                        color='#969697'
                        className='search-history'
                      />
                      {historyItem}
                      <MdClear
                        size={'1.75rem'}
                        className='i-search-clear'
                        color='#969697 '
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the click from reaching the parent li
                          clearOneSearchHistory(index);
                        }}
                        title='clear one item'
                      />
                    </li>
                  ))}
                </ul>
                <button
                  onClick={clearSearchHistory}
                  className='clear-history-button'
                  title='clear all items'
                >
                  <FaTrash className='clear-history-icon' size='1.5rem' />
                </button>
              </div>
            )}
            <CiCircleRemove
              size='2.5rem'
              color='#969697'
              className='search-clear'
              onClick={clearSearchTerm}
            />
            <button id='searchButton' type='submit' className='search-button'>
              Search
            </button>
            <div className='quick-links'>
              <a
                href='https://github.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub size='2.5rem' color='black' />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin size='2.5rem' color='#3a77cc' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram size='2.5rem' color='purple' />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
