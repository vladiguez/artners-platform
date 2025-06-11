'use client';

import MVPView from "@/features/mvp/MVPView";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  const { isConnected, address } = useAccount();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Connecte ton wallet</h1>
      <ConnectButton />

      {isConnected && (
        <div className="mt-4 text-sm text-gray-600">
          Wallet connecté : <span className="font-mono">{address}</span>
        </div>
      )}

      <Link
        href="/dashboard"
        className="mt-6 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Accéder au Dashboard
      </Link>

      <hr className="my-6" />

      <MVPView />
    </div>
  );
}
