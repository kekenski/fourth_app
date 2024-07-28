'use client';

import React, { useState } from 'react';
import Text from './ components/Text';
import Numbers from './ components/Numbers';
import Button from './ components/Button';
import Spinner from './ components/Spinner'


export default function Home() {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tries, setTries] = useState(0);
  const [hasWon, setHasWon] = useState<boolean | null>(null);
  const [prize, setPrize] = useState<string | null>(null);

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    setIsSubmitted(false); // Reset submission state when a new number is selected
    setTries(0); // Reset tries
    setHasWon(null); // Reset win state
    setPrize(null); // Reset prize
  };

  const handleSubmit = () => {
    if (selectedNumber !== null) {
      setIsSubmitted(true);
    }
  };

  const handleSpinFinish = (isWin: boolean) => {
    if (isWin) {
      setHasWon(true);
      const prizes = ['iPhone 15', 'Smart Car'];
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setPrize(randomPrize);
    } else {
      setTries((prevTries) => prevTries + 1);
      if (tries + 1 >= 3) {
        setHasWon(false);
      }
    }
  };

  const handleReturn = () => {
    setIsSubmitted(false);
    setSelectedNumber(null); // Reset selected number
    setTries(0); // Reset tries
    setHasWon(null); // Reset win state
    setPrize(null); // Reset prize
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!isSubmitted ? (
        <div className="bg-[#232A34] rounded-2xl w-[330px] h-[360px] flex flex-col items-center justify-evenly p-4">
          <Text />
          <Numbers onNumberSelect={handleNumberSelect} />
          <div className="flex justify-center mt-4 w-[70%]">
            <button
              onClick={handleSubmit}
              className="text-white hover:text-[#FC7614] bg-[#FC7614] hover:bg-white rounded-3xl p-2 w-full"
            >
              submit
            </button>
          </div>
        </div>
      ) : hasWon === null ? (
        <div className="bg-[#232A34] rounded-2xl w-[330px] h-[360px] flex flex-col items-center justify-center p-4">
          <h2 className="text-white text-2xl">Spin the Wheel</h2>
          <Spinner selectedNumber={selectedNumber!} onFinish={handleSpinFinish} />
          <p className="text-white text-lg mt-4">
            Tries left: {3 - tries}
          </p>
        </div>
      ) : hasWon ? (
        <div className="bg-[#232A34] rounded-2xl w-[330px] h-[360px] flex flex-col items-center justify-center p-4">
          <h2 className="text-white text-2xl">You Win!</h2>
          <p className="text-white text-lg mt-4">Your prize is: {prize}</p>
          <button
            onClick={handleReturn}
            className="text-white hover:text-[#FC7614] bg-[#FC7614] hover:bg-white rounded-3xl p-2 w-[70%] mt-4"
          >
            Return
          </button>
        </div>
      ) : (
        <div className="bg-[#232A34] rounded-2xl w-[330px] h-[360px] flex flex-col items-center justify-center p-4">
          <h2 className="text-white text-2xl">You Lose!</h2>
          <button
            onClick={handleReturn}
            className="text-white hover:text-[#FC7614] bg-[#FC7614] hover:bg-white rounded-3xl p-2 w-[70%] mt-4"
          >
            Return
          </button>
        </div>
      )}
    </div>
  );
}