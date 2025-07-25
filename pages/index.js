import React, { useState } from "react";
import data from "../public/top_2000_from_network.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [season1Data, setSeason1Data] = useState(null);

  const handleSearch = async () => {
    const user = data.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(user || null);

    try {
      const res = await fetch("/season1-ss.json");
      const json = await res.json();
      const season1User = json.find(
        (u) => u.username.toLowerCase() === query.trim().toLowerCase()
      );
      setSeason1Data(season1User || null);
    } catch (err) {
      console.error("Failed to fetch Season 1 data");
      setSeason1Data(null);
    }
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

      {result && (
        <div className="result-box">
          <img src={result.pfp} alt="Twitter PFP" className="pfp" />
          <h2 className="username">@{result.username}</h2>
          <p className="mindshare">Mindshare: {result.mindshare}</p>

          <div className="season-tables">
            {/* Season 0 */}
            <div className="allocation">
              <h3>Your $U Allocation (Season 0):</h3>
              <p className="allocation-value">
                {calculateAllocation(result.mindshare).toLocaleString()} $U
              </p>

              <h3>Value of Your $U Allocation:</h3>
              <table className="fdv-table">
                <tbody>
                  <tr>
                    <td>500M FDV (Ideal)</td>
                    <td>
                      $
                      {(
                        calculateAllocation(result.mindshare) * 0.5
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>1B FDV (Bull)</td>
                    <td>
                      $
                      {calculateAllocation(result.mindshare).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>1.5B FDV (SuperBull)</td>
                    <td>
                      $
                      {(
                        calculateAllocation(result.mindshare) * 1.5
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>2B FDV (GigaBull)</td>
                    <td>
                      $
                      {(
                        calculateAllocation(result.mindshare) * 2
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Season 1 (if found) */}
            {season1Data && (
              <div className="allocation">
                <h3>Your $U Allocation (Season 1):</h3>
                <p className="allocation-value">
                  {calculateAllocation(season1Data.mindshare).toLocaleString()} $U
                </p>

                <h3>Value of Your $U Allocation:</h3>
                <table className="fdv-table">
                  <tbody>
                    <tr>
                      <td>500M FDV (Ideal)</td>
                      <td>
                        $
                        {(
                          calculateAllocation(season1Data.mindshare) * 0.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1B FDV (Bull)</td>
                      <td>
                        $
                        {calculateAllocation(
                          season1Data.mindshare
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1.5B FDV (SuperBull)</td>
                      <td>
                        $
                        {(
                          calculateAllocation(season1Data.mindshare) * 1.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>2B FDV (GigaBull)</td>
                      <td>
                        $
                        {(
                          calculateAllocation(season1Data.mindshare) * 2
                        ).toLocaleString()}
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
