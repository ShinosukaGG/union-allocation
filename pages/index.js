import React, { useState, useEffect } from "react";
import season0 from "../public/top_2000_from_network.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [result0, setResult0] = useState(null);
  const [result1, setResult1] = useState(null);

  const handleSearch = async () => {
    const user0 = season0.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    setResult0(user0 || null);

    try {
      const res = await fetch("/season1-ss.json");
      const json = await res.json();
      const user1 = json.find(
        (u) => u.username.toLowerCase() === query.trim().toLowerCase()
      );
      setResult1(user1 || null);
    } catch (err) {
      console.error("❌ Failed to fetch Season 1 JSON", err);
      setResult1(null);
    }
  };

  const calculateAllocation = (mindshare) => {
    return parseFloat(mindshare) * 45000;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Union Allocation Calculator by Shinosuka
      </h1>

      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-4 rounded-md bg-zinc-800 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="p-3 rounded-md bg-zinc-700 hover:bg-zinc-600 font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      {(result0 || result1) && (
        <div className="mt-10 bg-zinc-900 rounded-xl p-6 shadow-lg text-center w-full max-w-4xl">
          {result0?.pfp && (
            <img
              src={result0.pfp}
              alt="Twitter PFP"
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-zinc-700"
            />
          )}
          <h2 className="text-xl font-bold">@{query}</h2>

          <div className="mt-2 mb-6 text-sm text-zinc-400">
            Mindshare:{" "}
            {result0?.mindshare || result1?.mindshare || "Not found"}
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center text-left">
            {result0 && (
              <div className="flex-1 bg-zinc-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-center">Season 0</h3>
                <p className="text-2xl text-center mb-4">
                  {calculateAllocation(result0.mindshare).toLocaleString()} $U
                </p>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td>500M FDV (Ideal)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result0.mindshare) * 0.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1B FDV (Bull)</td>
                      <td className="text-right">
                        ${calculateAllocation(result0.mindshare).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1.5B FDV (SuperBull)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result0.mindshare) * 1.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>2B FDV (GigaBull)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result0.mindshare) * 2
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {result1 && (
              <div className="flex-1 bg-zinc-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2 text-center">Season 1</h3>
                <p className="text-2xl text-center mb-4">
                  {calculateAllocation(result1.mindshare).toLocaleString()} $U
                </p>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td>500M FDV (Ideal)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result1.mindshare) * 0.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1B FDV (Bull)</td>
                      <td className="text-right">
                        ${calculateAllocation(result1.mindshare).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>1.5B FDV (SuperBull)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result1.mindshare) * 1.5
                        ).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>2B FDV (GigaBull)</td>
                      <td className="text-right">
                        ${(
                          calculateAllocation(result1.mindshare) * 2
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
