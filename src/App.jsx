import React, { useState } from 'react';
import { db, collection, getDocs, query, where } from './firebaseConfig';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const q = query(collection(db, 'fcc_amateur_shamoon'), where('callsign', '==', searchTerm.toUpperCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setResults([]);
    } else {
      const data = querySnapshot.docs.map(doc => doc.data());
      setResults(data);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ham Radio Operator Lookup</h1>
        <div className="form-container">
          <input
            type="text"
            placeholder="Enter Call Sign"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result-item">
                <h2>{result.callsign}</h2>
                <p><strong>Name:</strong> {result.full_name}</p>
                <p><strong>First Name:</strong> {result.first}</p>
                <p><strong>Middle Name:</strong> {result.middle}</p>
                <p><strong>Last Name:</strong> {result.last}</p>
                <p><strong>Address:</strong> {result.address1}, {result.city}, {result.state}, {result.zip}</p>
                <p><strong>Class:</strong> {result.class}</p>
                <p><strong>Former Call:</strong> {result.former_call}</p>
                <p><strong>Former Class:</strong> {result.former_class}</p>
                <p><strong>Col4:</strong> {result.col4}</p>
                <p><strong>Col5:</strong> {result.col5}</p>
                <p><strong>Col6:</strong> {result.col6}</p>
                <p><strong>Status:</strong> {result.status}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
