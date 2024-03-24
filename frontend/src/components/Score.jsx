import React from "react";

const Score = ({ score }) => {
  const color =
    score > 60 ? "bg-green-600" : score > 40 ? "bg-yellow-500" : "bg-red-600";
  return (
    <div className="flex items-center gap-2">
      <p className={`w-4 h-4 rounded-full ${color}`}></p>

      <div>
        <p className="text-xl text-gray-950 font-semibold">{score}/100</p>

        <p className="text-md text-gray-500">
          {score > 60
            ? "Good for your health"
            : score > 40
            ? "It has some Nutrients"
            : "Bad for your health"}
        </p>
      </div>
    </div>
  );
};

export default Score;
