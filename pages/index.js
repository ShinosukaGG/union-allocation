import React, { useState } from "react";
import season0 from "../public/top_2000_from_network.json";
import season1 from "../public/season1-ss.json";

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
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
        Union Allocation Calculator by Shinosuka
      </h1>

      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search by username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-4 text-lg rounded-md bg-zinc-800 placeholder-zinc-400 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-zinc-700 hover:bg-zinc-600 rounded-md p-3 font-semibold"
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
          <p className="text-zinc-400 mb-6">
            Mindshare:{" "}
            {result0?.mindshare || result1?.mindshare || "Not found"}
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            {result0 && (
              <div className="flex-1 bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Season 0</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Mindshare: {result0.mindshare}
                </p>
                <p className="text-2xl mb-4">
                  {calculateAllocation(result0.mindshare).toLocaleString()} $U
                </p>
                <h4 className="text-md font-semibold mb-1">
                  Value of Your $U Allocation:
                </h4>
                <ul className="text-left text-sm">
                  <li>
                    <strong>500M FDV:</strong> $
                    {(calculateAllocation(result0.mindshare) * 0.5).toLocaleString()}
                  </li>
                  <li>
                    <strong>1B FDV:</strong> $
                    {(calculateAllocation(result0.mindshare) * 1).toLocaleString()}
                  </li>
                  <li>
                    <strong>1.5B FDV:</strong> $
                    {(calculateAllocation(result0.mindshare) * 1.5).toLocaleString()}
                  </li>
                  <li>
                    <strong>2B FDV:</strong> $
                    {(calculateAllocation(result0.mindshare) * 2).toLocaleString()}
                  </li>
                </ul>
              </div>
            )}

            {result1 && (
              <div className="flex-1 bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Season 1</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Mindshare: {result1.mindshare}
                </p>
                <p className="text-2xl mb-4">
                  {calculateAllocation(result1.mindshare).toLocaleString()} $U
                </p>
                <h4 className="text-md font-semibold mb-1">
                  Value of Your $U Allocation:
                </h4>
                <ul className="text-left text-sm">
                  <li>
                    <strong>500M FDV:</strong> $
                    {(calculateAllocation(result1.mindshare) * 0.5).toLocaleString()}
                  </li>
                  <li>
                    <strong>1B FDV:</strong> $
                    {(calculateAllocation(result1.mindshare) * 1).toLocaleString()}
                  </li>
                  <li>
                    <strong>1.5B FDV:</strong> $
                    {(calculateAllocation(result1.mindshare) * 1.5).toLocaleString()}
                  </li>
                  <li>
                    <strong>2B FDV:</strong> $
                    {(calculateAllocation(result1.mindshare) * 2).toLocaleString()}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
                                          }
