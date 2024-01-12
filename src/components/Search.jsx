import {useState} from 'react'
import { IoIosSearch } from "react-icons/io";
mlnll
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    window.open(searchUrl, '_blank');
  };

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
        <button type='submit' className='btn'>Search</button>
      </form>
    </div>
  );
};

export default Search