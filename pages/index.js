import React, { useState } from "react";
import season0 from "../public/top_2000_from_network.json";
import season1 from "../public/season1_ss.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [result0, setResult0] = useState(null);
  const [result1, setResult1] = useState(null);

  const handleSearch = () => {
    const user0 = season0.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    const user1 = season1.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    setResult0(user0 || null);
    setResult1(user1 || null);
  };

  const calculateAllocation = (mindshare) => {
    return parseFloat(mindshare) * 45000;
  };

  return (
    <div className="container">
      <h1 className="title">Union Allocation Calculator by Shinosuka</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
      </div>

      {(result0 || result1) && (
        <div className="user-box">
          {(result0?.pfp || result1?.pfp) && (
            <img
              src={result0?.pfp || result1?.pfp}
              alt="Twitter PFP"
              className="pfp"
            />
          )}
          <h2 className="username">
            @{result0?.username || result1?.username || query}
          </h2>
          {result0 && <p className="mindshare">Season 0 Mindshare: {result0.mindshare}</p>}
          {result1 && <p className="mindshare">Season 1 Mindshare: {result1.mindshare}</p>}
        </div>
      )}

      {(result0 || result1) && (
        <div className="tables">
          {result0 && (
            <div className="season-box">
              <h3>Season 0 Stats</h3>
              <p className="allocation-value">
                {calculateAllocation(result0.mindshare).toLocaleString()} $U
              </p>
              <table className="fdv-table">
                <tbody>
                  <tr>
                    <td>500M FDV (Ideal)</td>
                    <td>${(calculateAllocation(result0.mindshare) * 0.5).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>1B FDV (Bull)</td>
                    <td>${(calculateAllocation(result0.mindshare) * 1).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>1.5B FDV (SuperBull)</td>
                    <td>${(calculateAllocation(result0.mindshare) * 1.5).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>2B FDV (GigaBull)</td>
                    <td>${(calculateAllocation(result0.mindshare) * 2).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {result1 && (
            <div className="season-box">
              <h3>Season 1 Stats</h3>
              <p className="allocation-value">
                {calculateAllocation(result1.mindshare).toLocaleString()} $U
              </p>
              <table className="fdv-table">
                <tbody>
                  <tr>
                    <td>500M FDV (Ideal)</td>
                    <td>${(calculateAllocation(result1.mindshare) * 0.5).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>1B FDV (Bull)</td>
                    <td>${(calculateAllocation(result1.mindshare) * 1).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>1.5B FDV (SuperBull)</td>
                    <td>${(calculateAllocation(result1.mindshare) * 1.5).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>2B FDV (GigaBull)</td>
                    <td>${(calculateAllocation(result1.mindshare) * 2).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
          }
