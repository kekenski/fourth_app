'use client';

import React, { useState } from "react";

const Numbers = ({ onNumberSelect }: { onNumberSelect: (number: number) => void }) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const handleClick = (number: number) => {
    setSelectedNumber(number);
    onNumberSelect(number); // Pass the selected number to the parent
  };

  const numbers = [1, 2, 3, 4, 5];

  return (
    <div className="flex justify-center gap-3">
      {numbers.map((number) => (
        <div
          key={number}
          onClick={() => handleClick(number)}
          className={`text-white font-[16px] rounded-full py-4 px-5 cursor-pointer ${
            selectedNumber === number ? 'bg-[#FC7614]' : 'bg-[#262E38]'
          }`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default Numbers;
