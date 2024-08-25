import React, { useState, useEffect } from 'react';
import api from './api';
import { useWallet } from '@solana/wallet-adapter-react';
import Coin from './Coin';

const CoinFlip = () => {
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState('');
  const [chosenSide, setChosenSide] = useState('heads');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [token, setToken] = useState('3fa373924020aed12655538c66a01ab6a608cbe2');
  const { publicKey } = useWallet();

  useEffect(() => {
    if (token) {
      fetchBalance();
    }
  }, [token]);

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/get_balance/');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError('Failed to fetch balance. Please try again.');
    }
  };

  const handleFlip = async () => {
    setIsFlipping(true);
    setResult(null);
    setError('');

    try {
      const response = await api.post('/api/flip_coin/', {
        bet_amount: betAmount,
        chosen_side: chosenSide,
      });
      
      // Delay setting the result to allow for animation
      setTimeout(() => {
        setResult(response.data);
        setIsFlipping(false);
        fetchBalance();
      }, 2000); // Match this with the animation duration
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during the coin flip');
      setIsFlipping(false);
    }
  };

  if (!publicKey) {
    return <div className="text-center mt-8">Please connect your wallet to play.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Your Balance: {balance} SOL</h2>
      <div className="mb-4">
        <label className="block mb-2">Bet Amount:</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Choose Side:</label>
        <select
          value={chosenSide}
          onChange={(e) => setChosenSide(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="heads">Heads</option>
          <option value="tails">Tails</option>
        </select>
      </div>
      <button
        onClick={handleFlip}
        disabled={isFlipping}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Coin  isFlipping={isFlipping} result={result?.result} />
      {result && (
        <div className="mt-4 ">
          <h3 className="font-bold">Result:</h3>
          <div className="flex justify-between">
            <p>Coin landed on: {result.result}</p>
            <p
              className={`border p-2 rounded-lg shadow-md ${
                result.won ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              You {result.won ? "won 🎉" : "lost 😔"}!
            </p>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinFlip;