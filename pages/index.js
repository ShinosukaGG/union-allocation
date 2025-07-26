import React, { useState } from "react";
import season0 from "../public/top_2000_from_network.json";
import season1 from "../public/season1_ss.json";
// import testerStats from "../public/union_leaderboard.json"; // HIDDEN for now

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [resultS0, setResultS0] = useState(null);
  const [season1Mindshare, setSeason1Mindshare] = useState(null);
  const [showSeason1, setShowSeason1] = useState(false);
  // const [testerInfo, setTesterInfo] = useState(null); // HIDDEN for now

  const handleSearch = () => {
    const username = query.trim().toLowerCase();
    const userS0 = season0.find((u) => u.username.toLowerCase() === username);
    const userS1 = season1.find((u) => u.username.toLowerCase() === username);
    // const tester = testerStats.find((u) => u.username.toLowerCase() === username);

    setResultS0(userS0 || null);
    setSeason1Mindshare(userS1 ? parseFloat(userS1.mindshare) : null);
    // setTesterInfo(tester || null);
    setShowSeason1(!!userS1);
  };

  const calculateAllocation = (mindshare, multiplier) => {
    return parseFloat(mindshare) * multiplier;
  };

  return (
    <div className="app-container">
      <h1 className="main-title">
        Union Allocation Calculator by{" "}
        <a
          href="https://x.com/shinosuka_eth"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shinosuka
        </a>
      </h1>

      {/* Poster removed */}

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
          <img src={resultS0.pfp} alt="PFP" className="pfp" />
          <h2 className="username">@{resultS0.username}</h2>
          <p className="mindshare">Mindshare (Season 0): {resultS0.mindshare}</p>

          {season1Mindshare && (
            <p className="mindshare">
              Mindshare (Season 1): {(season1Mindshare * 100).toFixed(3)}%
            </p>
          )}

          {season1Mindshare && (
            <button onClick={() => setShowSeason1(!showSeason1)} className="toggle-button">
              {showSeason1 ? "Hide" : "Show"} Season 1 Stats
            </button>
          )}

          <div className="season-tables">
            {/* Season 0 */}
            <div className="allocation">
              <h3>Your $U Allocation (Season 0):</h3>
              <p className="allocation-value">
                {calculateAllocation(resultS0.mindshare, 45000).toLocaleString()} $U
              </p>
              <h4>Value of Your $U Allocation:</h4>
              <table className="fdv-table">
                <tbody>
                  {[0.5, 1, 1.5, 2].map((mult, i) => (
                    <tr key={i}>
                      <td>{500 * mult}M FDV ({["Ideal", "Bull", "SuperBull", "GigaBull"][i]})</td>
                      <td>
                        $
                        {(
                          calculateAllocation(resultS0.mindshare, 45000) * mult
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Season 1 */}
            {season1Mindshare && showSeason1 && (
              <div className="allocation">
                <h3>Your $U Allocation (Season 1):</h3>
                <p className="allocation-value">
                  {calculateAllocation(season1Mindshare, 3000000).toLocaleString()} $U
                </p>
                <h4>Value of Your $U Allocation:</h4>
                <table className="fdv-table">
                  <tbody>
                    {[0.5, 1, 1.5, 2].map((mult, i) => (
                      <tr key={i}>
                        <td>{500 * mult}M FDV ({["Ideal", "Bull", "SuperBull", "GigaBull"][i]})</td>
                        <td>
                          $
                          {(
                            calculateAllocation(season1Mindshare, 3000000) * mult
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tester Stats - hidden for now */}
            {/* {testerInfo && (
              <div className="allocation">
                <h3>Tester Stats</h3>
                <table className="fdv-table">
                  <tbody>
                    <tr><td>Rank</td><td>{testerInfo.rank}</td></tr>
                    <tr><td>Level</td><td>{testerInfo.level}</td></tr>
                    <tr><td>Level Name</td><td>{testerInfo.level_name}</td></tr>
                    <tr><td>XP</td><td>{testerInfo.xp}</td></tr>
                  </tbody>
                </table>
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
            }
