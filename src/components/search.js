import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const baseUrl = 'http://openlibrary.org';

// API search function
function searchCharacters(query) {
    const url = new URL(baseUrl + '/search.json');
    url.searchParams.append('title', query);

    return fetch(url)
    .then(response => response.json());
}

export function Search() {
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

    const resultList = (results || []).map((book) =>
    <tr key={ book.key }>
        <td>{ book.title }</td>
        <td>{ book.author_name && book.author_name.join(', ') }</td>
        <td>{ book.first_publish_year }</td>
    </tr>
    );

    return (
        <>
        <div>
            <input
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
            <h1 className="h1">Search Results</h1>
            <div className="books">
                <table>
                    <thead>
                        <tr>
                            <th className="title-col">Title</th>
                            <th className="author-col">Author</th>
                            <th className="year-col">Pub Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        { resultList }
                    </tbody>
                </table>
                </div>
                </div>
            </div>
            </>
    )
}


