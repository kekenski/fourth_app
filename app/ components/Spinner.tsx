'use client';

import React, { useState } from 'react';

interface SpinnerProps {
  selectedNumber: number;
  onFinish: (isWin: boolean) => void;
}

const Spinner: React.FC<SpinnerProps> = ({ selectedNumber, onFinish }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);

  const numbers = [1, 2, 3, 4, 5];

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spinTime = 2000; // Spin for 2 seconds

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      setCurrentNumber(numbers[randomIndex]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const resultNumber = numbers[randomIndex];
      setCurrentNumber(resultNumber);
      setIsSpinning(false);
      onFinish(resultNumber === selectedNumber);
    }, spinTime);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center gap-3 mb-4">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`text-white font-[16px] rounded-full py-4 px-5 transition-colors duration-500 ${
              number === currentNumber ? 'bg-[#FC7614]' : 'bg-[#262E38]'
            }`}
          >
            {number}
          </div>
        ))}
      </div>
      <button
        onClick={spin}
        className="text-white hover:text-[#FC7614] bg-[#FC7614] hover:bg-white rounded-3xl p-2 w-[70%] mt-4 transition-colors duration-500"
        disabled={isSpinning}
      >
        Spin
      </button>
    </div>
  );
};

export default Spinner;
