import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const baseUrl = 'http://openlibrary.org';

export default function Search() {
    // State and setters for ...
    // Search term
    const [searchTerm, setSearchTerm] = useState("");
    // API search results
    const [results, setResults] = useState([]);
    // Searching status (whether there is pending API request)
    const [isSearching, setIsSearching] = useState(false);
    // Debounce search term so that it only gives us latest value ...
    // ... if searchTerm has not been updated within last 500ms.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Effect for API call
    useEffect(
        () => {
            if (debouncedSearchTerm) {
                setIsSearching(true);
                searchCharacters(debouncedSearchTerm).then((results) => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults([]);
                setIsSearching(false);
            }
        },
        [debouncedSearchTerm]// Only call effect if debounced search term changes
    );

    return (
        <div>
            <input
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {isSearching && <div>Searching...</div>}

            {results.map((result) => (
                <div key={result.id}>
                    <h4>{result.title}</h4>
                </div>
            ))}
        </div>
    );
}

// API search function
async function searchCharacters(query) {
    const url = new URL(baseUrl + '/search.json');
    url.searchParams.append('title', query);

    try {
        const r = await fetch(url);
        const r_1 = await r.json();
        return r_1.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

