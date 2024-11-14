import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import {Search} from 'react-bootstrap-icons'
import './Styles/SearchBar.css'
export default function Searcher({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar-wrapper">
      <InputGroup>
        <InputGroup.Text className='icon-wrapper'>
          <Search className='icon'/>
        </InputGroup.Text>
          <FormControl
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className="searchBar me-2"
        />
      </InputGroup>
      
    </div>
  );
}
