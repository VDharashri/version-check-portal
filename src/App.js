import React, { useState } from 'react';

const App = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const endpoints = [
    'uat-qnb.godigit.com',
    'uat-core.godigit.com',
    'prod.godigit.com',
    'prod.godigit.in',
  ];

  const buildVersions = {
    'uat-qnb.godigit.com': { current: 'v1.0.3', previous: 'v1.0.2' },
    'uat-core.godigit.com': { current: 'v2.1.0', previous: 'v2.0.9' },
    'prod.godigit.com': { current: 'v3.5.2', previous: 'v3.5.1' },
    'prod.godigit.in': { current: '6.0.0', previous: 'v6.6.6' },
  };

  const handleBuild = () => {
    if (selectedEndpoint) {
      setResult(buildVersions[selectedEndpoint]);
    } else {
      alert("Please select an endpoint.");
    }
  };

  const filteredEndpoints = endpoints.filter(ep =>
    ep.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (ep) => {
    setSelectedEndpoint(ep);
    setSearchTerm(ep);
    setDropdownVisible(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: 'Poppins, sans-serif',
        maxWidth: '520px',
        margin: 'auto',
        borderRadius: '15px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#121212' : '#f9fcff',
        color: darkMode ? '#eee' : '#000',
        transition: 'all 0.3s ease',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
        🚀 Pipeline Portal - abs-check-version
      </h1>

      {/* Dark Mode Toggle */}
      <div
        className="mode-toggle"
        onClick={toggleDarkMode}
        role="switch"
        aria-checked={darkMode}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') toggleDarkMode(); }}
        style={{
          width: '140px',
          height: '36px',
          backgroundColor: darkMode ? '#444' : '#ccc',
          borderRadius: '50px',
          position: 'relative',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          userSelect: 'none',
          boxSizing: 'border-box',
          outline: 'none',
          transition: 'background-color 0.3s',
        }}
      >
        <div
          className={`toggle-option ${!darkMode ? 'active' : ''}`}
          style={{
            width: '50%',
            textAlign: 'center',
            color: !darkMode ? '#000' : '#aaa',
            fontWeight: !darkMode ? '700' : '400',
            userSelect: 'none',
            transition: 'color 0.3s',
            zIndex: 1,
          }}
        >
          Light
        </div>
        <div
          className={`toggle-option ${darkMode ? 'active' : ''}`}
          style={{
            width: '50%',
            textAlign: 'center',
            color: darkMode ? '#000' : '#aaa',
            fontWeight: darkMode ? '700' : '400',
            userSelect: 'none',
            transition: 'color 0.3s',
            zIndex: 1,
          }}
        >
          Dark
        </div>
        <div
          className="toggle-thumb"
          style={{
            position: 'absolute',
            top: '3px',
            left: '3px',
            width: '65px',
            height: '30px',
            backgroundColor: '#00dfd8',
            borderRadius: '50px',
            transition: 'transform 0.3s',
            zIndex: 0,
            boxShadow: '0 2px 5px rgba(0, 223, 216, 0.6)',
            transform: darkMode ? 'translateX(70px)' : 'translateX(3px)',
          }}
        ></div>
      </div>

      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        This build requires parameters:
      </p>

      <label
        htmlFor="endpoint"
        style={{
          fontWeight: 'bold',
          display: 'block',
          marginBottom: '8px',
          marginTop: '10px',
        }}
      >
        ENDPOINT
      </label>

      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          id="endpoint"
          type="text"
          placeholder="Search or select endpoint..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setDropdownVisible(true);
          }}
          onFocus={() => setDropdownVisible(true)}
          autoComplete="off"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '15px',
            borderRadius: '8px',
            border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
            color: darkMode ? '#fff' : '#000',  // <-- Bright text in dark mode
            transition: '0.3s',
          }}
        />

        {dropdownVisible && (
          <ul
            style={{
              position: 'absolute',
              width: '100%',
              
              border: `1px solid ${darkMode ? '#555' : '#ddd'}`,
              borderTop: 'none',
              maxHeight: '160px',
              overflowY: 'auto',
              zIndex: 1,
              borderRadius: '0 0 8px 8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              backgroundColor: darkMode ? '#1e1e1e' : '#fff',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {filteredEndpoints.length > 0 ? (
              filteredEndpoints.map((ep) => (
                <li
                  key={ep}
                  onClick={() => handleSelect(ep)}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                    color: darkMode ? '#fff' : '#000', // Bright text for dark mode dropdown items
                    transition: '0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = darkMode ? '#333' : '#f0f8ff'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {ep}
                </li>
              ))
            ) : (
              <li style={{ padding: '10px', color: '#999' }}>No match found</li>
            )}
          </ul>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <button
          onClick={handleBuild}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(90deg, #007cf0, #00dfd8)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          🔄 Build
        </button>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: '#e2e2e2',
            border: 'none',
            borderRadius: '8px',
            color: '#333',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ❌ Cancel
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            border: `1px solid ${darkMode ? '#3b5167' : '#a7dfff'}`,
            borderRadius: '10px',
            backgroundColor: darkMode ? '#1b2a3a' : '#e7f7ff',
            color: darkMode ? '#cbd5e1' : '#000',
            transition: 'all 0.3s ease',
          }}
        >
          <p><strong>Previous Version:</strong> {result.previous}</p>
          <p><strong>Current Version:</strong> {result.current}</p>
        </div>
      )}
    </div>
  );
};

export default App;
