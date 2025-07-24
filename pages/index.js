import React, { useState } from "react"; import data from "../public/top_2000_from_network.json"; import "../styles/styles.css";

export default function UnionCalculator() { const [query, setQuery] = useState(""); const [result, setResult] = useState(null);

const handleSearch = () => { const user = data.find( (u) => u.username.toLowerCase() === query.trim().toLowerCase() ); setResult(user || null); };

const calculateAllocation = (mindshare) => { const allocation = parseFloat(mindshare) * 45000; return allocation; };

return ( <div className="container"> <h1 className="title">Union Allocation Calculator by Shinosuka</h1>

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
      <img
        src={result.pfp}
        alt="Twitter PFP"
        className="pfp"
      />
      <h2 className="username">@{result.username}</h2>
      <p className="mindshare">Mindshare: {result.mindshare}</p>

      <div className="allocation">
        <h3>Your $U Allocation:</h3>
        <p className="allocation-value">
          {calculateAllocation(result.mindshare).toLocaleString()} $U
        </p>

        <h3>Value of Your $U Allocation:</h3>
        <table className="fdv-table">
          <tbody>
            <tr>
              <td>500M FDV (Ideal)</td>
              <td>
                ${
                  (calculateAllocation(result.mindshare) * 0.5).toLocaleString()
                }
              </td>
            </tr>
            <tr>
              <td>1B FDV (Bull)</td>
              <td>
                ${
                  (calculateAllocation(result.mindshare) * 1).toLocaleString()
                }
              </td>
            </tr>
            <tr>
              <td>1.5B FDV (SuperBull)</td>
              <td>
                ${
                  (calculateAllocation(result.mindshare) * 1.5).toLocaleString()
                }
              </td>
            </tr>
            <tr>
              <td>2B FDV (GigaBull)</td>
              <td>
                ${
                  (calculateAllocation(result.mindshare) * 2).toLocaleString()
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>

); }

