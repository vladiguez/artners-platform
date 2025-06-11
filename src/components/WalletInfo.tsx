// src/components/WalletInfo.tsx
'use client';

import { useAccount } from 'wagmi';

const WalletInfo = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected) return null;

  return (
    <div className="mt-4 p-4 border rounded-lg text-sm">
      <p>Wallet connecté :</p>
      <p className="font-mono text-blue-600 break-all">{address}</p>
    </div>
  );
};

export default WalletInfo;
