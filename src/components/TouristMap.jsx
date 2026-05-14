import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/TouristMap.css';
import { useAdmin } from '../context/AdminContext';

// Fix Leaflet's default marker icon broken by bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Center of San Carlos City
const SAN_CARLOS_CENTER = [10.4928, 123.4142];

// Inner component — has access to the map instance via useMap()
function MapController({ target, spots }) {
  const map = useMap();
  const markerRefs = useRef({});

  useEffect(() => {
    if (!target) return;
    const { coordinates, id } = target;
    // Fly smoothly to the location then open its popup
    map.flyTo(coordinates, 16, { duration: 1.2 });
    setTimeout(() => {
      const marker = markerRefs.current[id];
      if (marker) marker.openPopup();
    }, 1300);
  }, [target, map]);

  return (
    <>
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={spot.coordinates}
          ref={(ref) => { markerRefs.current[spot.id] = ref; }}
        >
          <Popup minWidth={220}>
            <div className="map-popup">
              <img src={spot.image} alt={spot.name} className="map-popup-image" />
              <div className="map-popup-body">
                <h3>{spot.name}</h3>
                <p className="map-popup-location">📍 {spot.location}</p>
                <p>{spot.description}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function TouristMap() {
  const { destinations } = useAdmin();

  // Only show destinations that have valid coordinates
  const spots = destinations
    .filter((d) => d.lat && d.lng)
    .map((d) => ({ ...d, coordinates: [parseFloat(d.lat), parseFloat(d.lng)] }));

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [target, setTarget] = useState(null);

  function handleInput(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = spots.filter((s) =>
      s.name.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered);
  }

  function handleSelect(spot) {
    setQuery(spot.name);
    setSuggestions([]);
    setTarget({ ...spot, _ts: Date.now() });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  }

  return (
    <section className="tourist-map-section">
      <div className="tourist-map-header">
        <h2>Tourist Spots Map</h2>
        <p>Explore the locations of San Carlos City's top attractions</p>
      </div>

      {/* Search bar */}
      <div className="map-search-wrapper">
        <div className="map-search-box">
          <span className="map-search-icon">🔍</span>
          <input
            type="text"
            className="map-search-input"
            placeholder="Search a tourist spot..."
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="map-search-clear"
              onClick={() => { setQuery(''); setSuggestions([]); }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {suggestions.length > 0 && (
          <ul className="map-suggestions">
            {suggestions.map((spot) => (
              <li
                key={spot.id}
                className="map-suggestion-item"
                onClick={() => handleSelect(spot)}
              >
                <span className="suggestion-pin">📍</span>
                {spot.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tourist-map-wrapper">
        <MapContainer
          center={SAN_CARLOS_CENTER}
          zoom={13}
          scrollWheelZoom={false}
          className="tourist-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController target={target} spots={spots} />
        </MapContainer>
      </div>
    </section>
  );
}

export default TouristMap;
