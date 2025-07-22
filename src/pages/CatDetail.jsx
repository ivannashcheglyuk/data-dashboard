import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export default function CatDetail() {
    const { id } = useParams();
    const [breed, setBreed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchDetails() {
            try {
                setLoading(true);
                const res = await fetch("https://api.thecatapi.com/v1/breeds", {
                    headers: { "x-api-key": API_KEY },
                });
                if (!res.ok) throw new Error(`Breed fetch error ${res.status}`);
                const data = await res.json();
                const breedData = data.find((b) => b.id === id);
                if (!breedData) throw new Error(`No breed found with ID: ${id}`);
                setBreed(breedData);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [id]);

    if (loading) return <p>Loading details...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!breed) return <p>No breed found with ID {id}</p>;

    // Helper function to render a trait bar
    const TraitBar = ({ label, value }) => (
        <div style={{ marginBottom: "8px" }}>
            <strong>{label}:</strong>
            <div style={{ background: "#eee", height: "16px", borderRadius: "8px", marginTop: "4px" }}>
                <div
                    style={{
                        width: `${(value / 5) * 100}%`,
                        background: "#4caf50",
                        height: "100%",
                        borderRadius: "8px",
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="cat-detail-page">
            <h2>{breed.name}</h2>
            <img
                src={breed.image?.url || "https://via.placeholder.com/300?text=No+Image"}
                alt={breed.name}
                style={{ maxWidth: 300, borderRadius: 8 }}
            />
            <p><strong>Origin:</strong> {breed.origin}</p>
            <p><strong>Description:</strong> {breed.description}</p>

            <h3>Breed Traits</h3>
            <div style={{ maxWidth: 300 }}>
                <TraitBar label="Energy Level" value={breed.energy_level} />
                <TraitBar label="Intelligence" value={breed.intelligence} />
                <TraitBar label="Affection Level" value={breed.affection_level} />
                <TraitBar label="Adaptability" value={breed.adaptability} />
                <TraitBar label="Social Needs" value={breed.social_needs} />
            </div>

            <Link to="/">← Back to Dashboard</Link>
        </div>
    );
}

