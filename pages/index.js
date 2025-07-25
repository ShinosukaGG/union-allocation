import React, { useState } from "react";
import season0 from "../public/top_2000_from_network.json";
import season1 from "../public/season1_ss.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [resultS0, setResultS0] = useState(null);
  const [resultS1, setResultS1] = useState(null);
  const [showSeason1, setShowSeason1] = useState(false);

  const handleSearch = () => {
    const userS0 = season0.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    const userS1 = season1.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );

    setResultS0(userS0 || null);
    setResultS1(userS1 || null);
    setShowSeason1(!!userS1); // auto-show if found
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

      {resultS0 && (
        <div className="result-box">
          <img src={resultS0.pfp} alt="Twitter PFP" className="pfp" />
          <h2 className="username">@{resultS0.username}</h2>
          <p className="mindshare">Mindshare: {resultS0.mindshare}</p>

          {resultS1 && (
            <button
              onClick={() => setShowSeason1(!showSeason1)}
              className="button toggle-button"
            >
              {showSeason1 ? "Hide" : "Show"} Season 1 Stats
            </button>
          )}

          <div className="season-tables">
            {/* Season 0 */}
            <div className="allocation">
              <h3>Your $U Allocation (Season 0):</h3>
              <p className="allocation-value">
                {calculateAllocation(resultS0.mindshare).toLocaleString()} $U
              </p>

              <h3>Value of Your $U Allocation:</h3>
              <table className="fdv-table">
                <tbody>
                  <tr>
                    <td>500M FDV (Ideal)</td>
                    <td>
                      ${(calculateAllocation(resultS0.mindshare) * 0.5).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>1B FDV (Bull)</td>
                    <td>
                      ${calculateAllocation(resultS0.mindshare).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>1.5B FDV (SuperBull)</td>
                    <td>
                      ${(calculateAllocation(resultS0.mindshare) * 1.5).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>2B FDV (GigaBull)</td>
                    <td>
                      ${(calculateAllocation(resultS0.mindshare) * 2).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Season 1 */}
            {resultS1 && showSeason1 && (
              <div className="allocation">
                <h3>Your $U Allocation (Season 1):</h3>
                <p className="allocation-value">
                  {calculateAllocation(resultS1.mindshare).toLocaleString()} $U
                </p>

                <h3>Value of Your $U Allocation:</h3>
                <table className="fdv-table">
                  <tbody>
                    <tr>
                      <td>500M FDV (Ideal)</td>
                      <td>
                        ${(calculateAllocation(resultS1.mindshare) * 0.5).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1B FDV (Bull)</td>
                      <td>
                        ${calculateAllocation(resultS1.mindshare).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1.5B FDV (SuperBull)</td>
                      <td>
                        ${(calculateAllocation(resultS1.mindshare) * 1.5).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>2B FDV (GigaBull)</td>
                      <td>
                        ${(calculateAllocation(resultS1.mindshare) * 2).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
        }
