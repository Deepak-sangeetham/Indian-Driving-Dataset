import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [range, setRange] = useState(30); // Default filter

  useEffect(() => {
    // Fetch data from your FastAPI backend
    fetch(`http://localhost:8000/api/search?min_road=0&max_road=${range}`)
      .then(res => res.json())
      .then(json => setData(json));
  }, [range]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>IDD Road Explorer</h1>
      
      <label>Max Road Percentage: {range}%</label>
      <input 
        type="range" 
        min="0" max="100" 
        value={range} 
        onChange={(e) => setRange(e.target.value)} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {data.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            {/* Note: We use the backend URL to show the actual image */}
            <img 
              src={`http://localhost:8000/images/${item.image_name}`} 
              alt={item.image_name} 
              style={{ width: '100%', borderRadius: '4px' }} 
            />
            <p><strong>{item.image_name}</strong></p>
            <p>Road: {item.road_percentage.toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;