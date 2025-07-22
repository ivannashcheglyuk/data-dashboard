import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import CatInfo from "./Components/CatInfo";
import "./index.css";
import "./App.css";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [originFilter, setOriginFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch breeds data once
  useEffect(() => {
    async function fetchBreeds() {
      setLoading(true);
      try {
        const res = await fetch(BREEDS_URL, {
          headers: { "x-api-key": API_KEY },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBreeds(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBreeds();
  }, []);

  // Helper to parse lifespan string like "12 - 15 years" into average number
  function parseLifeSpan(str) {
    if (!str) return null;
    const nums = str.match(/\d+/g);
    if (!nums) return null;
    const numbers = nums.map(Number);
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    return avg;
  }

  // Get unique origins for filter dropdown
  const origins = useMemo(() => {
    const allOrigins = breeds.map((b) => b.origin || "Unknown");
    return ["All", ...Array.from(new Set(allOrigins))];
  }, [breeds]);

  // Filter and search breeds
  const filteredBreeds = useMemo(() => {
    return breeds.filter((breed) => {
      const matchesSearch = breed.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      const matchesOrigin =
        originFilter === "All" || breed.origin === originFilter;
      return matchesSearch && matchesOrigin;
    });
  }, [breeds, searchInput, originFilter]);

  // Summary stats:
  const totalBreeds = breeds.length;

  // Average lifespan (mean)
  const avgLifeSpan =
    breeds
      .map((b) => parseLifeSpan(b.life_span))
      .filter((n) => n !== null)
      .reduce((a, b) => a + b, 0) / breeds.length || 0;

  // Count breeds per origin (mode origin)
  const originCounts = useMemo(() => {
    const counts = {};
    breeds.forEach((b) => {
      const o = b.origin || "Unknown";
      counts[o] = (counts[o] || 0) + 1;
    });
    return counts;
  }, [breeds]);

  // Find most common origin (mode)
  const mostCommonOrigin =
    Object.entries(originCounts).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["None", 0]
    )[0] || "None";

  return (
    <div className="whole-page">
      <h1>
        Cat Breeds Dashboard{" "}
        <img
          src="https://cdn.pixabay.com/photo/2019/09/20/12/52/cat-4491642_1280.jpg"
          alt="Cat head"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "50%",
            verticalAlign: "middle",
          }}
        />
      </h1>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Summary Stats */}
      {!loading && !error && (
        <div className="stats">
          <p>Total breeds: {totalBreeds}</p>
          <p>Average lifespan (years): {avgLifeSpan.toFixed(1)}</p>
          <p>Most common origin: {mostCommonOrigin}</p>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search breeds by name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <select
          value={originFilter}
          onChange={(e) => setOriginFilter(e.target.value)}
        >
          {origins.map((origin) => (
            <option key={origin} value={origin}>
              {origin}
            </option>
          ))}
        </select>
      </div>

      {/* Breeds List */}
      <ul className="breed-list">
        {filteredBreeds.length === 0 && (
          <p className="no-breeds">No breeds found.</p>
        )}

        {filteredBreeds.slice(0, 20).map((breed) => (
          <li key={breed.id} className="breed-row">
            <Link
              to={`/cats/${breed.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CatInfo id={breed.id} name={breed.name} />
              <div style={{ marginLeft: "12px" }}>
                <strong>{breed.name}</strong> —{" "}
                <em>{breed.temperament || "No temperament info"}</em>
                <br />
                <small>
                  Origin: {breed.origin || "Unknown"} | Lifespan: {breed.life_span}
                </small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


