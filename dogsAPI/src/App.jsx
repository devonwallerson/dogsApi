import React, { useState, useEffect } from 'react';

const App = () => {
  const [dogData, setDogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const fetchDogData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thedogapi.com/v1/images/search', {
        method: 'GET',
        headers: {
          'x-api-key': 'live_eDyGAcQuKePh8O7QJpVjqQ8r2Hu45skXRbhjqepY6V5LIiqlLn4dvzvFCe9gHMQK'
        }
      });
      const jsonData = await response.json();
      if (jsonData.length > 0) {
        setDogData(jsonData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchClick = () => {
    fetchDogData();
  };

  const handleBanAttribute = (attribute) => {
    setBannedAttributes([...bannedAttributes, attribute]);
  };

  useEffect(() => {
    fetchDogData();
  }, []);

  return (
    <div>
      <h1>Dog Images</h1>
      <button onClick={handleFetchClick} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Dog Image'}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : dogData ? (
        <div>
          <img src={dogData.url} alt="Dog" style={{ maxWidth: '100%' }} />
          <p>Attributes:</p>
          <ul>
            {Object.entries(dogData).map(([key, value]) => {
              if (typeof value === 'string' && key !== 'url') {
                return (
                  <li key={key} onClick={() => handleBanAttribute(key)}>
                    {key}: {value}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      ) : (
        <p>No dog image available.</p>
      )}
    </div>
  );
};

export default App;