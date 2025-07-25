import React, { useState } from "react";
import season0 from "../public/top_2000_from_network.json";
import season1 from "../public/season1_ss.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [result0, setResult0] = useState(null);
  const [result1, setResult1] = useState(null);

  const handleSearch = () => {
    const q = query.trim().toLowerCase();
    const user0 = season0.find((u) => u.username.toLowerCase() === q);
    const user1 = season1.find((u) => u.username.toLowerCase() === q);
    setResult0(user0 || null);
    setResult1(user1 || null);
  };

  const calculateAllocation = (mindshare) =>
    parseFloat(mindshare) * 45000;

  const renderCard = (result, title) => (
    <div
      style={{
        background: "#111",
        padding: "1.5rem",
        borderRadius: "1rem",
        textAlign: "center",
        flex: 1,
        maxWidth: "420px",
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>{title}</h3>
      <h4>Your $U Allocation:</h4>
      <p style={{ fontSize: "1.8rem", margin: "0.5rem 0" }}>
        {calculateAllocation(result.mindshare).toLocaleString()} $U
      </p>
      <h4>Value of Your $U Allocation:</h4>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <tbody>
          {[
            { label: "500M FDV (Ideal)", mul: 0.5 },
            { label: "1B FDV (Bull)", mul: 1 },
            { label: "1.5B FDV (SuperBull)", mul: 1.5 },
            { label: "2B FDV (GigaBull)", mul: 2 },
          ].map(({ label, mul }) => (
            <tr key={label} style={{ borderBottom: "1px solid #333" }}>
              <td style={{ padding: "0.4rem", textAlign: "left" }}>{label}</td>
              <td style={{ padding: "0.4rem", textAlign: "right" }}>
                $
                {(calculateAllocation(result.mindshare) * mul).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Union Allocation Calculator by Shinosuka
      </h1>

      <div style={{ width: "100%", maxWidth: "500px", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Shinosuka_eth"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#444",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          Search
        </button>
      </div>

      {(result0 || result1) && (
        <div
          style={{
            background: "#111",
            padding: "2rem",
            borderRadius: "1.5rem",
            textAlign: "center",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          {result0 && (
            <img
              src={result0.pfp}
              alt="PFP"
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                border: "2px solid #444",
                marginBottom: "1rem",
              }}
            />
          )}
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.2rem" }}>
            @{(result0 || result1)?.username}
          </h2>
          <p style={{ color: "#aaa", marginBottom: "2rem" }}>
            Mindshare: {(result0 || result1)?.mindshare}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {result0 && renderCard(result0, "Season 0 Stats")}
            {result1 && renderCard(result1, "Season 1 Stats")}
          </div>
        </div>
      )}
    </div>
  );
        }
