import React, { useState, useEffect } from 'react';

function App() {
  const [images, setImages] = useState([]); 
  const [minRoad, setMinRoad] = useState(0);
  const [maxRoad, setMaxRoad] = useState(100);

  const fetchImages = () => {
    // We only fetch 10 for the UI display, but the ZIP handles everything
    fetch(`http://localhost:8000/api/search?min_road=${minRoad}&max_road=${maxRoad}&limit=10`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setImages([]);
      });
  };

  useEffect(() => {
    fetchImages();
  }, [minRoad, maxRoad]);

  const handleDownload = () => {
    // Downloads all images in this range
    window.open(`http://localhost:8000/api/download-zip?min_road=${minRoad}&max_road=${maxRoad}`, '_blank');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>IDD Dataset Explorer</h1>
      
      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label>Min %:</label>
          <input 
            type="number" 
            value={minRoad} 
            onChange={(e) => setMinRoad(e.target.value)}
            style={{ width: '70px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label>Max %:</label>
          <input 
            type="number" 
            value={maxRoad} 
            onChange={(e) => setMaxRoad(e.target.value)}
            style={{ width: '70px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          onClick={handleDownload}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Download Filtered ZIP
        </button>
      </div>

      <p style={{ color: '#666' }}>Displaying top {images.length} preview images:</p>

      {/* Gallery Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {Array.isArray(images) && images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden', textAlign: 'center', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <img 
                src={`http://localhost:8000/images/${img.image_name}`} 
                alt="dataset" 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
              />
              <div style={{ padding: '15px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '15px', fontWeight: 'bold' }}>{img.image_name}</p>
                <p style={{ margin: '0', fontSize: '14px', color: '#007bff' }}>Road: {img.road_percentage?.toFixed(2)}%</p>
              </div>
            </div>
          ))
        ) : (
          <p>No images found in this range.</p>
        )}
      </div>
    </div>
  );
}

export default App;