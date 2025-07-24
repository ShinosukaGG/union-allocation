import React, { useState } from "react";
import data from "../public/top_2000_from_network.json";

export default function UnionCalculator() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const user = data.find(
      (u) => u.username.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(user || null);
  };

  const calculateAllocation = (mindshare) => {
    const allocation = parseFloat(mindshare) * 45000;
    return allocation;
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

        {result && (
          <div className="mt-10 bg-zinc-900 rounded-xl p-6 shadow-lg text-center">
            <img
              src={result.pfp}
              alt="Twitter PFP"
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-zinc-700"
            />
            <h2 className="text-xl font-bold">@{result.username}</h2>
            <p className="text-zinc-400">Mindshare: {result.mindshare}</p>

            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold mb-2">Your $U Allocation:</h3>
              <p className="text-2xl mb-4">
                {calculateAllocation(result.mindshare).toLocaleString()} $U
              </p>

              <h3 className="text-lg font-semibold mb-2">
                Value of Your $U Allocation:
              </h3>
              <ul className="space-y-1">
                <li>
                  <strong>500M FDV (Ideal): </strong>$
                  {(calculateAllocation(result.mindshare) * 0.5).toLocaleString()}
                </li>
                <li>
                  <strong>1B FDV (Bull): </strong>$
                  {(calculateAllocation(result.mindshare) * 1).toLocaleString()}
                </li>
                <li>
                  <strong>1.5B FDV (SuperBull): </strong>$
                  {(calculateAllocation(result.mindshare) * 1.5).toLocaleString()}
                </li>
                <li>
                  <strong>2B FDV (GigaBull): </strong>$
                  {(calculateAllocation(result.mindshare) * 2).toLocaleString()}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
              }
