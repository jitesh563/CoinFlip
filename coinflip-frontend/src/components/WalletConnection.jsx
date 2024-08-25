import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnection = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Solana Coinflip</h1>
      <WalletMultiButton />
    </div>
  );
};

export default WalletConnection;