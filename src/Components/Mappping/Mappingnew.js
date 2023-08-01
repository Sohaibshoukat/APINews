import React, { useState } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import MapboxClient from "@mapbox/mapbox-sdk/services/geocoding";

mapboxgl.accessToken = "sk.eyJ1Ijoic29oYWlic2hvdWthdCIsImEiOiJjbGVwZG9veGQwYmJ1M3JwNHFicXM5d3RvIn0.UzIOY9Yg43n-8Z_EJaOwMg";
const mapboxClient = MapboxClient({ accessToken: mapboxgl.accessToken });

function LocationSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    setQuery(event.target.value);
    try {
      const response = await mapboxClient.forwardGeocode({
        query: event.target.value,
        types: ["address", "poi"],
        countries: ["us"],
      }).send();
      setSuggestions(response.body.features);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionClick = (suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <select>
          {suggestions.map((suggestion) => (
            <option key={suggestion.id} onClick={() => handleOptionClick(suggestion)}>
              {suggestion.place_name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default LocationSearch;
