import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Find Your Friend !"
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default Search;
